<script setup lang="ts">
import type {PropType} from 'vue'
import {defineProps, ref, watchEffect, watch} from 'vue'
import {useRoute} from 'vue-router'

import {activePanel} from '/@src/state/activePanelState'
import {pageTitle} from '/@src/state/sidebarLayoutState'

type SidebarTheme =
  | 'default'
  | 'color'
  | 'color-curved'
  | 'curved'
  | 'float'
  | 'labels'
  | 'labels-hover'

const props = defineProps({
  theme: {
    type: String as PropType<SidebarTheme>,
    default: 'default',
  },
  defaultSidebar: {
    type: String,
    default: 'dashboard',
  },
  closeOnChange: {
    type: Boolean,
    default: false,
  },
  openOnMounted: {
    type: Boolean,
    default: false,
  },
  nowrap: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
console.log('route.path',route.path);
if (route.path == ''){

}


const isMobileSidebarOpen = ref(false)
const isDesktopSidebarOpen = ref(props.openOnMounted)
const activeMobileSubsidebar = ref(props.defaultSidebar)

const isReportTabActive = ref('is-active')

function switchSidebar(id: string) {

  console.log('switchSidebar',id)
  if (id === activeMobileSubsidebar.value) {
    isDesktopSidebarOpen.value = !isDesktopSidebarOpen.value
  } else {
    isDesktopSidebarOpen.value = true
    activeMobileSubsidebar.value = id
  }
  id === 'reports-list' ? (isReportTabActive.value = 'is-active') : (isReportTabActive.value = 'is-not-active')

}

/**
 * watchEffect callback will be executed each time dependent reactive values has changed
 */
watchEffect(
  () => {
    const isOpen = isDesktopSidebarOpen.value
    const wrappers = document.querySelectorAll('.view-wrapper')

    wrappers.forEach((wrapper) => {
      if (isOpen === false) {
        wrapper.classList.remove('is-pushed-full')
      } else if (!wrapper.classList.contains('is-pushed-full')) {
        wrapper.classList.add('is-pushed-full')
      }
    })
  },
  {flush: 'post'}
)
watch(
  () => route.fullPath,
  () => {
    isMobileSidebarOpen.value = false

    if (props.closeOnChange && isDesktopSidebarOpen.value) {
      isDesktopSidebarOpen.value = false
    }
  }
)

// watch(
//   () => isReportTabActive.value,
//   (count, prevCount) => {
//     console.log("isReportTabActive",count,prevCount)
//   }
// )

</script>

<template>
  <div class="sidebar-layout">
    <div class="app-overlay"></div>

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #brand>
        <RouterLink :to="{ name: 'sidebar-layouts-admindashboard' }" class="navbar-item is-brand">
          <img src="../../src/assets/jvpd.png" alt=""/>
        </RouterLink>

        <div class="brand-end">
<!--          <NotificationsMobileDropdown/>-->
          <UserProfileDropdown/>
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #links>
        <li @click="isReportTabActive = 'is-not-active'">
          <RouterLink :to="{ name: 'sidebar-layouts-branches' }">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:home"
            ></i>
          </RouterLink>
        </li>
        <li @click="isReportTabActive = 'is-not-active'">
          <RouterLink :to="{ name: 'sidebar-layouts-groups' }">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:key"
            ></i>
          </RouterLink>
        </li >
<!--        <li>-->
<!--          <RouterLink :to="{ name: 'sidebar-layouts-results' }">-->
<!--            <i-->
<!--              aria-hidden="true"-->
<!--              class="iconify"-->
<!--              data-icon="feather:activity"-->
<!--            ></i>-->
<!--          </RouterLink>-->
<!--        </li>-->
        <li @click="isReportTabActive = 'is-not-active'">
          <RouterLink :to="{ name: 'sidebar-layouts-customers' }">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:users"
            ></i>
          </RouterLink>
        </li>
        <li @click="isReportTabActive = 'is-not-active'">
          <RouterLink :to="{ name: 'sidebar-layouts-tests' }">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:grid"
            ></i>
          </RouterLink>
        </li>
<!--        <li>-->
<!--          <RouterLink :to="{ name: 'sidebar-layouts-reports-customer' }">-->
<!--            <i-->
<!--              aria-hidden="true"-->
<!--              class="iconify"-->
<!--              data-icon="feather:pocket"-->
<!--            ></i>-->
<!--          </RouterLink>-->
<!--        </li>-->
        <li
          :class="[activeMobileSubsidebar === 'reports-list' && isReportTabActive]"
          @click="activeMobileSubsidebar = 'reports-list'"
        >
          <a>
            <i aria-hidden="true" class="iconify" data-icon="feather:pocket"></i>
          </a>
        </li>
      </template>

<!--      <template #bottom-links>-->
<!--        <li>-->
<!--          <a href="#">-->
<!--            <i-->
<!--              aria-hidden="true"-->
<!--              class="iconify"-->
<!--              data-icon="feather:settings"-->
<!--            ></i>-->
<!--          </a>-->
<!--        </li>-->
<!--      </template>-->
    </MobileSidebar>


    <!-- Mobile subsidebar links -->
    <transition name="slide-x">
<!--      <LayoutsMobileSubsidebar-->
<!--        v-if="isMobileSidebarOpen && activeMobileSubsidebar === 'layout'"-->
<!--      />-->
<!--      <DashboardsMobileSubsidebar-->
<!--        v-else-if="-->
<!--          isMobileSidebarOpen && activeMobileSubsidebar === 'dashboard'-->
<!--        "-->
<!--      />-->
<!--      <ComponentsMobileSubsidebar-->
<!--        v-else-if="-->
<!--          isMobileSidebarOpen && activeMobileSubsidebar === 'components'-->
<!--        "-->
<!--      />-->
<!--      <ElementsMobileSubsidebar-->
<!--        v-else-if="isMobileSidebarOpen && activeMobileSubsidebar === 'elements'"-->
<!--      />-->
      <ReportsMobileSubsidebar
        v-if="isMobileSidebarOpen && activeMobileSubsidebar === 'reports-list'"
      />
    </transition>

    <!-- Desktop navigation -->
<!--    <CircularMenu/>-->

    <Sidebar :theme="props.theme" :is-open="isDesktopSidebarOpen">
      <template #links>
        <!-- Branches -->
        <li @click="isReportTabActive = 'is-not-active'">
          <RouterLink
            id="open-settings"
            :to="{ name: 'sidebar-layouts-branches' }"
            data-content="elements"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:home"
            ></i>
          </RouterLink>
        </li>
        <!-- groups -->
        <li @click="isReportTabActive = 'is-not-active'">
          <RouterLink
            id="open-settings"
            :to="{ name: 'sidebar-layouts-groups' }"
            data-content="elements"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:key"
            ></i>
          </RouterLink>
        </li>
        <!-- Tests -->
        <li @click="isReportTabActive = 'is-not-active'">
          <RouterLink
            id="open-settings"
            :to="{ name: 'sidebar-layouts-tests' }"
            data-content="elements"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:grid"
            ></i>
          </RouterLink>
        </li>
        <!-- Customers -->
        <li @click="isReportTabActive = 'is-not-active'">
          <RouterLink
            id="open-settings"
            :to="{ name: 'sidebar-layouts-customers' }"
            data-content="elements"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:users"
            ></i>
          </RouterLink>
        </li>
        <!-- Reports -->
<!--        <li>-->
<!--          <RouterLink-->
<!--            id="open-settings"-->
<!--            :to="{ name: 'sidebar-layouts-reports-customer' }"-->
<!--            data-content="elements"-->
<!--          >-->
<!--            <i-->
<!--              aria-hidden="true"-->
<!--              class="iconify sidebar-svg"-->
<!--              data-icon="feather:pocket"-->
<!--            ></i>-->
<!--          </RouterLink>-->
<!--        </li>-->
        <!-- reports-list -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'reports-list' && isReportTabActive]"
            @click="switchSidebar('reports-list')"
            data-content="Reports"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:pocket"
            ></i>
          </a>
        </li>



      </template>

      <template #bottom-links>
        <!-- Switch Sidebar  Layouts -->
        <li>
<!--          <LayoutSwitcher/>-->
        </li>


        <!-- Settings -->
<!--        <li>-->
<!--          <RouterLink-->
<!--            id="open-settings"-->
<!--            :to="{ name: 'sidebar-layouts-profile-settings' }"-->
<!--            data-content="Settings"-->
<!--          >-->
<!--            <i-->
<!--              aria-hidden="true"-->
<!--              class="iconify sidebar-svg"-->
<!--              data-icon="feather:settings"-->
<!--            ></i>-->
<!--          </RouterLink>-->
<!--        </li>-->

        <!-- Profile Dropdown -->
        <li>
          <UserProfileDropdown up/>
        </li>
      </template>
    </Sidebar>

    <transition name="slide-x">
      <ReportsSubSideBar
        v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'reports-list'"
        @close="isDesktopSidebarOpen = false"
      />
      <ElementsSubsidebar
        v-else-if="
          isDesktopSidebarOpen && activeMobileSubsidebar === 'elements'
        "
        @close="isDesktopSidebarOpen = false"
      />
      <DashboardsSubsidebar
        v-else-if="
          isDesktopSidebarOpen && activeMobileSubsidebar === 'dashboard'
        "
        @close="isDesktopSidebarOpen = false"
      />
      <LayoutsSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'layout'"
        @close="isDesktopSidebarOpen = false"
      />
    </transition>



    <div class="view-wrapper">
      <div class="page-content-wrapper">
        <template v-if="props.nowrap">
          <slot></slot>
        </template>
        <div v-else class="page-content is-relative">
          <div class="page-title has-text-centered">
            <!-- Sidebar Trigger -->
            <div
              class="vuero-hamburger nav-trigger push-resize"
              @click="isDesktopSidebarOpen = false"
            >
              <span class="menu-toggle has-chevron">
                <span
                  :class="[isDesktopSidebarOpen && 'active']"
                  class="icon-box-toggle"
                >
                  <span class="rotate">
                    <i aria-hidden="true" class="icon-line-top"></i>
                    <i aria-hidden="true" class="icon-line-center"></i>
                    <i aria-hidden="true" class="icon-line-bottom"></i>
                  </span>
                </span>
              </span>
            </div>

            <div class="title-wrap">
              <h1 class="title is-4">{{ pageTitle }}</h1>
            </div>

            <Toolbar class="desktop-toolbar"/>
          </div>

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">

.mobile-navbar .navbar-brand .is-brand img {
  position: relative;
  height: 75px !important;
  max-height: 64px !important;
}
</style>
