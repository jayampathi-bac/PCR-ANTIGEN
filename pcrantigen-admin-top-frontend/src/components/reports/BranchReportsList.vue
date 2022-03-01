<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute} from "vue-router";
import getBranchesReport from '/@src/composable/reports/branchReportsData'
import BranchReportsService from '/@src/service/reports/branchReportsService';

const route = useRoute()

const branchReportsService = new BranchReportsService();
const {allBranchesCount, branches, searchBranches, searchGroupsToBranch, allGroups} = getBranchesReport();

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
const isLoaderActive = ref(false)

const exportToCsv = (filename: any) => {
  isLoaderActive.value = !isLoaderActive.value
  branchReportsService.getBranchesForCSV()
    .then(function (response) {
      // console.log('exportToCsv', response.data.data)
      if (response.data.success) {
        const json = response.data.data;
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
      } else {
        isLoaderActive.value = !isLoaderActive.value
      }
      // isLoaderActive.value = !isLoaderActive.value
    })
    .catch(function (error) {
      isLoaderActive.value = !isLoaderActive.value
      console.log(error);
      // isLoaderActive.value = !isLoaderActive.value
    });
  // console.log(branches.value)

}

const downloadCSVFunc = () => {
  exportToCsv('all_branches_records.csv')
}

const selectingFunc = () => {
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
  searchBranches(1, {group_id: 0, orderby: 0})
  searchGroupsToBranch()
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
          <div class="column is-6">
            <div class=" mt-5">
              <V-Field>
                <V-Control>
                  <Multiselect
                    v-model="selectedGroup"
                    :options="allGroups"
                    placeholder="グループを選択"
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
                    :options="[{value: 0, label : '全て'}, {value: 1, label : '昇順（小さい順）'}, {value: 2, label : '降順（大きい順）'}]"
                    placeholder="検査数で並べ替え"
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
            <span class="is-grow">薬局名</span>
            <span class="is-grow">電話番号</span>
            <span class="is-grow">ご住所</span>
            <span class="is-grow">グループ</span>
            <span class="is-grow cell-end">検査数</span>
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
                <div class="flex-table-cell is-grow" data-th="電話番号">
                  <span class="light-text">{{ branch.contact_number }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="ご住所">
                  <span class="light-text">{{ branch.address }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="グループ">
                  <span class="light-text">{{ branch.group_name }}</span>
                </div>
                <div class="flex-table-cell is-grow cell-end" data-th="検査数">
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
