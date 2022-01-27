<script setup lang="ts">
import {computed, inject, onMounted, ref, watch} from 'vue'

import getCustomersReport from '/@src/composable/reports/customerReportsData'

import useNotyf from '/@src/composable/useNotyf'

import CustomerReportsService from '/@src/service/reports/customerReportsService';

import {useCookies} from "vue3-cookies";
import {useRoute} from "vue-router";

const swal: any = inject('$swal')

const {cookies} = useCookies();

const customerReportsService = new CustomerReportsService();

const notif = useNotyf()

const {searchCustomers, searchBranchesToCustomer, customers, allCustomerCount, allBranches} = getCustomersReport();

const centeredActionsOpen = ref(false)

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

//profile_url: string; password: string; email: string; contact_number: string; name: string;
const name = ref('')
const contact_number = ref('')
const email = ref('')
const confirm_email = ref('')
const profile_url = ref('https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png')
const password = ref('')
const confirm_password = ref('')


// {branch_id: string, start_date: string, end_date: string}
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
  console.log("selectingBranchFunc",selectedBranch.value)
  // console.log('date range', date.value.start.toISOString().split('T')[0])
  searchCustomers(currentPageCustomer.value,{
    branch_id: selectedBranch.value,
    start_date: date.value.start ? date.value.start.toISOString().split('T')[0] : '',
    end_date : date.value.end ? date.value.end.toISOString().split('T')[0] : '',
  })
}

const selectingDateFunc = () => {
  // console.log('date range', date.value.start.toISOString().split('T')[0])
  searchCustomers(currentPageCustomer.value,{
    branch_id: selectedBranch.value !== '' ? selectedBranch.value : '',
    start_date: date.value.start ? date.value.start.toISOString().split('T')[0] : '',
    end_date : date.value.end ? date.value.end.toISOString().split('T')[0] : '',
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
  // console.log("selected branch",selectedBranch.value)
  searchCustomers(1, emptySearchData);
  // console.log('date range', date.value.start.toISOString().split('T')[0])
}

const testingFunc = (value: number) => {
  console.log("testingFunc---------------------------------------------------",value)
}

onMounted(async () => {
  console.log("Customer loading---------------------------------------------------")
  searchCustomers(1, {branch_id: '', start_date: '', end_date: ''});
  searchBranchesToCustomer();
})
</script>

<template>
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
                    placeholder="By branch"
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
    <div class="list-flex-toolbar flex-list-v1">
      <V-Buttons>
        <V-Button @click="refreshFunc" color="primary" icon="fas fa-sync" elevated >
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
            <span class="is-grow">Email</span>
            <span class="is-grow">Contact</span>
            <span class="is-grow">Created At</span>
            <span class="is-grow cell-end">Branch Name</span>
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
                <div class="flex-table-cell is-grow" data-th="Email">
                  <span class="light-text">{{ customer.email }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="Contact Number">
                  <span class="light-text">{{ customer.contact_number }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="Created At">
                  <span class="light-text">{{ customer.created_at }}</span>
                </div>
                <div class="flex-table-cell  is-grow cell-end" data-th="Actions">
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
          @update:currentPageCustomer="testingFunc"
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

//.data-picker-responsive {
//  .column {
//    width: fit-content !important;
//  }
//}

//@media only screen and (max-width: 768px) {
//  .data-picker-responsive {
//    .column {
//      width: auto !important;
//    }
//  }
//}


//@media only screen and (min-width: 767px) {
//  .v-calendar-combo {
//    margin: 0 !important;
//
//    .column {
//      padding-top: 0 !important;
//      padding-bottom: 0 !important;
//
//      &:first-child {
//        padding-left: 0 !important;
//      }
//      &:last-child {
//        padding-right: 0 !important;
//      }
//    }
//  }
//}

//@media only screen and (min-width: 768px) and (max-width: 1204px) {
//  .buttons {
//    flex-wrap: nowrap;
//  }
//}

</style>
