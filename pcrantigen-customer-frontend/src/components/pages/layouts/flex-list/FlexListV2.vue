<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, computed, ref } from 'vue'

import { projects } from '/@src/data/layouts/flex-list-v2'

const props = defineProps({
  activeTab: {
    type: String as PropType<'active' | 'active'>,
    default: 'active',
  },
})

const filters = ref('')

const filteredData = computed(() => {
  if (!filters.value) {
    return projects
  } else {
    return projects.filter((item) => {
      return (
        item.name.match(new RegExp(filters.value, 'i')) ||
        item.customer.match(new RegExp(filters.value, 'i')) ||
        item.industry.match(new RegExp(filters.value, 'i')) ||
        item.status.match(new RegExp(filters.value, 'i')) ||
        item.duration.match(new RegExp(filters.value, 'i'))
      )
    })
  }
})
</script>

<template>
  <div>
    <div class="list-flex-toolbar is-reversed">
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
            <li :class="[activeTab === 'active' && 'is-active']">
              <a @click="activeTab = 'active'"><span>Active</span></a>
            </li>
            <li :class="[activeTab === 'closed' && 'is-active']">
              <a @click="activeTab = 'closed'"><span>Closed</span></a>
            </li>
            <li class="tab-naver"></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex-list-wrapper flex-list-v2">
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
            src="/@src/assets/illustrations/placeholders/search-4.svg"
            alt=""
          />
          <img
            class="dark-image"
            src="/@src/assets/illustrations/placeholders/search-4-dark.svg"
            alt=""
          />
        </template>
      </V-PlaceholderPage>

      <!--Active Tab-->
      <div
        id="active-items-tab"
        class="tab-content"
        :class="[activeTab === 'active' && 'is-active']"
      >
        <div class="flex-table">
          <!--Table header-->
          <div
            class="flex-table-header"
            :class="[filteredData.length === 0 && 'is-hidden']"
          >
            <span class="is-grow">Project</span>
            <span>Customer</span>
            <span>Industry</span>
            <span>Status</span>
            <span class="h-hidden-tablet-p">Team</span>
            <span class="cell-end">Actions</span>
          </div>

          <div class="flex-list-inner">
            <transition-group name="list" tag="div">
              <!--Table item-->
              <div
                v-for="item in filteredData"
                :key="item.id"
                class="flex-table-item"
              >
                <div class="flex-table-cell is-media is-grow">
                  <V-Avatar :picture="item.picture" />
                  <div>
                    <span class="item-name dark-inverted">{{ item.name }}</span>
                    <span class="item-meta">
                      <span>
                        <i
                          aria-hidden="true"
                          class="iconify"
                          data-icon="feather:clock"
                        >
                        </i
                        >{{ item.duration }}</span
                      >
                    </span>
                  </div>
                </div>
                <div class="flex-table-cell" data-th="Customer">
                  <span class="light-text">{{ item.customer }}</span>
                </div>
                <div class="flex-table-cell" data-th="Industry">
                  <span class="light-text">{{ item.industry }}</span>
                </div>
                <div class="flex-table-cell" data-th="Status">
                  <span class="tag is-rounded">{{ item.status }}</span>
                </div>
                <div
                  class="flex-table-cell h-hidden-tablet-p"
                  data-th="Relations"
                >
                  <V-AvatarStack
                    :avatars="item.team"
                    size="small"
                    :limit="3"
                    class="is-pushed-mobile"
                  />
                </div>
                <div class="flex-table-cell cell-end" data-th="Actions">
                  <ProjectListDropdown />
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!--Table Pagination-->
        <V-FlexPagination
          v-if="filteredData.length > 5"
          :item-per-page="10"
          :total-items="873"
          :current-page="42"
          :max-links-displayed="7"
        />
      </div>

      <!--inactive Tab-->
      <div
        id="inactive-items-tab"
        class="tab-content"
        :class="[activeTab === 'closed' && 'is-active']"
      >
        <!--Empty placeholder-->
        <V-PlaceholderPage
          title="No closed projects."
          subtitle="Looks like you don't have any closed project yet. When you'll
              start closing off projects, they will be showing up in here."
        >
          <template #image>
            <img
              class="light-image is-larger"
              src="/@src/assets/illustrations/placeholders/projects.svg"
              alt=""
            />
            <img
              class="dark-image is-larger"
              src="/@src/assets/illustrations/placeholders/projects-dark.svg"
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

.has-top-nav {
  .flex-list-wrapper,
  .list-flex-toolbar {
    max-width: 880px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
