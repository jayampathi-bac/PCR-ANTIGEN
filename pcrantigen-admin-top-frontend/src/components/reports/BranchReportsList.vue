<script setup lang="ts">
import {computed, inject, onMounted, ref, watch} from 'vue'

import getBranchesReport from '/@src/composable/reports/branchReportsData'

import useNotyf from '/@src/composable/useNotyf'

import CustomerService from '/@src/service/customerService';

import {useCookies} from "vue3-cookies";
import {useRoute} from "vue-router";

const swal: any = inject('$swal')

const {cookies} = useCookies();

const customerService = new CustomerService();

const notif = useNotyf()

const {allBranchesCount, branches, searchBranches, searchGroupsToBranch, allGroups} = getBranchesReport();

const centeredActionsOpen = ref(false)

const route = useRoute()

const filters = ref('')

const filteredData = computed(() => {
  if (!filters.value) {
    return branches.value
  } else {
    return branches.value.filter((item) => {
      return (
        item.company_name.match(new RegExp(filters.value, 'i')) ||
        item.address.match(new RegExp(filters.value, 'i')) ||
        item.contact_number.match(new RegExp(filters.value, 'i')) ||
        item.group_name.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});

const currentPageBranch = computed(() => {
  try {
    searchBranches(Number.parseInt(route.query.page as string) || 1, {group_id: 0, orderby: 0})
    return Number.parseInt(route.query.page as string) || 1
  } catch {
  }
  return 1
})

const selectedGroup = ref(0)
const selectedFilter = ref(3)

const exportToCsv = (filename : any) => {
  const json = branches.value;
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
  exportToCsv('all_branches_records.csv')
}

const selectingFunc = () => {
  console.log("selectingGroupFunc", selectedGroup.value)
  searchBranches(currentPageBranch.value, {
    group_id: selectedGroup.value,
    orderby: selectedFilter.value === 3 ? 0 : selectedFilter.value
  })
}

const refreshFunc = () => {
  selectedGroup.value = 0
  selectedFilter.value = 3
  searchBranches(1, {group_id: 0, orderby: 0})
}

onMounted(async () => {
  console.log("Branch loading---------------------------------------------------")
  searchBranches(1, {group_id: 0, orderby: 0})
  searchGroupsToBranch()
})
</script>

<template>
  <div>
    <div>
      <br>
      <br>
      <div class="s-card mb-5">
        <div class="columns is-multiline">
          <div class="column is-6">
            <div class=" mt-5">
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
          <div class="column is-6">
            <div class=" mt-5">
              <V-Field>
                <V-Control>
                  <Multiselect
                    v-model="selectedFilter"
                    :options="[{value: 0, label : 'All'}, {value: 1, label : 'Min to Max'}, {value: 2, label : 'Max to Min'}]"
                    placeholder="Filter by Tests Count: "
                    :searchable="true"
                    @select="selectingFunc"
                  />
                </V-Control>
              </V-Field>
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
            <span class="is-grow">Company</span>
            <span class="is-grow">Contact Number</span>
            <span class="is-grow">Address</span>
            <span class="is-grow">Group</span>
            <span class="is-grow cell-end">Tests Count</span>
          </div>

          <div class="flex-list-inner">
            <transition-group name="list" tag="div">
              <!--Table item-->
              <div
                v-for="branch in filteredData"
                :key="branch.branch_id"
                class="flex-table-item"
              >
                <div class="flex-table-cell is-media is-grow">
                  <V-Avatar
                    :picture="branch.profile_url"
                    size="medium"
                  />
                  <div>
                    <span class="item-name dark-inverted">{{ branch.company_name }}</span>
                  </div>
                </div>
                <div class="flex-table-cell is-grow" data-th="Contact Number">
                  <span class="light-text">{{ branch.contact_number }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="Address">
                  <span class="light-text">{{ branch.address }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="Group">
                  <span class="light-text">{{ branch.group_name }}</span>
                </div>
                <div class="flex-table-cell is-grow cell-end" data-th="Tests Count">
                  <span class="light-text">{{ branch.count }}</span>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!--Table Pagination-->
        <V-FlexPagination
          v-if="filteredData.length > 0"
          :item-per-page="10"
          :total-items="allBranchesCount"
          :current-page="currentPageBranch"
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
