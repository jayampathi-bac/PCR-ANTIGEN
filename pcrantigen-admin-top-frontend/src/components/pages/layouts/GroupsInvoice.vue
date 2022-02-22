<script setup lang="ts">
import {popovers} from '/@src/data/users/userPopovers'
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";
import getInvoiceGroupData from '/@src/composable/invoice/invoiceGroupData'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const route = useRoute()
const router = useRouter()
const {loadInvoiceGroupData, invoiceGroupDataList, groupTotalPrice} = getInvoiceGroupData();

const invoiceData = ref()
const startDate = ref()
const endDate = ref()
const group_name = ref()

const backtoTestsPage = () => {
  router.push({name: 'sidebar-layouts-reports-list-tests'})
}

const downloadPDF = () => {
  const node = document.getElementById('printMe');

  html2canvas(node).then(canvas => {
    const doc = new jsPDF("l", "mm", "a4");
    const imgData = canvas.toDataURL();
    doc.addImage(imgData, 'JPEG', 0, 0, 300, 192);
    doc.save('invoice.pdf');
  });
}

onMounted(() => {
  // console.log("hi this is the param data",JSON.parse(route.params.data))
  if (route.params.data) {

    invoiceData.value = JSON.parse(route.params.data)
    loadInvoiceGroupData({
      group_id: invoiceData.value.group_id,
      start_date: invoiceData.value.start_date,
      end_date: invoiceData.value.end_date,
    })
    startDate.value = invoiceData.value.start_date
    endDate.value = invoiceData.value.end_date
    group_name.value = invoiceData.value.group_name
  } else {
    router.push({name: 'sidebar-layouts-reports-list-tests'})
  }
})


</script>

