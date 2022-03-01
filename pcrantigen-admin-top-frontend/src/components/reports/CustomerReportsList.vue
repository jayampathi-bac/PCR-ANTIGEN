<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import getCustomersReport from '/@src/composable/reports/customerReportsData'
import CustomerReportsService from '/@src/service/reports/customerReportsService';
import {useRoute} from "vue-router";

const customerReportsService = new CustomerReportsService();
const {searchCustomers, searchBranchesToCustomer, customers, allCustomerCount, allBranches} = getCustomersReport();

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
        item.profile_url.match(new RegExp(filters.value, 'i')) ||
        item.created_at.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});

const date = ref({
  start: null,
  end: null,
})

const emptySearchData = {
  branch_id: '',
  start_date: '',
  end_date: ''
}

const selectedBranch = ref('')

const currentPageCustomer = computed(() => {
  try {
    searchCustomers((Number.parseInt(route.query.page as string) || 1), emptySearchData)
    return Number.parseInt(route.query.page as string) || 1
  } catch {
  }
  return 1
})

const selectingBranchFunc = () => {
  searchCustomers(currentPageCustomer.value, {
    branch_id: selectedBranch.value,
    start_date: date.value.start ? date.value.start.toISOString().split('T')[0] : '',
    end_date: date.value.end ? date.value.end.toISOString().split('T')[0] : '',
  })
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
  isLoaderActive.value = !isLoaderActive.value
  customerReportsService.getCustomersForCSV()
    .then(function (response) {
      // console.log('exportToCsv', response.data.data)
      if (response.data.success) {
        exportToCsv('all_customer_records.csv', response.data.data)
      } else {
        isLoaderActive.value = !isLoaderActive.value
      }
    })
    .catch(function (error) {
      isLoaderActive.value = !isLoaderActive.value
      console.log(error);
    });
}

const selectingDateFunc = () => {
  searchCustomers(currentPageCustomer.value, {
    branch_id: selectedBranch.value !== '' ? selectedBranch.value : '',
    start_date: date.value.start ? date.value.start.toISOString().split('T')[0] : '',
    end_date: date.value.end ? date.value.end.toISOString().split('T')[0] : '',
  })
}

watch(
  () => date.value,
  (count, prevCount) => {
    selectingDateFunc()
  }
)

const refreshFunc = () => {
  selectedBranch.value = ''
  date.value = {
    start: null,
    end: null,
  }
  searchCustomers(1, emptySearchData);
}

onMounted(async () => {
  searchCustomers(1, {branch_id: '', start_date: '', end_date: ''});
  searchBranchesToCustomer();
})
</script>

<template>
  <VLoader size="large" center="smooth" lighter="true" translucent="true" :active="isLoaderActive">
    <div>
      <div>
        <br>
        <br>
        <div class="s-card mb-5">
          <div class="columns is-multiline">
            <div class="column is-12-tablet is-6-desktop ">
              <div class=" mt-5">
                <V-Field>
                  <V-Control>
                    <Multiselect
                      v-model="selectedBranch"
                      :options="allBranches"
                      placeholder="薬局者を選択"
                      :searchable="true"
                      @select="selectingBranchFunc"
                    />
                  </V-Control>
                </V-Field>
              </div>
            </div>
            <div class="column is-12-tablet is-6-desktop ">
              <div class=" mt-3">
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
                                placeholder="開始日"
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
                                placeholder="終了日"
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
      <div class="list-flex-toolbar flex-list-v1">
        <V-Buttons>
          <V-Button color="info" icon="fas fa-download" elevated @click="downloadCSVFunc">
            Download
          </V-Button>
          <V-Button @click="refreshFunc" color="primary" icon="fas fa-sync" elevated>
            更新
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
              <span class="is-grow">患者</span>
              <span class="is-grow">メールアドレス</span>
              <span class="is-grow">電話番号</span>
              <span class="is-grow">作成</span>
              <span class="is-grow cell-end">薬局名</span>
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
                  <div class="flex-table-cell is-grow" data-th="作成">
                    <span class="light-text">{{ customer.created_at }}</span>
                  </div>
                  <div class="flex-table-cell  is-grow cell-end" data-th="薬局名">
                    <span class="light-text">{{ customer.branch_name }}</span>
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
            :current-page="currentPageCustomer"
            :max-links-displayed="7"
          />
        </div>
      </div>
    </div>
  </VLoader>
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

</style>
