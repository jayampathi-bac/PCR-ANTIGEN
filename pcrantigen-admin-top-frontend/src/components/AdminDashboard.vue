<script setup lang="ts">
import {resultOptions} from '/@src/data/charts/resultsChart'
import {testCompletedChartOptions} from '/@src/data/charts/testCompletedChart'
import {customerChartOptions} from '/@src/data/charts/customersChart'
import {useCookies} from "vue3-cookies";
import {onMounted, ref} from "vue";
const {cookies} = useCookies();

import getDashboardData from '/@src/composable/dashboardData'

const {searchDashboardData, dashboardData, series, customerSeries,testCompletedProportion, dashboardQuickStats} = getDashboardData();

const name = ref(cookies.get('admintop') ? cookies.get('admintop').name : 'John Doe')
const profile_url = ref(cookies.get('admintop') ? cookies.get('admintop').profile_url : 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png')
onMounted(() => {
  // searchDashboardData();
})

</script>

<template>
  <div class="personal-dashboard personal-dashboard-v1">
    <!--Personal Dashboard V1-->
    <!--Header-->
    <div class="dashboard-header">
      <V-Avatar :picture="profile_url" size="large"/>
      <div class="start">
        <h3>ようこそ, {{name}}</h3>
        <p>We're very happy to see you again on your sales admin dashboard.</p>
      </div>
<!--      <div class="end">-->
<!--        <V-Button dark="3">View Reports</V-Button>-->
<!--        <V-Button color="primary" elevated>Manage Store</V-Button>-->
<!--      </div>-->
    </div>

    <!--Body-->
    <div class="dashboard-body">
      <div class="columns is-multiline">
        <!--Card-->
        <div class="column is-6">
          <div class="dashboard-card">
            <h4 class="dark-inverted">Your Quick Stats</h4>

            <div class="quick-stats">
              <div class="quick-stats-inner">
                <!--Stat-->
                <div class="quick-stat">
                  <V-Block
                    :title=dashboardQuickStats.new_customer
                    subtitle="Customers in this "
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
                    :title=dashboardQuickStats.test_done_by_month
                    subtitle="Test kits issued"
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


                <!--Stat-->
                <div class="quick-stat">
                  <V-Block
                    :title=dashboardQuickStats.total_testkit_brand
                    subtitle="Total testkit brands"
                    center
                    m-responsive
                    t-responsive
                  >
                    <template #icon>
                      <V-IconBox color="green" rounded>
                        <i
                          aria-hidden="true"
                          class="iconify"
                          data-icon="feather:pocket"
                        ></i>
                      </V-IconBox>
                    </template>
                  </V-Block>
                </div>

                <!--Stat-->
                <div class="quick-stat">
                  <V-Block
                    :title=dashboardQuickStats.all_customers
                    subtitle="All Customers"
                    center
                    m-responsive
                    t-responsive
                  >
                    <template #icon>
                      <V-IconBox color="info" rounded>
                        <i
                          aria-hidden="true"
                          class="iconify"
                          data-icon="feather:users"
                        ></i>
                      </V-IconBox>
                    </template>
                  </V-Block>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--Card-->
        <div class="column is-6">
          <div class="dashboard-card">
             <apexchart
              :height="resultOptions.chart.height"
              :type="resultOptions.chart.type"
              :series="series"
              :options="resultOptions"
            >
            </apexchart>
          </div>
        </div>



        <!--Card-->
        <div class="column is-6 pb-2">
          <div class="dashboard-card is-gauge">
            <div class="people">
              <V-Avatar picture="https://icon-library.com/images/completed-icon/completed-icon-6.jpg"/>
<!--              <V-Avatar initials="SC" color="h-purple" />-->
              <div class="m-1">
                <VIconWrap icon="feather:x" color="danger" />
              </div>
              <V-Avatar picture="https://icon-library.com/images/145e4ee39c.svg.svg"/>
            </div>
            <apexchart
              :height="testCompletedChartOptions.chart.height"
              :type="testCompletedChartOptions.chart.type"
              :series="testCompletedProportion"
              :options="testCompletedChartOptions"
            >
            </apexchart>
          </div>
        </div>

        <!--Card-->
        <div class="column is-6">
          <div class="dashboard-card">
            <apexchart
              :height="customerChartOptions.chart.height"
              :type="customerChartOptions.chart.type"
              :series="customerSeries"
              :options="customerChartOptions"
            >
            </apexchart>
          </div>
        </div>

        <!--Card-->
<!--        <div class="column is-4">-->
<!--          <div class="dashboard-card is-gauge">-->
<!--            <div class="people">-->
<!--              <V-Avatar picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"/>-->
<!--              <V-Avatar initials="SC" color="h-purple"/>-->
<!--              <V-Avatar picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"/>-->
<!--            </div>-->
<!--            <apexchart-->
<!--              :height="teamGaugeOptions.chart.height"-->
<!--              :type="teamGaugeOptions.chart.type"-->
<!--              :series="teamGaugeOptions.series"-->
<!--              :options="teamGaugeOptions"-->
<!--            >-->
<!--            </apexchart>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/abstracts/_variables.scss';
@import '../scss/abstracts/_mixins.scss';

.is-navbar {
  .personal-dashboard {
    margin-top: 30px;
  }
}

.personal-dashboard-v1 {
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
        font-size: 1.3rem;
        color: $dark-text;
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
}

.is-dark {
  .personal-dashboard-v1 {
    .dashboard-header {
      .start {
        h3 {
          color: $dark-dark-text;
        }
      }
    }

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
  }
}

@media only screen and (max-width: 767px) {
  .personal-dashboard-v1 {
    .dashboard-header {
      text-align: center;
      flex-direction: column;

      .start {
        margin: 10px auto;
      }

      .end {
        margin: 0;
        justify-content: space-between;
      }
    }

    .dashboard-body {
      .dashboard-card {
        .quick-stats {
          .quick-stats-inner {
            .quick-stat {
              padding: 20px;

              .media-flex-center {
                flex-direction: column;

                .flex-meta {
                  margin: 10px 0;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .personal-dashboard-v1 {
    .dashboard-body {
      .dashboard-card {
        .quick-stats {
          .quick-stats-inner {
            .quick-stat {
              padding: 20px 20px;

              .media-flex-center {
                flex-direction: column;

                .flex-meta {
                  margin: 2px 0 0 0;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
