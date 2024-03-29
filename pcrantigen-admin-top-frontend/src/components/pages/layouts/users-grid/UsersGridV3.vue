<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, computed, ref } from 'vue'

const props = defineProps({
  activeTab: {
    type: String as PropType<'all' | 'team'>,
    default: 'all',
  },
})

import { users } from '/@src/data/layouts/user-grid-v3'

const filters = ref('')

const filteredData = computed(() => {
  if (!filters.value) {
    return users
  } else {
    return users.filter((item) => {
      return (
        item.username.match(new RegExp(filters.value, 'i')) ||
        item.location.match(new RegExp(filters.value, 'i')) ||
        item.position.match(new RegExp(filters.value, 'i')) ||
        item.badge.match(new RegExp(filters.value, 'i'))
      )
    })
  }
})
</script>

<template>
  <div>
    <div class="user-grid-toolbar is-reversed">
      <V-Control icon="feather:search">
        <input
          v-model="filters"
          class="input custom-text-filter"
          placeholder="Search..."
        />
      </V-Control>

      <div class="tabs-inner">
        <div class="tabs">
          <ul>
            <li :class="[activeTab === 'all' && 'is-active']">
              <a @click="activeTab = 'all'"><span>All</span></a>
            </li>
            <li :class="[activeTab === 'team' && 'is-active']">
              <a @click="activeTab = 'team'"><span>Team</span></a>
            </li>
            <li class="tab-naver"></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="user-grid user-grid-v3">
      <!--List Empty Search Placeholder -->
      <V-PlaceholderPage
        :class="[filteredData.length !== 0 && 'is-hidden']"
        title="We couldn't find any matching results."
        subtitle="Too bad. Looks like we couldn't find any matching results for the
          search terms you've entered. Please try different search terms or
          criteria."
        larger
      >
        <template #image>
          <img
            class="light-image"
            src="/@src/assets/illustrations/placeholders/search-5.svg"
            alt=""
          />
          <img
            class="dark-image"
            src="/@src/assets/illustrations/placeholders/search-5-dark.svg"
            alt=""
          />
        </template>
      </V-PlaceholderPage>

      <!--Active Tab-->
      <div
        id="active-items-tab"
        class="tab-content"
        :class="[activeTab === 'all' && 'is-active']"
      >
        <transition-group
          name="list"
          tag="div"
          class="columns is-multiline is-flex-tablet-p is-half-tablet-p"
        >
          <!--Grid item-->
          <div v-for="item in filteredData" :key="item.id" class="column is-3">
            <TabbedGridItem :user="item" />
          </div>
        </transition-group>
      </div>

      <!--inactive Tab-->
      <div
        id="inactive-items-tab"
        class="tab-content"
        :class="[activeTab === 'team' && 'is-active']"
      >
        <!--Empty placeholder-->
        <V-PlaceholderPage
          title="No team members."
          subtitle="Looks like you don't have any team members yet. When you'll start
              adding some to your team, they will be showing up in here."
        >
          <template #image>
            <img
              class="light-image is-larger"
              src="/@src/assets/illustrations/placeholders/team.svg"
              alt=""
            />
            <img
              class="dark-image is-larger"
              src="/@src/assets/illustrations/placeholders/team-dark.svg"
              alt=""
            />
          </template>
        </V-PlaceholderPage>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';

.user-grid-v3 {
  .columns {
    margin-left: -0.5rem !important;
    margin-right: -0.5rem !important;
    margin-top: -0.5rem !important;
  }

  .column {
    padding: 0.5rem !important;
  }

  .grid-item {
    @include vuero-s-card();

    text-align: center;

    > .v-avatar {
      display: block;
      margin: 0 auto 4px auto;
    }

    h3 {
      font-family: $font-alt;
      font-size: 1.1rem;
      font-weight: 600;
      color: $dark-text;
    }

    p {
      font-size: 0.85rem;
      margin-bottom: 16px;
    }

    .icon-tabs-wrapper {
      padding-bottom: 20px;

      .icon-tabs {
        width: 100%;
        max-width: 180px;
        margin: 0 auto;
        border: 1px solid darken($fade-grey, 4%);
        border-radius: 8px;
        background: $white;
        box-shadow: $light-box-shadow;
        margin-bottom: 16px;

        .icon-tabs-inner {
          position: relative;
          display: flex;
          width: 100%;

          .tab-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 33.3%;
            color: $light-text;
            padding: 4px 8px;
            margin: 8px 0;

            &.is-active {
              color: $primary;
            }

            &:first-child {
              &.is-active ~ .icon-tabs-naver {
                margin-left: 0;
              }
            }

            &:nth-child(2) {
              border-left: 1px solid darken($fade-grey, 4%);
              border-right: 1px solid darken($fade-grey, 4%);

              &.is-active ~ .icon-tabs-naver {
                margin-left: 33% !important;
              }
            }

            &:nth-child(3) {
              &.is-active ~ .icon-tabs-naver {
                margin-left: 66.6%;
              }
            }

            svg {
              pointer-events: none;
              height: 16px;
              width: 16px;
              stroke-width: 1.6px;
            }
          }

          .icon-tabs-naver {
            position: absolute;
            bottom: -1px;
            left: 0;
            display: block;
            width: 33.3% !important;
            height: 2px;
            background: $primary;
            z-index: 1;
            transition: all 0.3s;
            border-radius: 12px;
          }
        }
      }

      .icon-tabs-content {
        display: none;
        animation: fadeInLeft 0.5s;
        padding-top: 16px;

        &.is-active {
          display: block;
        }
      }

      .chart-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 165px;
        margin: 0 auto;

        .stats {
          span {
            display: block;

            &:first-child {
              font-family: $font;
              font-size: 1.8rem;
              color: $dark-text;
              font-weight: 700;
              line-height: 1;
            }

            &:nth-child(2) {
              font-family: $font-alt;
              color: $light-text;
            }
          }
        }
      }
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;

      .button,
      .v-button {
        width: calc(50% - 4px);
        color: $light-text;
        margin-bottom: 0;

        &:hover {
          border-color: darken($fade-grey, 4%);
          color: $primary;
          box-shadow: $light-box-shadow;
        }
      }
    }
  }
}

.is-dark {
  .user-grid-v3 {
    .grid-item {
      @include vuero-card--dark();

      .icon-tabs-wrapper {
        .icon-tabs {
          background: lighten($dark-sidebar, 2%);
          border-color: lighten($dark-sidebar, 10%);

          .icon-tabs-inner {
            .tab-item {
              border-color: lighten($dark-sidebar, 10%);

              &.is-active {
                color: $accent;
              }
            }

            .icon-tabs-naver {
              background: $accent;
            }
          }
        }
      }
    }
  }
}
</style>
