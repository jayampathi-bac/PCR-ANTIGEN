<script setup lang="ts">
import {computed, onMounted, ref, inject} from 'vue'

import getGroups from '/@src/composable/groupData'

import useNotyf from '/@src/composable/useNotyf'

import GroupService from '/@src/service/groupService';

import {useCookies} from "vue3-cookies";
import {useRoute} from "vue-router";

const swal = inject('$swal')

const {cookies} = useCookies();
const route = useRoute()
const groupService = new GroupService();
const isLoaderActive = ref(false)
const notif = useNotyf()

const {searchAllGroups, allGroupsCount, groups} = getGroups();

const centeredActionsOpen = ref(false)
const editActionsOpen = ref(false)
const deleteActionsOpen = ref(false)

const filters = ref('')

const filteredData = computed(() => {
  if (!filters.value) {
    return groups.value
  } else {
    return groups.value.filter((item) => {
      return (
        item.name.match(new RegExp(filters.value, 'i')) ||
        item.area.match(new RegExp(filters.value, 'i')) ||
        item.description.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});

const name = ref('')
const area = ref('')
const description = ref('')

const edit_group_id = ref('')
const edit_name = ref('')
const edit_area = ref('')
const edit_description = ref('')

const saveGroupFun = () => {
  isLoaderActive.value = !isLoaderActive.value
  console.log("saveGroupFun")
  if (name.value && area.value && description.value) {
    const group = {
      name: name.value,
      area: area.value,
      description: description.value
    }
    groupService.saveGroup(group)
      .then(function (response) {
        // console.log('response', response)
        if (response.data.success) {
          swal.fire('Saving Successful!', '', 'success')
          notif.success(response.data.message)
          searchAllGroups(currentPage.value)
          centeredActionsOpen.value = false
        } else {
          notif.warning(response.data.message)
        }
        isLoaderActive.value = !isLoaderActive.value
      })
      .catch(function (error) {
        console.log(error);
        isLoaderActive.value = !isLoaderActive.value
      });
  } else {
    notif.warning('Empty Fields.!!')
    isLoaderActive.value = !isLoaderActive.value
  }
}
const editGroupFunc = () => {
  isLoaderActive.value = !isLoaderActive.value
  console.log("editGroupFunc")
  if (edit_group_id.value && edit_name.value && edit_area.value && edit_description.value) {
    // console.log("working")
    const group = {
      id: edit_group_id.value,
      name: edit_name.value,
      area: edit_area.value,
      description: edit_description.value,
    }
    groupService.editGroup(group)
      .then(function (response) {
        // console.log('response', response)
        if (response.data.success) {
          swal.fire('Editing Successful!', '', 'success')
          notif.success(response.data.message)
          searchAllGroups(currentPage.value)
          editActionsOpen.value = false
        } else {
          swal.fire('Editing Failed!', '', 'error')
          notif.warning(response.data.message)
          editActionsOpen.value = false
        }
        isLoaderActive.value = !isLoaderActive.value
      })
      .catch(function (error) {
        console.log(error);
        isLoaderActive.value = !isLoaderActive.value
      });
  } else {
    notif.warning('Empty Fields.!!')
    isLoaderActive.value = !isLoaderActive.value
  }
}

const fireGroupFuncAlert = () => {
  centeredActionsOpen.value = false;
  swal.fire({
    title: `Do you want to save the Group ?`,
    showCancelButton: true,
    confirmButtonText: 'Save',
  }).then((result) => {
    if (result.isConfirmed) {
      saveGroupFun()
    }
  })
}

const fireEditGroupFuncAlert = () => {
  console.log("fireEditGroupFuncAlert")
  swal.fire({
    title: `Do you want to edit the Group ?`,
    showCancelButton: true,
    confirmButtonText: 'Edit',
  }).then((result) => {
    if (result.isConfirmed) {
      editGroupFunc()
    }
  })
}

const deleteGroupFunc = (group) => {
  isLoaderActive.value = !isLoaderActive.value
  console.log('delete this', group)
  groupService.deleteGroup(group.id)
    .then(function (response) {
      // console.log('response', response)
      if (response.data.success) {
        swal.fire('Deleting Successful!', '', 'success')
        notif.success(response.data.message)
        searchAllGroups(currentPage.value)
      } else {
        swal.fire(response.data.message, '', 'error')
        notif.warning(response.data.message)
      }
      isLoaderActive.value = !isLoaderActive.value
    })
    .catch(function (error) {
      console.log(error);
    });
}

const fireDeleteGroupAlert = (group) => {
  swal.fire({
    title: `Do you want to delete the Group ?`,
    showCancelButton: true,
    confirmButtonText: 'Delete',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteGroupFunc(group)
    }
  })
}

const openEditActionsOpen = (group) => {
  // console.log("currentPage", currentPage)
  editActionsOpen.value = true

  edit_group_id.value = group.id;
  edit_name.value = group.name;
  edit_area.value = group.area;
  edit_description.value = group.description;
}

const currentPage = computed(() => {
  try {
    // console.log("currentPage", Number.parseInt(route.query.page as string) || 1)
    searchAllGroups(Number.parseInt(route.query.page as string) || 1)
    return Number.parseInt(route.query.page as string) || 1
  } catch {
  }
  return 1
})

onMounted(async () => {
  searchAllGroups(1);
})
</script>

<template>
  <VLoader size="large"  center="smooth" lighter="true" translucent="true" :active="isLoaderActive">
  <div>
    <div class="list-flex-toolbar flex-list-v1">
      <V-Field>
        <V-Control icon="feather:search">
          <input
            v-model="filters"
            class="input custom-text-filter"
            placeholder="Search..."
          />
        </V-Control>
      </V-Field>

      <V-Buttons>
        <!--        <V-Button dark="3">View Reports</V-Button>-->
        <V-Button color="primary" icon="fas fa-plus" elevated @click="centeredActionsOpen = true">
          Add Group
        </V-Button>
      </V-Buttons>
    </div>

    <div class="page-content-inner">
      <div class="flex-list-wrapper flex-list-v1">
        <!--List Empty Search Placeholder -->
        <V-PlaceholderPage
          :class="[filteredData.length !== 0 && 'is-hidden']"
          title="We couldn't find any matching results."
          subtitle="Too bad. Looks like we couldn't find any matching results for the
          search terms you've entered. Please try different search terms or
          criteria."
          larger
        >
        </V-PlaceholderPage>

        <div class="flex-table">
          <!--Table header-->
          <div
            class="flex-table-header"
            :class="[filteredData.length === 0 && 'is-hidden']"
          >
            <span class="is-grow">Group Name</span>
            <span class="is-grow">Area</span>
            <span class="is-grow">Description</span>
            <span class="is-grow cell-end">Actions</span>
          </div>

          <div class="flex-list-inner">
            <transition-group name="list" tag="div">
              <!--Table item-->
              <div
                v-for="group in filteredData"
                :key="group.id"
                class="flex-table-item"
              >
                <div class="flex-table-cell is-grow" data-th="Group Name">
                  <span class="light-text">{{ group.name }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="Area">
                  <span class="light-text">{{ group.area }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="Description">
                  <span class="light-text">{{ group.description }}</span>
                </div>
                <div class="flex-table-cell is-grow cell-end" data-th="Actions">
                  <span class="mr-2">
                    <VButton
                      @click="openEditActionsOpen(group)"
                      color="primary"
                      outlined
                    > Edit
                    </VButton>
                  </span>
                  <span>
                    <VButton
                      @click="fireDeleteGroupAlert(group)"
                      color="danger"
                      outlined> Delete</VButton>
                  </span>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!--Table Pagination-->
        <V-FlexPagination
          v-if="filteredData.length > 0"
          :item-per-page="10"
          :total-items="allGroupsCount"
          :current-page="currentPage"
          :max-links-displayed="7"
        />
      </div>
    </div>
    <VModal
      :open="centeredActionsOpen"
      size="medium"
      actions="center"
      @close="centeredActionsOpen = false"
      title="Add a New Brand"
    >
      <template #content>
        <form class="form-layout is-split" @submit.prevent>
          <div class="form-outer">
            <div class="form-section is-grey">
              <div>
                <V-Field>
                  <V-Control icon="feather:pocket">
                    <input
                      type="text"
                      class="input"
                      placeholder="Group Name"
                      autocomplete="group_name"
                      v-model="name"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control icon="feather:home">
                    <input
                      type="text"
                      class="input"
                      placeholder="Area"
                      autocomplete="Area"
                      inputmode="Area"
                      v-model="area"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control icon="feather:file-text">
                    <input
                      type="text"
                      class="input"
                      placeholder="Description"
                      autocomplete="description"
                      inputmode="description"
                      v-model="description"
                    />
                  </V-Control>
                </V-Field>
              </div>
            </div>
          </div>

        </form>

      </template>
      <template #action>
        <VButton color="primary" raised @click="fireGroupFuncAlert">Add Group</VButton>
      </template>
    </VModal>
    <VModal
      :open="editActionsOpen"
      size="medium"
      actions="center"
      @close="editActionsOpen = false"
      title="Edit Group"
    >
      <template #content>
        <form class="form-layout is-split" @submit.prevent>
          <div class="form-outer">
            <div class="form-section is-grey">
              <div>
                <V-Field>
                  <V-Control icon="feather:pocket">
                    <input
                      type="text"
                      class="input"
                      placeholder="Group Name"
                      autocomplete="group_name"
                      v-model="edit_name"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control icon="feather:home">
                    <input
                      type="tel"
                      class="input"
                      placeholder="Area"
                      autocomplete="edit_area"
                      inputmode="edit_area"
                      v-model="edit_area"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control icon="feather:file-text">
                    <input
                      type="email"
                      class="input"
                      placeholder="Description"
                      autocomplete="description"
                      inputmode="description"
                      v-model="edit_description"
                    />
                  </V-Control>
                </V-Field>
              </div>
            </div>
          </div>

        </form>

      </template>
      <template #action>
        <VButton color="primary" raised @click="fireEditGroupFuncAlert">Edit Group</VButton>
      </template>
    </VModal>
  </div>
  </VLoader>
</template>

<style lang="scss" >
@import '../../../../scss/abstracts/_variables.scss';

.has-top-nav {
  .flex-list-wrapper,
  .list-flex-toolbar {
    max-width: 880px;
    margin-right: auto;
    margin-left: auto;
  }
}
.swal2-title {
  font-size: 20px !important;
}

.swal2-styled.swal2-confirm {
  background-color: #41b883 !important;
}

</style>
