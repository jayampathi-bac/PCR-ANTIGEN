<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'

import getTestsReport from '/@src/composable/reports/testReportsData'
import getCustomersReport from "/@src/composable/reports/customerReportsData";
import getBranchesReport from '/@src/composable/reports/branchReportsData'

import {useRoute} from "vue-router";

const {tests, searchTests, allTestsCount} = getTestsReport();
const {searchBranchesToCustomer, allBranches} = getCustomersReport();
const {searchGroupsToBranch, allGroups} = getBranchesReport();

const route = useRoute()

const filters = ref('')

const filteredData = computed(() => {
  if (!filters.value) {
    return tests.value
  } else {
    return tests.value.filter((item) => {
      return (
        item.contact_number.match(new RegExp(filters.value, 'i')) ||
        item.test_result.match(new RegExp(filters.value, 'i')) ||
        item.record_state.match(new RegExp(filters.value, 'i')) ||
        item.created_at.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});

const selectedResult = ref(5)
const selectedState = ref(5)
const selectedBranch = ref(0)
const selectedGroup = ref(0)

const currentPage = computed(() => {
  try {
    searchTests(Number.parseInt(route.query.page as string) || 1, {
      start_date: '',
      end_date: '',
      result: 0,
      status: 0,
      branch_id: 0,
      group_id: 0
    })
    return Number.parseInt(route.query.page as string) || 1
  } catch {
  }
  return 1
})

const date = ref({
  start: null,
  end: null,
})

const selectingFunc = () => {
  console.log("selectingGroupFunc", selectedResult.value, selectedState.value, date.value.start, date.value.end)
  searchTests(currentPage.value, {
    start_date: date.value.start ? date.value.start.toISOString().split('T')[0] : '',
    end_date: date.value.end ? date.value.end.toISOString().split('T')[0] : '',
    result: selectedResult.value === 5 ? 0 : selectedResult.value,
    status: selectedState.value === 5 ? 0 : selectedState.value,
    branch_id: selectedBranch.value,
    group_id: selectedGroup.value,
  })
}

const refreshFunc = () => {
  selectedResult.value = 5
  selectedState.value = 5
  selectedBranch.value = 0
  selectedGroup.value = 0
  date.value = {
    start: null,
    end: null,
  }
  searchTests(1, {start_date: '', end_date: '', result: 0, status: 0, branch_id: 0, group_id: 0})
}

const exportToCsv = (filename: any) => {
  const json = tests.value;
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
}

const downloadCSVFunc = () => {
  exportToCsv('all_test_records.csv')
}

watch(
  () => date.value,
  (count, prevCount) => {
    // console.log("date------------",date.value)
    // console.log("date------------", date.value.start.toISOString().split('T')[0],date.value.end.toISOString().split('T')[0])
    selectingFunc()
  }
)

onMounted(async () => {
  console.log("--------------------------Test loading--------------------------")
  searchTests(1, {start_date: '', end_date: '', result: 0, status: 0, branch_id: 0, group_id: 0})
  searchBranchesToCustomer();
  searchGroupsToBranch();
})
</script>

<template>
  <div>
    <div>
      <br>
      <br>
      <div class="s-card mb-2">
        <div class="columns is-multiline">
          <div class="column is-3 ">
            <div class=" ">
              <V-Field>
                <V-Control>
                  <Multiselect
                    v-model="selectedResult"
                    :options="[{value: 0, label : 'All'}, {value: 1, label : 'Positive'}, {value: 2, label : 'Negative'}]"
                    placeholder="By Result"
                    :searchable="true"
                    @select="selectingFunc"
                  />
                </V-Control>
              </V-Field>
            </div>
          </div>
          <div class="column is-3">
            <div class=" ">
              <V-Field>
                <V-Control>
                  <Multiselect
                    v-model="selectedState"
                    :options="[{value: 0, label : 'All'}, {value: 1, label : 'Completed'}, {value: 2, label : 'Incomplete'} ,{value: 3, label : 'Pending'} ]"
                    placeholder="By Test Status"
                    :searchable="true"
                    @select="selectingFunc"
                  />
                </V-Control>
              </V-Field>
            </div>
          </div>

          <div class="column is-3">
            <div class=" ">
              <V-Field>
                <V-Control>
                  <Multiselect
                    v-model="selectedGroup"
                    :options="allGroups"
                    placeholder="By Group"
                    :searchable="true"
                    @select="selectingFunc"
                  />
                </V-Control>
              </V-Field>
            </div>
          </div>
          <div class="column is-3">
            <div class=" ">
              <V-Field>
                <V-Control>
                  <Multiselect
                    v-model="selectedBranch"
                    :options="allBranches"
                    placeholder="By branch"
                    :searchable="true"
                    @select="selectingFunc"
                  />
                </V-Control>
              </V-Field>
            </div>
          </div>
          <div class="column is-6 ">
            <div class="">
              <div class="data-picker-responsive">
                <v-date-picker
                  v-model="date"
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
          </div>
        </div>
      </div>
    </div>
    <div class="list-flex-toolbar flex-list-v1 m-4">
      <V-Buttons>
        <V-Button color="info" icon="fas fa-download" elevated @click="downloadCSVFunc">
          Download
        </V-Button>
        <V-Button color="primary" icon="fas fa-sync" elevated @click="refreshFunc">
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
            <span class="is-grow">Contact Number</span>
            <span class="is-grow">Test Result</span>
            <span class="is-grow">Record State</span>
            <span class="is-grow">Branch</span>
            <span class="is-grow">Group</span>
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
                <div class="flex-table-cell is-grow" data-th="Contact Number">
                  <span class="light-text">{{ test.contact_number }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="Test Result">
                  <span class="light-text">{{ test.test_result }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="Record State">
                  <span class="light-text">{{ test.record_state }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="Branch">
                  <span class="light-text">{{ test.branch_name }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="Group">
                  <span class="light-text">{{ test.group_name }}</span>
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
          :total-items=allTestsCount
          :current-page="currentPage"
          :max-links-displayed="7"
        />
      </div>
    </div>

  </div>

</template>

<style lang="scss">
@import 'src/scss/abstracts/_variables.scss';
@import 'src/scss/abstracts/_mixins.scss';
@import 'src/scss/pages/generic/_forms.scss';

.grid-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h3 {
    font-family: $font-alt;
    font-size: 1.5rem;
    font-weight: 700;
    color: $dark-text;
    line-height: 1.2;
  }

  .filter {
    display: flex;
    align-items: center;
    background: $white;
    padding: 8px 24px;
    border-radius: 100px;

    > span {
      font-family: $font-alt;
      font-size: 0.85rem;
      font-weight: 600;
      color: $dark-text;
      margin-right: 20px;
    }

    .multiselect {
      min-width: 140px;

      .multiselect-input {
        border: none;
      }
    }
  }
}

.is-dark {
  .grid-header {
    h3 {
      color: $dark-dark-text;
    }

    .filter {
      background: lighten($dark-sidebar, 1%) !important;
      border-color: lighten($dark-sidebar, 4%) !important;

      > span {
        color: $dark-dark-text;
      }
    }
  }
}

.swal2-title {
  font-size: 20px !important;
}

.swal2-styled.swal2-confirm {
  background-color: #41b883 !important;
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

@media only screen and (min-width: 767px) {
  .v-calendar-combo {
    margin: 0 !important;

    .column {
      padding-top: 0 !important;
      padding-bottom: 0 !important;

      &:first-child {
        padding-left: 0 !important;
      }

      &:last-child {
        padding-right: 0 !important;
      }
    }
  }
}

</style>
