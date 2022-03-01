<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import getCustomers from '/@src/composable/customersData'
import {useRoute} from "vue-router";

const {search, customers, allCustomerCount} = getCustomers();

const route = useRoute()
const filters = ref('')

const filteredData = computed(() => {
  if (!filters.value) {
    return customers.value
  } else {
    return customers.value.filter((item) => {
      return (
        item.name.match(new RegExp(filters.value, 'i')) ||
        item.contact_number.match(new RegExp(filters.value, 'i')) ||
        item.email.match(new RegExp(filters.value, 'i')) ||
        item.profile_url.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});


const currentPage = computed(() => {
  try {
    search(Number.parseInt(route.query.page as string) || 1 )
    return Number.parseInt(route.query.page as string) || 1
  } catch {}
  return 1
})

onMounted(async () => {
  search(1);
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
            placeholder="検査"
          />
        </V-Control>
      </V-Field>
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
            <span class="is-grow">患者</span>
            <span class="is-grow">メールアドレス</span>
            <span class="is-grow">電話番号</span>
            <span class="is-grow cell-end">作成</span>
          </div>

          <div class="flex-list-inner">
            <transition-group name="list" tag="div">
              <!--Table item-->
              <div
                v-for="customer in filteredData"
                :key="customer.contact_number"
                class="flex-table-item"
              >
                <div class="flex-table-cell is-media is-grow">
                  <V-Avatar
                    :picture="customer.profile_url"
                    color="info"
                    size="medium"
                  />
                  <div>
                    <span class="item-name dark-inverted">{{ customer.name }}</span>
                  </div>
                </div>
                <div class="flex-table-cell is-grow" data-th="メールアドレス">
                  <span class="light-text">{{ customer.email }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="電話番号">
                  <span class="light-text">{{ customer.contact_number }}</span>
                </div>
                <div class="flex-table-cell  is-grow cell-end" data-th="作成">
                  <span class="light-text">{{ customer.created_at }}</span>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!--Table Pagination-->
        <V-FlexPagination
          v-if="filteredData.length > 0"
          :item-per-page="10"
          :total-items="allCustomerCount"
          :current-page="currentPage"
          :max-links-displayed="7"
        />
      </div>
    </div>

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
