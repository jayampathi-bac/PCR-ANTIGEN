<script setup lang="ts">

import {ref, onMounted} from 'vue'
import {gaugeOptions} from '/@src/data/dashboards/analytics/goalChart'
import getDashboardData from '/@src/composable/dashboardData'
import {useStore} from "vuex";

const {
  searchDashboardData,
  dashboardData,
  topBranchThree,
  topBranchOne,
  topBranchTwo,
  chartSeries
} = getDashboardData();
const store = useStore()
const totalCustomers = ref()

onMounted(() => {
  searchDashboardData()
})

</script>

<template>
  <div class="banking-dashboard banking-dashboard-v2">
    <div class="dashboard-header">
      <V-Avatar picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" size="large"/>
      <div class="start">
        <h3>Welcome back, {{ store.state.auth.admintop.name }}</h3>
        <p>We're very happy to see you again on your admin dashboard.</p>
      </div>
      <!--      <div class="end">-->
      <!--        <V-Button dark="3">View Reports</V-Button>-->
      <!--        <V-Button color="primary" elevated>Manage Store</V-Button>-->
      <!--      </div>-->
    </div>
    <!--Panel-->
    <div class="dashboard-card is-card-panel">
      <div class="columns is-gapless">
        <div class="column is-8">
          <!--Box-->
          <div class="dashboard-body">
            <div class="dashboard-card">
              <h4 class="dark-inverted">Your Quick Stats</h4>

              <div class="quick-stats">
                <div class="quick-stats-inner">
                  <!--Stat-->
                  <div class="quick-stat">
                    <V-Block
                      :title="dashboardData.customer_count+''"
                      subtitle="Total Customers"
                      center
                      m-responsive
                      t-responsive
                    >
                      <template #icon>
                        <V-IconBox color="orange" rounded>
                          <i
                            aria-hidden="true"
                            class="iconify"
                            data-icon="feather:user-check"
                          ></i>
                        </V-IconBox>
                      </template>
                    </V-Block>
                  </div>

                  <!--Stat-->
                  <div class="quick-stat">
                    <V-Block
                      :title="dashboardData.branch_count+''"
                      subtitle="Total Merchants"
                      center
                      m-responsive
                      t-responsive
                    >
                      <template #icon>
                        <V-IconBox color="purple" rounded>
                          <i
                            aria-hidden="true"
                            class="iconify"
                            data-icon="feather:layers"
                          ></i>
                        </V-IconBox>
                      </template>
                    </V-Block>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <!--Box-->
          <div class="inner-box">
            <div class="box-title">
              <h3>Total Tests Done</h3>
              <!--              <V-Field class="is-minimal-select">-->
              <!--                <V-Control>-->
              <!--                  <Multiselect-->
              <!--                    v-model="valueSingle"-->
              <!--                    :options="optionsSingle"-->
              <!--                    placeholder="Select an option"-->
              <!--                    :max-height="145"-->
              <!--                  />-->
              <!--                </V-Control>-->
              <!--              </V-Field>-->
            </div>

            <!--Balance-->
            <div class="card-balance-wrap">
              <div class="card-balance">
                <span>{{ dashboardData.test_result_count }}</span>
                <!--                <span>**** **** **** 4986</span>-->
              </div>
              <div class="card-balance-stats">
                <div class="card-balance-stat">
                  <div class="stat-title">
                    <span>Completed</span>
                  </div>
                  <div class="stat-block">
                    <div class="stat-icon is-up">
                      <i
                        aria-hidden="true"
                        class="iconify"
                        data-icon="feather:arrow-right"
                      ></i>
                    </div>
                    <div class="stat-text">
                      <span>{{ dashboardData.completed_test_result_count }}</span>
                    </div>
                  </div>
                </div>
                <div class="card-balance-stat">
                  <div class="stat-title">
                    <span>Incomplete</span>
                  </div>
                  <div class="stat-block">
                    <div class="stat-icon is-down">
                      <i
                        aria-hidden="true"
                        class="iconify"
                        data-icon="feather:arrow-right"
                      ></i>
                    </div>
                    <div class="stat-text">
                      <span>{{ dashboardData.incompleted_test_result_count }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-card is-card-panel is-grey">
      <div class="columns is-gapless">
        <div class="column is-8">
          <!--Box-->
          <div class="inner-box">


            <div class="columns">
              <!--Monthly Summary-->
              <div class="column is-6">
                <div class="box-title">
                  <h3>Total Cases</h3>
                </div>
                <div class="monthly-summary-wrap">
                  <div class="monthly-summary">
                    <div class="monthly-summary-item">
                      <span>Positive</span>
                      <span class="is-income">{{ dashboardData.positive_test_result_count }}</span>
                    </div>
                    <div class="monthly-summary-item">
                      <span>Negative</span>
                      <span class="is-expense">{{ dashboardData.negative_test_result_count }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!--Chart-->
              <div class="column is-6">
                <div class="box-title">
                  <h3>Monthly Test Percentages</h3>
                </div>
                <div class="">
                  <div class="radial-wrap">
                    <apexchart
                      id="goal-gauge"
                      :height="gaugeOptions.chart.height"
                      :type="gaugeOptions.chart.type"
                      :series="chartSeries"
                      :options="gaugeOptions"
                    >
                    </apexchart>
                    <div class="radial-stats is-dark-bordered-12">
                      <div class="radial-stat is-dark-bordered-12">
                        <span>Completed</span>
                        <span class="dark-inverted">{{ dashboardData.monthly_completed_test_result_count }} %</span>
                      </div>
                      <div class="radial-stat">
                        <span>Inomplete</span>
                        <span class="dark-inverted">{{ dashboardData.monthly_incompleted_test_result_count }} %</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-4">
          <!--Box-->
          <div class="inner-box">
            <div class="box-title">
              <h3>Top 3 branches</h3>
              <!--              <a class="action-link">View All</a>-->
            </div>
            <!--Transactions-->
            <div class="transactions">
              <!--Transaction-->
              <V-Block
                :title="topBranchOne.company_name+''"
                :subtitle="topBranchOne.branch_contact+''"
                center
                lighter
              >
                <template #icon>
                  <V-IconBox color="green" rounded>
                    <i
                      aria-hidden="true"
                      class="iconify"
                      data-icon="feather:award"
                    ></i>
                  </V-IconBox>
                </template>
                <template #action>
                  <span class="dark-inverted">{{ topBranchOne.count }}</span>
                </template>
              </V-Block>
              <!--Transaction-->
              <V-Block
                :title="topBranchTwo.company_name+''"
                :subtitle="topBranchTwo.branch_contact+''"
                center
                lighter
              >
                <template #icon>
                  <!--                  <V-IconBox color="orange" rounded>-->
                  <!--                    <i aria-hidden="true" class="lnil lnil-analytics-alt-1"></i>-->
                  <!--                  </V-IconBox>-->
                  <V-IconBox color="orange" rounded>
                    <i
                      aria-hidden="true"
                      class="iconify"
                      data-icon="feather:award"
                    ></i>
                  </V-IconBox>
                </template>
                <template #action>
                  <span class="dark-inverted">{{ topBranchTwo.count }}</span>
                </template>
              </V-Block>
              <!--Transaction-->
              <V-Block
                :title="topBranchThree.company_name+''"
                :subtitle="topBranchThree.branch_contact+''"
                center
                lighter
              >
                <template #icon>
                  <!--                  <V-IconBox color="purple" rounded>-->
                  <!--                    <i aria-hidden="true" class="lnil lnil-cart-alt"></i>-->
                  <!--                  </V-IconBox>-->
                  <V-IconBox color="purple" rounded>
                    <i
                      aria-hidden="true"
                      class="iconify"
                      data-icon="feather:award"
                    ></i>
                  </V-IconBox>
                </template>
                <template #action>
                  <span class="dark-inverted">{{ topBranchThree.count }}</span>
                </template>
              </V-Block>
            </div>
            <!--            <div class="button-wrap">-->
            <!--              <V-Button color="primary" fullwidth elevated>New</V-Button>-->
            <!--              <V-Button fullwidth>Settings</V-Button>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/abstracts/_variables.scss';
@import '../scss/abstracts/_mixins.scss';

.apexcharts-datalabels-group {
  //display: none;
}
.banking-dashboard-v2 {
  .dashboard-header {
    display: flex;
    align-items: center;
    font-family: $font;
    margin-bottom: 30px;

    .start {
      margin-left: 12px;

      h3 {
        font-family: $font-alt;
        font-weight: 600;
        font-size: 1.4rem;
        //color: $dark-text;
      }
    }

    .end {
      margin-left: auto;
      display: flex;
      justify-content: flex-end;

      .button {
        margin-left: 10px;
      }
    }
  }

  .dashboard-body {
    .dashboard-card {
      @include vuero-s-card();

      font-family: $font;

      > h4,
      .apexcharts-title-text {
        font-family: $font-alt;
        font-size: 1rem;
        font-weight: 600;
        color: $dark-text;
        margin-bottom: 12px;
      }

      .quick-stats {
        .quick-stats-inner {
          display: flex;
          flex-wrap: wrap;
          margin-left: -8px;
          margin-right: -8px;

          .quick-stat {
            width: calc(50% - 16px);
            padding: 40px 20px;
            //background: $widget-grey;
            background: #e7f7ee;
            margin: 8px;
            border-radius: $radius-large;
            transition: all 0.3s;
            border: 1px solid #e0e0e2;

            ::v-deep(.media-flex-center) {
              .flex-meta {
                span {
                  &:first-child {
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: $dark-text;
                  }
                }
              }
            }
          }
        }
      }
    }

    .dashboard-card {
      &.is-upgrade {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: lighten($primary, 8%);
        border-color: lighten($primary, 8%);
        padding: 20px 40px;
        min-height: 320px;
        border-radius: $radius-large;
        box-shadow: $primary-box-shadow;

        .lnil,
        .lnir {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          font-size: 4rem;
          opacity: 0.3;
        }

        .cta-content {
          text-align: center;

          h4 {
            font-family: $font-alt;
            font-weight: 600;
            font-size: 1.2rem;
            color: $smoke-white;
            margin-bottom: 8px;
          }
        }

        .link {
          display: block;
          font-family: $font-alt;
          font-weight: 500;
          margin-top: 0.5rem;

          &:hover {
            color: $smoke-white;
            opacity: 0.6;
          }
        }
      }

      &.is-gauge {
        position: relative;

        .people {
          position: absolute;
          top: 80px;
          left: 0;
          right: 0;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          z-index: 5;

          .v-avatar {
            margin: 0 4px;
          }
        }
      }
    }
  }

  .dashboard-card {
    @include vuero-s-card();

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }

    &.is-card-panel {
      &.is-grey {
        background: $widget-grey;
        border: none;
      }

      .columns {
        .column {
          &:first-child {
            .inner-box {
              border-right: 1px solid darken($fade-grey, 3%);
            }
          }
        }
      }

      .inner-box {
        position: relative;
        margin: 20px;
        height: calc(100% - 40px);

        &.has-bounds {
          overflow: hidden;
        }

        .box-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;

          h3 {
            font-family: $font-alt;
            font-size: 1.1rem;
            font-weight: 600;
            color: $dark-text;
          }

          .field {
            position: absolute;
            top: -7px;
            right: 0;
            z-index: 5;
            min-width: 135px;

            .multiselect {
              .multiselect-input {
                .multiselect-single-label {
                  color: $light-text;
                }
              }

              .multiselect-options {
                left: unset !important;
                min-width: 180px;
              }
            }
          }
        }

        .cards-wrapper {
          display: flex;

          .controls {
            margin-right: 1.5rem;

            .button {
              .icon {
                svg {
                  height: 20px;
                  width: 20px;
                }
              }
            }
          }

          .cards-carousel {
            max-width: 520px;

            .tns-nav {
              text-align: right;
              position: absolute;
              top: 0;
              right: 15px;
              height: auto;
              max-height: 30px;
              width: auto;

              [aria-controls] {
                width: 9px;
                height: 9px;
                padding: 0;
                margin: 0 5px;
                border-radius: $radius-rounded;
                background: #ddd;
                border: 0;
                outline: none;

                &.tns-nav-active {
                  background: $primary;
                }
              }
            }

            .cards-carousel-inner {
              margin-bottom: 0;

              .cards-carousel-item {
                padding: 0 1.25rem 0.75rem 0;
                outline: none !important;
                user-select: none;

                &.tns-slide-active {
                  .ccard {
                    background-image: linear-gradient(
                        -225deg,
                        darken($primary, 8%) 0%,
                        darken($primary, 2%) 48%,
                        lighten($primary, 12%) 100%
                    );
                    box-shadow: $primary-box-shadow;

                    .shape {
                      opacity: 0.15;
                    }

                    .top {
                      img {
                        &.active {
                          display: block;
                        }

                        &.inactive,
                        &.inactive.light-image {
                          display: none !important;
                        }
                      }
                    }

                    .bottom {
                      span {
                        color: $smoke-white;
                      }
                    }
                  }
                }

                .ccard {
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  font-family: $font;
                  width: 240px;
                  height: 144px;
                  border-radius: 14px;
                  background: $fade-grey;
                  padding: 18px;
                  margin: 0 auto;
                  overflow: hidden;
                  transition: all 0.3s;

                  .shape {
                    position: absolute;
                    bottom: -10px;
                    right: -10px;
                    height: 70px;
                    width: 70px;
                    background: $white;
                    border-radius: $radius-rounded;
                    opacity: 0;
                    transition: opacity 0.3s;
                  }

                  .top {
                    img {
                      display: block;
                      max-width: 35px;

                      &.active {
                        display: none;
                      }

                      &.inactive {
                        display: block;
                      }
                    }
                  }

                  .bottom {
                    margin-top: auto;

                    span {
                      display: block;
                      color: $dark-text;

                      &:first-child {
                        font-weight: 600;
                        font-size: 1.3rem;
                      }

                      &:nth-child(2) {
                        font-size: 0.9rem;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        .quick-stats {
          .quick-stats-inner {
            display: flex;
            flex-wrap: wrap;
            margin-left: -8px;
            margin-right: -8px;

            .quick-stat {
              width: calc(50% - 16px);
              padding: 40px 20px;
              background: $widget-grey;
              margin: 8px;
              border-radius: $radius-large;
              transition: all 0.3s;

              ::v-deep(.media-flex-center) {
                .flex-meta {
                  span {
                    &:first-child {
                      font-size: 1.4rem;
                      font-weight: 600;
                      color: $dark-text;
                    }
                  }
                }
              }
            }
          }
        }

        .card-balance-wrap {
          display: flex;
          flex-direction: column;
          height: calc(100% - 60px);

          .card-balance {
            span {
              display: block;
              color: $primary;

              &:first-child {
                font-weight: 700;
                font-size: 2.4rem;
              }

              &:nth-child(2) {
                font-size: 1rem;
                font-weight: 500;
              }
            }
          }

          .card-balance-stats {
            margin-top: auto;
            display: flex;

            .card-balance-stat {
              width: 50%;
              font-family: $font;

              .stat-title {
                color: $light-text;
                margin-bottom: 6px;
              }

              .stat-block {
                display: flex;
                align-items: center;

                .stat-icon {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 30px;
                  width: 30px;
                  border-radius: $radius-rounded;
                  background: lighten($fade-grey, 2%);

                  &.is-up {
                    transform: rotate(-45deg);

                    svg {
                      color: $h-green;
                    }
                  }

                  &.is-down {
                    transform: rotate(45deg);

                    svg {
                      color: $h-red;
                    }
                  }

                  svg {
                    height: 16px;
                    width: 16px;
                    stroke-width: 3px;
                  }
                }

                .stat-text {
                  margin-left: 12px;
                  font-family: $font;
                  font-weight: 600;
                  font-size: 1.1rem;
                  color: $dark-text;
                }
              }
            }
          }
        }

        .monthly-summary-wrap {
          .monthly-summary {
            padding: 0 20px;
            border: 1px solid darken($fade-grey, 5%);
            border-radius: $radius-large;

            .monthly-summary-item {
              padding: 20px 0;
              font-family: $font;

              &:first-child {
                border-bottom: 1px solid darken($fade-grey, 5%);
              }

              span {
                display: block;

                &:first-child {
                  font-size: 0.85rem;
                  font-weight: 500;
                  color: $light-text;
                }

                &:nth-child(2) {
                  font-weight: 500;

                  &.is-income {
                    color: $h-green;
                  }

                  &.is-expense {
                    color: $h-red;
                  }
                }
              }
            }
          }
        }

        .radial-wrap {
          display: flex;
          flex-direction: column;
          height: calc(100% - 44px);

          .radial-stats {
            margin-top: auto;
            display: flex;
            padding-top: 20px;
            border-top: 1px solid darken($fade-grey, 3%);

            .radial-stat {
              width: 50%;
              text-align: center;

              &:first-child {
                border-right: 1px solid darken($fade-grey, 3%);
              }

              span {
                display: block;

                &:first-child {
                  color: $light-text;
                  font-size: 0.9rem;
                }

                &:nth-child(2) {
                  color: $dark-text;
                  font-size: 1.3rem;
                  font-weight: 600;
                }
              }
            }
          }
        }

        .chart-wrapper {
          position: relative;
          padding-right: 30px;

          .action-link {
            position: absolute;
            top: -42px;
            right: 45px;
          }
        }

        .transactions {
          padding: 10px 0;

          .media-flex-center {
            .flex-meta {
              span {
                &:nth-child(2) {
                  font-size: 0.85rem;
                }
              }
            }

            .flex-end {
              font-family: $font;
              font-size: 1rem;
              font-weight: 500;
              color: $dark-text;
            }
          }
        }

        .button-wrap {
          display: flex;
          justify-content: space-between;
          padding: 20px 0 0 0;

          .button {
            max-width: 49%;
          }
        }
      }
    }
  }
}

.is-dark {
  .banking-dashboard-v2 {
    .dashboard-body {
      .dashboard-card {
        @include vuero-card--dark();

        &.is-upgrade {
          background: $accent;
          border-color: $accent;
          box-shadow: $accent-box-shadow;
        }

        .quick-stats {
          .quick-stats-inner {
            .quick-stat {
              background: lighten($dark-sidebar, 2%);
              border: 1px solid lighten($dark-sidebar, 12%);

              .media-flex-center {
                .flex-meta {
                  span {
                    &:first-child {
                      color: $dark-dark-text;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .dashboard-card {
      @include vuero-card--dark();

      &.is-card-panel {
        background: lighten($dark-sidebar, 6%);

        .inner-box {
          border-color: lighten($dark-sidebar, 12%) !important;

          .box-title {
            h3 {
              color: $dark-dark-text;
            }
          }

          .cards-carousel {
            .tns-nav {
              [aria-controls] {
                background: lighten($dark-sidebar, 12%);
              }
            }

            .cards-carousel-inner {
              .cards-carousel-item {
                &.tns-slide-active {
                  .ccard {
                    background-image: linear-gradient(
                        -225deg,
                        darken($accent, 8%) 0%,
                        darken($accent, 2%) 48%,
                        lighten($accent, 12%) 100%
                    );
                    box-shadow: $accent-box-shadow;

                    .top {
                      .inactive.dark-image {
                        display: none !important;
                      }
                    }
                  }
                }

                .ccard {
                  background: lighten($dark-sidebar, 2%);

                  .top {
                    .inactive.dark-image {
                      display: block !important;
                    }
                  }

                  .bottom {
                    span {
                      color: $dark-dark-text;
                    }
                  }
                }
              }
            }
          }

          .card-balance-wrap {
            .card-balance {
              span {
                color: $accent;
              }
            }

            .card-balance-stats {
              .card-balance-stat {
                .stat-block {
                  .stat-icon {
                    background: lighten($dark-sidebar, 2%);
                  }

                  .stat-text {
                    color: $dark-dark-text;
                  }
                }
              }
            }
          }

          .monthly-summary-wrap {
            .monthly-summary {
              border-color: lighten($dark-sidebar, 12%);
              background: lighten($dark-sidebar, 4%);

              .monthly-summary-item {
                border-color: lighten($dark-sidebar, 12%);
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .banking-dashboard-v2 {
    .dashboard-card {
      &.is-card-panel {
        overflow: hidden;
        padding: 10px;

        .inner-box {
          border-right: none !important;

          .cards-wrapper {
            position: relative;
            margin-top: 30px;

            .controls {
              position: absolute;
              top: -68px;
              right: -8px;
              margin-right: 0;
            }
          }

          .card-balance-wrap {
            .card-balance {
              margin-bottom: 30px;
            }
          }

          .monthly-summary-wrap {
            margin-bottom: 60px;
          }

          .chart-wrapper {
            padding-right: 0;

            .action-link {
              top: -45px;
              right: 0;
            }
          }
        }
      }
    }

    .cards-carousel {
      .tns-nav {
        display: none !important;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .banking-dashboard-v2 {
    .dashboard-card {
      &.is-card-panel {
        .inner-box {
          border-right: none !important;

          .card-balance-wrap {
            .card-balance {
              margin-bottom: 30px;
            }
          }

          .monthly-summary-wrap {
            margin-bottom: 60px;
          }

          .chart-wrapper {
            padding-right: 0;

            .action-link {
              top: -45px;
              right: 0;
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .banking-dashboard-v2 {
    .dashboard-card {
      &.is-card-panel {
        .inner-box {
          .cards-carousel {
            margin-left: 30px;
            max-width: 400px !important;

            .cards-carousel-inner {
              .cards-carousel-item {
                .ccard {
                  width: 180px !important;
                  height: 108px !important;
                }
              }
            }
          }

          .card-balance-wrap {
            .card-balance {
              margin-bottom: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
