<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'

import getBrands from '/@src/composable/brandsData'

import useNotyf from '/@src/composable/useNotyf'

import BrandService from '/@src/service/brandService';

const brandService = new BrandService();

const notif = useNotyf()

const { searchAllBrands, brands } = getBrands();

const centeredActionsOpen = ref(false)

const filters = ref('')

const filteredData = computed(() => {
  if (!filters.value) {
    return brands.value
  } else {
    return brands.value.filter((item) => {
      return (
        item.brand_name.match(new RegExp(filters.value, 'i')) ||
        item.branch_id.match(new RegExp(filters.value, 'i')) ||
        item.description.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});

//profile_url: string; password: string; email: string; contact_number: string; name: string;
const brand_name = ref('')
const branch_id = ref('')
const description = ref('')

const saveBrandFunc = () => {
  console.log("saving")
  if (brand_name.value && branch_id.value && description.value) {
    console.log("working")
    const brand  = {
      brand_name: brand_name.value,
      branch_id: branch_id.value,
      description: description.value
    }
    brandService.saveBrand(brand)
      .then(function (response) {
        console.log('response',response)
        if (response.data.success){
          notif.success(response.data.message)
          searchAllBrands()
          centeredActionsOpen.value = false
        }else{
          notif.warning(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    notif.warning('Empty Fields.!!')
  }
}

onMounted(async () => {
  searchAllBrands();
})
</script>

<template>
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
          Add Brand
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
            <span class="is-grow">Brand Name</span>
            <span>Branch ID</span>
            <span>Description</span>
            <span class="cell-end">Actions</span>
          </div>

          <div class="flex-list-inner">
            <transition-group name="list" tag="div">
              <!--Table item-->
              <div
                v-for="branch in filteredData"
                :key="branch.branch_id"
                class="flex-table-item"
              >
<!--                <div class="flex-table-cell is-media is-grow">-->
<!--                  <V-Avatar-->
<!--                    :picture="customer.profile_url"-->
<!--                    color="info"-->
<!--                    size="medium"-->
<!--                  />-->
<!--                  <div>-->
<!--                    <span class="item-name dark-inverted">{{ customer.name }}</span>-->
<!--                  </div>-->
<!--                </div>-->
                <div class="flex-table-cell" data-th="Brand Name">
                  <span class="light-text">{{ branch.brand_name }}</span>
                </div>
                <div class="flex-table-cell" data-th="Branch ID">
                  <span class="light-text">{{ branch.branch_id }}</span>
                </div>
                <div class="flex-table-cell" data-th="Description">
                  <span class="light-text">{{ branch.description }}</span>
                </div>
                <div class="flex-table-cell cell-end" data-th="Actions">
                  <span>
                    <VButton color="primary" outlined> More</VButton>
                  </span>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!--Table Pagination-->
        <V-FlexPagination
          v-if="filteredData.length > 5"
          :item-per-page="10"
          :total-items="873"
          :current-page="42"
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
                      placeholder="Brand Name"
                      autocomplete="brand_name"
                      v-model="brand_name"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control icon="feather:home">
                    <input
                      type="tel"
                      class="input"
                      placeholder="Branch ID"
                      autocomplete="branch"
                      inputmode="branch"
                      v-model="branch_id"
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
        <VButton color="primary" raised @click="saveBrandFunc">Add Brand</VButton>
      </template>
    </VModal>
  </div>

</template>

<style lang="scss">
@import '../../../../scss/abstracts/_variables.scss';

.has-top-nav {
  .flex-list-wrapper,
  .list-flex-toolbar {
    max-width: 880px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
