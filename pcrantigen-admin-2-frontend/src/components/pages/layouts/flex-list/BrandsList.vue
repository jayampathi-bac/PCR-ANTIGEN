<script setup lang="ts">
import {computed, onMounted, ref, inject} from 'vue'

import getBrands from '/@src/composable/brandsData'

import useNotyf from '/@src/composable/useNotyf'

import BrandService from '/@src/service/brandService';

import {useCookies} from "vue3-cookies";
import {useRoute} from "vue-router";

const swal = inject('$swal')

const {cookies} = useCookies();
const route = useRoute()
const brandService = new BrandService();

const notif = useNotyf()

const {searchAllBrands, brands, allBrandsCount} = getBrands();

const centeredActionsOpen = ref(false)
const editActionsOpen = ref(false)
const deleteActionsOpen = ref(false)

const filters = ref('')

const filteredData = computed(() => {
  if (!filters.value) {
    return brands.value
  } else {
    return brands.value.filter((item) => {
      return (
        item.brand_name.match(new RegExp(filters.value, 'i')) ||
        item.brand_company_name.match(new RegExp(filters.value, 'i')) ||
        item.description.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});

//profile_url: string; password: string; email: string; contact_number: string; name: string;
const brand_name = ref('')
const brand_company_name = ref('')
const branch_id = ref(cookies.get('admin2').branch_id)
const description = ref('')

const edit_brand_id = ref('')
const edit_brand_name = ref('')
const edit_brand_company_name = ref('')
const edit_description = ref('')

const saveBrandFunc = () => {
  // console.log("saving")
  if (brand_name.value && brand_company_name.value && branch_id.value && description.value) {
    // console.log("working")
    const brand = {
      brand_name: brand_name.value,
      brand_company_name: brand_company_name.value,
      branch_id: branch_id.value,
      description: description.value
    }
    brandService.saveBrand(brand)
      .then(function (response) {
        // console.log('response', response)
        if (response.data.success) {
          swal.fire('保存完了', '', 'success')
          notif.success(response.data.message)
          searchAllBrands(currentPage.value)
          centeredActionsOpen.value = false
        } else {
          notif.warning(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    notif.warning('未入力フィールドがございます。')
  }
}
const editBrandFunc = () => {
  // console.log("editing")
  if (edit_brand_name.value && edit_brand_company_name.value && branch_id.value && edit_description.value) {
    // console.log("working")
    const brand = {
      id: edit_brand_id.value,
      brand_name: edit_brand_name.value,
      brand_company_name: edit_brand_company_name.value,
      branch_id: branch_id.value,
      description: edit_description.value,
    }
    brandService.editBrand(brand)
      .then(function (response) {
        // console.log('response', response)
        if (response.data.success) {
          swal.fire('編集完了', '', 'success')
          notif.success(response.data.message)
          searchAllBrands(currentPage.value)
          editActionsOpen.value = false
        } else {
          swal.fire('変更フィールド', '', 'error')
          notif.warning(response.data.message)
          editActionsOpen.value = false
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    notif.warning('未入力フィールドがございます。')
  }
}

const fireBrandFuncAlert = () => {
  centeredActionsOpen.value = false;
  swal.fire({
    title: `抗原検査キット名保存したいですか？`,
    showCancelButton: true,
    confirmButtonText: '保存する',
    cancelButtonText:'キャンセル',
    confirmButtonColor: '#41b883',
  }).then((result) => {
    if (result.isConfirmed) {
      saveBrandFunc()
    }
  })
}

const fireEditBrandFuncAlert = () => {
  // console.log("fireEditBrandFuncAlert")
  swal.fire({
    title: `抗原検査キット名を編集したいですか？`,
    showCancelButton: true,
    confirmButtonText: '修正',
    cancelButtonText:'キャンセル',
    confirmButtonColor: '#41b883',
  }).then((result) => {
    if (result.isConfirmed) {
      editBrandFunc()
    }
  })
}

const deleteBrandFunc = (brand) => {
  // console.log('delete this', brand)
  brandService.deleteBrand(brand.id)
    .then(function (response) {
      // console.log('response', response)
      if (response.data.success) {
        swal.fire('削除を成功しました。', '', 'success')
        notif.success(response.data.message)
        searchAllBrands(currentPage.value)
      } else {
        swal.fire('フィールドを削除するc', '', 'error')
        notif.warning(response.data.message)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

const fireDeleteBrandAlert = (brand) => {
  swal.fire({
    title: `このブランドを削除してもよろしいでしょうか？`,
    showCancelButton: true,
    confirmButtonText: '削除',
    cancelButtonText:'キャンセル',
    confirmButtonColor: '#41b883',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteBrandFunc(brand)
    }
  })
}

const openEditActionsOpen = (brand) => {
  // console.log("currentPage", currentPage)
  editActionsOpen.value = true
  edit_brand_id.value = brand.id;
  edit_brand_name.value = brand.brand_name;
  edit_brand_company_name.value = brand.brand_company_name;
  edit_description.value = brand.description;
}

const currentPage = computed(() => {
  try {
    // console.log("currentPage", Number.parseInt(route.query.page as string) || 1)
    searchAllBrands(Number.parseInt(route.query.page as string) || 1)
    return Number.parseInt(route.query.page as string) || 1
  } catch {
  }
  return 1
})

onMounted(async () => {
  searchAllBrands(1);
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
            placeholder="検索"
          />
        </V-Control>
      </V-Field>

      <V-Buttons>
        <!--        <V-Button dark="3">View Reports</V-Button>-->
        <V-Button color="primary" icon="fas fa-plus" elevated @click="centeredActionsOpen = true">
          ブランドを追加
        </V-Button>
      </V-Buttons>
    </div>

    <div class="page-content-inner">
      <div class="flex-list-wrapper flex-list-v1">
        <!--List Empty Search Placeholder -->
        <V-PlaceholderPage
          :class="[filteredData.length !== 0 && 'is-hidden']"
          title="対象のものはございませんでした。"
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
            <span class="is-grow">ブランド名前</span>
            <span class="is-grow">会社名</span>
            <span class="is-grow">備考</span>
            <span class="is-grow cell-end">行動</span>
          </div>

          <div class="flex-list-inner">
            <transition-group name="list" tag="div">
              <!--Table item-->
              <div
                v-for="brand in filteredData"
                :key="brand.id"
                class="flex-table-item"
              >
                <div class="flex-table-cell is-grow" data-th="ブランド名前">
                  <span class="light-text">{{ brand.brand_name }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="会社名">
                  <span class="light-text">{{ brand.brand_company_name }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="備考">
                  <span class="light-text">{{ brand.description }}</span>
                </div>
                <div class="flex-table-cell is-grow cell-end" data-th="行動">
                  <span class="mr-2">
                    <VButton
                      @click="openEditActionsOpen(brand)"
                      color="primary"
                      outlined
                    > 修正
                    </VButton>
                  </span>
                  <span>
                    <VButton
                      @click="fireDeleteBrandAlert(brand)"
                      color="danger"
                      outlined> 削除</VButton>
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
          :total-items="allBrandsCount"
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
                      placeholder="ブランド名前"
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
                      placeholder="会社名"
                      autocomplete="company_brand"
                      inputmode="company_brand"
                      v-model="brand_company_name"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control icon="feather:file-text">
                    <input
                      type="email"
                      class="input"
                      placeholder="備考"
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
        <VButton @click="centeredActionsOpen = false"> キャンセル </VButton>
        <VButton color="primary" raised @click="fireBrandFuncAlert">ブランドを追加</VButton>
      </template>
    </VModal>
    <VModal
      :open="editActionsOpen"
      size="medium"
      actions="center"
      @close="editActionsOpen = false"
      title="ブランドを修正する"
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
                      placeholder="ブランド名前"
                      autocomplete="brand_name"
                      v-model="edit_brand_name"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control icon="feather:home">
                    <input
                      type="tel"
                      class="input"
                      placeholder="会社名"
                      autocomplete="company_brand"
                      inputmode="company_brand"
                      v-model="edit_brand_company_name"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control icon="feather:file-text">
                    <input
                      type="email"
                      class="input"
                      placeholder="備考"
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
        <VButton @click="editActionsOpen = false"> キャンセル </VButton>
        <VButton color="primary" raised @click="fireEditBrandFuncAlert">ブランドを修正する</VButton>
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
