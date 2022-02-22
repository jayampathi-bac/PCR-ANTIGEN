<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import useNotyf from '/@src/composable/useNotyf'
import AllTestsService from '/@src/service/allTestsService';
import getAllTests from '/@src/composable/allTestData'
import {useCookies} from "vue3-cookies";

const route = useRoute()

const {allTests, searchAllTests, searchAllTestsByRange, searchAllTestsByMonth, totalTests} = getAllTests();
const allTestsService = new AllTestsService();
const notif = useNotyf()
const {cookies} = useCookies();
const filters = ref('')
const centeredActionsOpen = ref(false)
const filteredData = computed(() => {
  if (!filters.value) {
    return allTests.value
  } else {
    return allTests.value.filter((item) => {
      return (
        item.customer_name.match(new RegExp(filters.value, 'i')) ||
        item.customer_contact_number.match(new RegExp(filters.value, 'i')) ||
        item.record_id.toString().match(new RegExp(filters.value, 'i')) ||
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

const searchCustomerByRange = () => {
  if (dateRange.value) {
    searchAllTestsByRange(dateRange.value.start.toISOString().split('T')[0], dateRange.value.end.toISOString().split('T')[0])
  } else {
    notif.warning('Please enter start date and end date.!')
  }
}

const searchCustomerByMonth = () => {
  switch (selectedMonth.value) {
    case 'January':
      selectedMonthByNo.value = 1;
      break;
    case 'February':
      selectedMonthByNo.value = 2;
      break;
    case 'March':
      selectedMonthByNo.value = 3;
      break;
    case 'April':
      selectedMonthByNo.value = 4;
      break;
    case 'May':
      selectedMonthByNo.value = 5;
      break;
    case 'June':
      selectedMonthByNo.value = 6;
      break;
    case 'July':
      selectedMonthByNo.value = 7;
      break;
    case 'August':
      selectedMonthByNo.value = 8;
      break;
    case 'September':
      selectedMonthByNo.value = 9;
      break;
    case 'October':
      selectedMonthByNo.value = 10;
      break;
    case 'November':
      selectedMonthByNo.value = 11;
      break;
    case 'December':
      selectedMonthByNo.value = 12;
      break;
  }
  if (selectedMonthByNo.value != 0) {
    searchAllTestsByMonth(selectedMonthByNo.value)
  } else {
    notif.warning('Please select a month.!')
  }
}

const isLoaderActive = ref(false)

const exportToCsv = (filename: any, data: any) => {
  const json = data;
  const fields = Object.keys(json[0]);
  const replacer = function (key, value) {
    return value === null ? '' : value
  };
  let csvFile = json.map(function (row) {
    return fields.map(function (fieldName) {
      return JSON.stringify(row[fieldName], replacer)
    }).join(',')
  });
  csvFile.unshift(fields.join(',')) // add header column
  csvFile = csvFile.join('\r\n');

  const blob = new Blob([csvFile], {type: 'text/csv;charset=utf-8;'});
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  isLoaderActive.value = !isLoaderActive.value
}


const downloadCSVFunc = () => {
  // exportToCsv('all_test_records.csv')
  isLoaderActive.value = !isLoaderActive.value
  allTestsService.getAllTestsForCSV(cookies.get('admin2').branch_id.toString())
    .then(function (response) {
      // console.log('exportToCsv', response.data.data)
      if (response.data.success) {
        exportToCsv('all_test_records.csv', response.data.data)
      } else {
        isLoaderActive.value = !isLoaderActive.value
      }
      // isLoaderActive.value = !isLoaderActive.value
    })
    .catch(function (error) {
      isLoaderActive.value = !isLoaderActive.value
      console.log(error);
    });
}

const refreshLoading = () => {
  searchAllTests(1)
}

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
  <VLoader size="large" center="smooth" lighter="true" translucent="true" :active="isLoaderActive">
    <div>
      <div class="s-card mb-5">
        <div class="columns is-multiline">
          <div class="column is-3">
            <V-Field>
              <label>Filter Search</label>
              <V-Control>
                <VRadio
                  v-model="selected"
                  value="range"
                  label="Date Range"
                  name="outlined_radio"
                  color="primary"
                />
                <VRadio
                  v-model="selected"
                  value="month"
                  label="Month"
                  name="outlined_radio"
                  color="info"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-6 ">
            <div v-show="selected === 'range'" class=" mt-4">
              <div class="data-picker-responsive">
                <v-date-picker
                  v-model="dateRange"
                  is-range
                  color="green"
                  trim-weeks
                  class="column is-6"
                >
                  <template #default="{ inputValue, inputEvents }">
                    <div class="columns v-calendar-combo">
                      <div class="column is-6">
                        <V-Field>
                          <!--                    <label>Meeting date</label>-->

                          <V-Control icon="feather:calendar">
                            <input
                              placeholder="Start Date"
                              :value="inputValue.start"
                              class="input form-datepicker"
                              v-on="inputEvents.start"
                            />
                          </V-Control>
                        </V-Field>
                      </div>
                      <div class="column is-6">
                        <V-Field>
                          <!--                    <label class="is-vhidden">Meeting date</label>-->
                          <V-Control icon="feather:calendar">
                            <input
                              placeholder="End Date"
                              :value="inputValue.end"
                              class="input form-datepicker"
                              v-on="inputEvents.end"
                            />
                          </V-Control>
                        </V-Field>
                      </div>
                    </div>
                  </template>
                </v-date-picker>
              </div>
            </div>
            <div v-show="selected === 'month'" class="mt-5">
              <Multiselect
                v-model="selectedMonth"
                :options="['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']"
                placeholder="Select a month"
              />
            </div>
          </div>
          <div class="column is-3-desktop-only  mt-5 is-flex is-justify-content-center">
            <V-Buttons>
              <V-Button v-show="selected === 'range'" color="info" icon="fas fa-search" elevated
                        @click="searchCustomerByRange()">
                Search
              </V-Button>
              <V-Button v-show="selected === 'month'" color="info" icon="fas fa-search" elevated
                        @click="searchCustomerByMonth()">
                Search
              </V-Button>
              <V-Button color="primary" icon="fas fa-download" elevated @click="downloadCSVFunc">
                Download
              </V-Button>
            </V-Buttons>
          </div>
        </div>
      </div>
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

            <V-Buttons>
              <!--        <V-Button dark="3">View Reports</V-Button>-->
              <V-Button color="primary" icon="feather:refresh-cw" elevated @click="refreshLoading()">
                refresh
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
                  <span class="is-grow">Customer</span>
                  <span class="is-grow">Contact Number</span>
                  <span class="is-grow">Record ID</span>
                  <span class="is-grow">Test Result</span>
                  <span class="is-grow">Record State</span>
                  <span class="is-grow cell-end">Created At</span>
                </div>
                <div class="flex-list-inner">
                  <transition-group name="list" tag="div">
                    <!--Table item-->
                    <div
                      v-for="test in filteredData"
                      :key="test.customer_contact_number"
                      class="flex-table-item"
                    >
                      <div class="flex-table-cell is-media is-grow">
                        <V-Avatar
                          :picture="test.customer_img_url"
                          color="info"
                          size="medium"
                        />
                        <div>
                          <span class="item-name dark-inverted">{{ test.customer_name }}</span>
                        </div>
                      </div>
                      <div class="flex-table-cell is-grow" data-th="Contact Number">
                        <span class="light-text">{{ test.customer_contact_number }}</span>
                      </div>
                      <div class="flex-table-cell is-grow" data-th="Record ID">
                        <span class="light-text">{{ test.record_id }}</span>
                      </div>
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
                :total-items=totalTests
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
  </VLoader>
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
