<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import getAllTests from '/@src/composable/allTestData'

const route = useRoute()

const {allTests, searchAllTests, totalTestsCount} = getAllTests();

const filters = ref('')

const centeredActionsOpen = ref(false)

const filteredData = computed(() => {
  if (!filters.value) {
    return allTests.value
  } else {
    return allTests.value.filter((item) => {
      return (
        item.contact_number.match(new RegExp(filters.value, 'i')) ||
        item.test_result.match(new RegExp(filters.value, 'i')) ||
        item.record_state.match(new RegExp(filters.value, 'i')) ||
        item.created_at.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});

const currentPage = computed(() => {
  try {
    searchAllTests(Number.parseInt(route.query.page as string) || 1)
    return Number.parseInt(route.query.page as string) || 1
  } catch {
  }
  return 1
})

onMounted(() => {
  searchAllTests(1)
})

</script>

<template>
  <div>
    <div>
      <div class="">
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
                <span class="is-grow">電話番号</span>
                <span class="is-grow">検査結果</span>
                <span class="is-grow">状態</span>
                <span class="is-grow cell-end">依頼日時</span>
              </div>
              <div class="flex-list-inner">
                <transition-group name="list" tag="div">
                  <!--Table item-->
                  <div
                    v-for="test in filteredData"
                    :key="test.contact_number"
                    class="flex-table-item"
                  >
                    <div class="flex-table-cell is-grow" data-th="電話番号">
                      <span class="light-text">{{ test.contact_number }}</span>
                    </div>
                    <div class="flex-table-cell is-grow" data-th="検査結果">
                      <span class="light-text">{{ test.test_result }}</span>
                    </div>
                    <div class="flex-table-cell is-grow" data-th="状態">
                      <span class="light-text">{{ test.record_state }}</span>
                    </div>
                    <div class="flex-table-cell is-grow cell-end" data-th="依頼日時">
                      <span class="light-text">{{ test.created_at }}</span>
                    </div>
                  </div>
                </transition-group>
              </div>
            </div>
            <!--Table Pagination-->
            <V-FlexPagination
              v-if="filteredData.length > 0"
              :item-per-page="10"
              :total-items=totalTestsCount
              :current-page="currentPage"
              :max-links-displayed="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';


.columns {
  .column {
    height: fit-content;
  }
}

.data-picker-responsive {
  .column {
    width: fit-content !important;
  }
}

@media only screen and (max-width: 768px) {
  .data-picker-responsive {
    .column {
      width: auto !important;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1204px) {
  .buttons {
    flex-wrap: nowrap;
  }
}
</style>