<template>
  <div class="invoice-wrapper">
    <div class="invoice-header">
      <div class="left">
        <h3>Group Invoice </h3>
      </div>
      <div class="right">
        <div class="controls">
          <!--          <VButton color="primary" v-print="'#printMe'" raised>Print</VButton>-->
          <a class="action" @click="downloadPDF" >
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:printer"

            ></i>
          </a>
          <!--          <a class="action">-->
          <!--            <i-->
          <!--              aria-hidden="true"-->
          <!--              class="iconify"-->
          <!--              data-icon="feather:download-cloud"-->
          <!--            ></i>-->
          <!--          </a>-->
          <!--          <a class="action">-->
          <!--            <i aria-hidden="true" class="iconify" data-icon="feather:mail"></i>-->
          <!--          </a>-->
          <a class="action" @click="backtoTestsPage">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:arrow-left"
            ></i>
          </a>
        </div>
      </div>
    </div>
    <div class="invoice-body">
      <div class="invoice-card" style="background-color: #ffffff !important; color: black !important;" id="printMe">
        <div class="invoice-section is-flex is-bordered">
          <!--          <tippy class="has-help-cursor" interactive placement="bottom-start">-->
          <!--            <V-Avatar size="large" picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" />-->
          <!--            <template #content>-->
          <!--              <UserPopoverContent :user="popovers.user13" />-->
          <!--            </template>-->
          <!--          </tippy>-->

          <div class="meta">
            <h3>{{ group_name }}</h3>
            <!--            <span>branch@email.com</span>-->
            <!--            <span>+1 123-4567</span>-->
          </div>
          <div class="end">
            <h3>Duration </h3>
            <span>Start-Date: {{ startDate }}</span>
            <span>End Date: {{ endDate }}</span>
          </div>
        </div>


        <div class="invoice-section">
          <div class="flex-table">
            <!--Table header-->
            <div class="flex-table-header">
              <span class="is-grow">Description</span>
              <span class="cell-end">Unit Price</span>
              <span>Test Count</span>
              <!--              <span>Rate</span>-->
              <span>Subtotal</span>
            </div>

            <!--Table item-->
            <div class="flex-table-item" v-for="(item, key) in invoiceGroupDataList" :key="key">
              <div class="flex-table-cell is-grow" data-th="">
                <span class="dark-text">{{ item.branch_name }}</span>
              </div>
              <div class="flex-table-cell cell-end" data-th="Unit Price">
                <span class="light-text">{{ item.unit_price }}</span>
              </div>
              <div class="flex-table-cell" data-th="Test Count">
                <span class="light-text">{{ item.test_count }}</span>
              </div>
              <!--              <div class="flex-table-cell" data-th="Rate">-->
              <!--                <span class="dark-inverted">$24</span>-->
              <!--              </div>-->
              <div class="flex-table-cell has-text-right" data-th="Subtotal">
                <span class="dark-inverted">${{ item.total }}</span>
              </div>
            </div>

            <!--Table item-->


            <!--Table item-->

          </div>

          <div class="flex-table sub-table">
            <!--Table item-->
            <!--            <div class="flex-table-item">-->
            <!--              <div class="flex-table-cell is-grow is-vhidden" data-th="">-->
            <!--                <span class="dark-text">Website Development</span>-->
            <!--              </div>-->
            <!--              <div class="flex-table-cell cell-end is-vhidden" data-th="Unit">-->
            <!--                <span class="light-text">hrs</span>-->
            <!--              </div>-->
            <!--              <div class="flex-table-cell is-vhidden" data-th="Quantity">-->
            <!--                <span class="light-text">2</span>-->
            <!--              </div>-->
            <!--              <div class="flex-table-cell" data-th="">-->
            <!--                <span class="table-label">Subtotal</span>-->
            <!--              </div>-->
            <!--              <div class="flex-table-cell has-text-right" data-th="">-->
            <!--                <span class="table-total dark-inverted">$1,808</span>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--Table item-->
            <!--            <div class="flex-table-item">-->
            <!--              <div class="flex-table-cell is-grow is-vhidden" data-th="">-->
            <!--                <span class="dark-text">Website Development</span>-->
            <!--              </div>-->
            <!--              <div class="flex-table-cell cell-end is-vhidden" data-th="Unit">-->
            <!--                <span class="light-text">hrs</span>-->
            <!--              </div>-->
            <!--              <div class="flex-table-cell is-vhidden" data-th="Quantity">-->
            <!--                <span class="light-text">2</span>-->
            <!--              </div>-->
            <!--              <div class="flex-table-cell" data-th="">-->
            <!--                <span class="table-label">Taxes</span>-->
            <!--              </div>-->
            <!--              <div class="flex-table-cell has-text-right" data-th="">-->
            <!--                <span class="table-total dark-inverted">$273</span>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--Table item-->
            <div class="flex-table-item">
              <div class="flex-table-cell is-grow is-vhidden" data-th="">
                <span class="dark-text">PCR Antigen</span>
              </div>
              <div class="flex-table-cell cell-end is-vhidden" data-th="Unit">
                <span class="light-text">hrs</span>
              </div>
              <div class="flex-table-cell is-vhidden" data-th="Quantity">
                <span class="light-text">2</span>
              </div>
              <div class="flex-table-cell" data-th="">
                <span class="table-label" style="color: black !important;">Total</span>
              </div>
              <div class="flex-table-cell has-text-right" data-th="">
                <span class="table-total is-bigger dark-inverted">${{ groupTotalPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';

/* ==========================================================================
4. Invoice
========================================================================== */
.is-dark .invoice-wrapper .invoice-section.is-flex .meta h3, .is-dark .invoice-wrapper .invoice-section.is-flex .end h3 {
  color: black !important;
}

.invoice-wrapper .invoice-body .invoice-card .invoice-section.is-flex .end span {
  color: black !important;
}

.flex-table .flex-table-header span{
  color: black !important;
}

.is-dark .flex-table .flex-table-item {
  background: white !important;
  border-color: #404046;
}

.is-dark .flex-table .flex-table-item .flex-table-cell .dark-text {
  color: black !important;
}

.light-text {
  color: black !important;
}

.is-dark .title, .is-dark .dark-inverted {
  color: black !important;
}

.invoice-wrapper {
  max-width: 740px;
  margin: 0 auto;

  &.is-navbar {
    margin-top: 30px;
  }

  .invoice-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid darken($fade-grey, 4%);

    .left {
      h3 {
        font-family: $font-alt;
        font-size: 1.2rem;
        font-weight: 600;
        color: $dark-text;
      }
    }

    .right {
      .controls {
        display: flex;

        .action {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32px;
          width: 32px;
          min-width: 32px;
          border-radius: $radius-rounded;
          color: $light-text;
          margin: 0 4px;
          transition: all 0.3s;

          &:hover {
            color: $dark-text;
            background: darken($fade-grey, 4%);
          }

          svg {
            height: 16px;
            width: 16px;
            stroke-width: 1.6px;
          }
        }
      }
    }
  }

  .invoice-body {
    .invoice-card {
      @include vuero-s-card();

      padding: 0;

      .invoice-section {
        padding: 40px;

        &.is-flex {
          display: flex;
          align-items: center;

          .meta {
            margin-left: 16px;
            font-family: $font;

            h3 {
              font-family: $font-alt;
              font-size: 1.1rem;
              font-weight: 600;
              line-height: 1;
            }

            span {
              display: block;
              color: $light-text;
              font-weight: 400;
              font-size: 0.9rem;
            }
          }

          .end {
            margin-left: auto;
            text-align: right;

            &.is-left {
              text-align: left;
              max-width: 300px;

              p {
                padding-top: 4px;
                font-size: 0.95rem;
                line-height: 1.2;
              }
            }

            h3 {
              font-family: $font-alt;
              font-size: 1.1rem;
              font-weight: 600;
              line-height: 1;
            }

            span {
              display: block;
              color: $light-text;
              font-weight: 400;
              font-size: 0.9rem;
            }
          }
        }

        &.is-bordered {
          border-bottom: 1px solid darken($fade-grey, 3%);
        }

        .v-avatar {
          &.is-customer {
            border: 1.6px solid darken($fade-grey, 3%);
            border-radius: $radius-rounded;
            box-shadow: $light-box-shadow;
          }
        }

        .flex-table {
          &.sub-table {
            .flex-table-item {
              padding-top: 0;
              padding-bottom: 0;
              margin-bottom: 0;
              min-height: 40px;
              border: none;

              .table-label {
                font-family: $font;
                text-transform: uppercase;
                font-size: 0.8rem;
                color: $light-text;
              }

              .table-total {
                font-family: $font;
                color: $dark-text;
                font-weight: 500;

                &.is-bigger {
                  font-size: 1.2rem;
                  font-weight: 600;
                }
              }
            }
          }

          .flex-table-header {
            span {
              &:not(:first-child) {
                justify-content: flex-end;
              }
            }
          }

          .flex-table-item {
            .flex-table-cell {
              &:not(:first-child) {
                justify-content: flex-end;
              }
            }
          }
        }
      }
    }
  }
}

/* ==========================================================================
5. Invoice Dark mode
========================================================================== */

.is-dark {
  .invoice-wrapper {
    .invoice-header {
      border-color: lighten($dark-sidebar, 20%);

      .left {
        h3 {
          color: $dark-dark-text;
        }
      }

      .right {
        .controls {
          .action {
            border: 1px solid transparent;

            &:hover {
              background: lighten($dark-sidebar, 2%);
              border-color: $accent;
              color: $accent;
            }
          }
        }
      }
    }

    .invoice-body {
      .invoice-card {
        @include vuero-card--dark();
      }
    }

    .invoice-section {
      border-color: lighten($dark-sidebar, 12%) !important;

      &.is-flex {
        .v-avatar {
          border-color: lighten($dark-sidebar, 12%) !important;
        }

        .meta,
        .end {
          h3 {
            color: $dark-dark-text;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .invoice-wrapper {
    .invoice-section {
      &.is-flex {
        flex-direction: column;
        text-align: center;

        .v-avatar {
          margin-bottom: 16px;
        }

        .meta {
          margin-left: 0 !important;
        }

        .end {
          margin: 16px auto 0 auto;
          text-align: center !important;
        }
      }

      .flex-table {
        &.sub-table {
          padding-top: 16px;

          .is-vhidden {
            display: none !important;
          }

          .flex-table-item:not(.is-vhidden) {
            flex-direction: revert !important;
          }
        }

        .flex-table-item {
          .flex-table-cell {
            &.is-grow {
              > span {
                margin-left: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
