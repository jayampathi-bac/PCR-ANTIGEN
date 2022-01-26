<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'
import useNotyf from '/@src/composable/useNotyf'

import getAllTests from '/@src/composable/allTestData'
const route = useRoute()

const {allTests, searchAllTests, totalTestsCount} = getAllTests();

const notif = useNotyf()
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
const selected = ref('range')
const dateRange = ref(null)
const selectedMonth = ref('')
const selectedMonthByNo = ref(0)



// const refreshLoading = () => {
//   searchAllTests(1)
// }

const currentPage = computed(() => {
  try {
    searchAllTests(Number.parseInt(route.query.page as string) || 1 )
    return Number.parseInt(route.query.page as string) || 1
  } catch {}
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
                placeholder="Search..."
              />
            </V-Control>
          </V-Field>

<!--          <V-Buttons>-->
<!--            &lt;!&ndash;        <V-Button dark="3">View Reports</V-Button>&ndash;&gt;-->
<!--            <V-Button color="primary" icon="feather:refresh-cw" elevated @click="refreshLoading()">-->
<!--              refresh-->
<!--            </V-Button>-->
<!--          </V-Buttons>-->
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
<!--                <span class="is-grow">Customer</span>-->
                <span class="is-grow">Contact Number</span>
<!--                <span class="is-grow">Record ID</span>-->
                <span class="is-grow">Test Result</span>
                <span class="is-grow">Record State</span>
                <span class="is-grow cell-end">Created At</span>
              </div>
              <div class="flex-list-inner">
                <transition-group name="list" tag="div">
                  <!--Table item-->
                  <div
                    v-for="test in filteredData"
                    :key="test.contact_number"
                    class="flex-table-item"
                  >
<!--                    <div class="flex-table-cell is-media is-grow">-->
<!--                      <V-Avatar-->
<!--                        :picture="test.customer_img_url"-->
<!--                        color="info"-->
<!--                        size="medium"-->
<!--                      />-->
<!--                      <div>-->
<!--                        <span class="item-name dark-inverted">{{ test.customer_name }}</span>-->
<!--                      </div>-->
<!--                    </div>-->
                    <div class="flex-table-cell is-grow" data-th="Contact Number">
                      <span class="light-text">{{ test.contact_number }}</span>
                    </div>
<!--                    <div class="flex-table-cell is-grow" data-th="Record ID">-->
<!--                      <span class="light-text">{{ test.record_id }}</span>-->
<!--                    </div>-->
                    <div class="flex-table-cell is-grow" data-th="Test Result">
                      <span class="light-text">{{ test.test_result }}</span>
                    </div>
                    <div class="flex-table-cell is-grow" data-th="Record State">
                      <span class="light-text">{{ test.record_state }}</span>
                    </div>
                    <div class="flex-table-cell is-grow cell-end" data-th="Created At">
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
      <VModal
        :open="centeredActionsOpen"
        size="large"
        actions="center"
        @close="centeredActionsOpen = false"
        title="Test Details"
      >
        <template #content>
          <form class="form-layout is-split" @submit.prevent>
            <div class="form-outer">
              <div class="form-section is-grey">
                <div>
                  <V-Field>
                    <V-Control icon="feather:user">
                      <input
                        type="text"
                        class="input"
                        placeholder="Customer ID"
                        autocomplete="customer-id"
                      />
                    </V-Control>
                  </V-Field>
                  <V-Field>
                    <V-Control icon="feather:user">
                      <input
                        type="text"
                        class="input"
                        placeholder="Test Name"
                        autocomplete="test-name"
                      />
                    </V-Control>
                  </V-Field>
                  <V-Field>
                    <V-Control icon="feather:mail">
                      <input
                        type="email"
                        class="input"
                        placeholder="Email Address *"
                        autocomplete="email"
                        inputmode="email"
                      />
                    </V-Control>
                  </V-Field>
                  <V-Field>
                    <V-Control icon="feather:phone">
                      <input
                        type="tel"
                        class="input"
                        placeholder="Phone Number *"
                        autocomplete="tel"
                        inputmode="tel"
                      />
                    </V-Control>
                  </V-Field>
                  <V-Field>
                    <V-Control icon="feather:phone">
                      <input
                        type="tel"
                        class="input"
                        placeholder="Test Date"
                        autocomplete="test-date"
                      />
                    </V-Control>
                  </V-Field>
                </div>
              </div>
            </div>
          </form>
        </template>
        <template #action>
          <VButton color="primary" raised>Issue Resultf</VButton>
        </template>
      </VModal>
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
