<script setup lang="ts">
import type { PropType } from 'vue'
import {computed, defineProps, ref, toRefs, watch} from 'vue'
import { useRoute } from 'vue-router'

import { popovers } from '/@src/data/users/userPopovers'
import { pageTitle } from '/@src/state/navbarLayoutState'



type NavbarTheme = 'default' | 'colored' | 'fade'
type SubnavId =
  | 'closed'
  | 'home'
  | 'layout'
  | 'elements'
  | 'components'
  | 'search'

const props = defineProps({
  theme: {
    type: String as PropType<NavbarTheme>,
    default: 'default',
  },
  nowrap: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const filter = ref('')
const isMobileSidebarOpen = ref(false)
const activeMobileSubsidebar = ref('dashboard')
const activeSubnav = ref<SubnavId>('closed')

function toggleSubnav(subnav: SubnavId) {
  if (activeSubnav.value === subnav) {
    activeSubnav.value = 'closed'
  } else {
    activeSubnav.value = subnav
  }
}

const filteredUsers = computed(() => {
  if (!filter.value) {
    return []
  }

  return Object.values(popovers).filter((user) => {
    return (
      user.fullName.match(new RegExp(filter.value, 'i')) ||
      user.position.match(new RegExp(filter.value, 'i'))
    )
  })
})

watch(
  () => route.fullPath,
  () => {
    activeSubnav.value = 'closed'
    isMobileSidebarOpen.value = false
  }
)
</script>

<template>
  <div class="navbar-layout">
    <div class="app-overlay"></div>

    <!-- Mobile navigation -->
    <MobileNavbar>
      <template #brand>
        <RouterLink :to="{ name: 'index' }" class="navbar-item is-brand">
<!--          <AnimatedLogo width="38px" height="38px" />-->
          <img src="../pages/assets/jvpd.png"   alt=""/>
        </RouterLink>

        <div class="brand-end">
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>






    <!-- Desktop navigation -->
    <Navbar :theme="props.theme">
      <!-- Custom navbar title -->
      <template #title>
        <RouterLink :to="{ name: 'index' }" class="brand">
<!--          <AnimatedLogo width="38px" height="38px" />-->
          <img src="../pages/assets/jvpd.png"  alt=""/>
        </RouterLink>

        <div class="separator"></div>
        <h1 class="title is-5">{{ pageTitle }}</h1>
      </template>

      <!-- Custom navbar toolbar -->
      <template #toolbar>
        <Toolbar class="desktop-toolbar" />
<!--        <LayoutSwitcher />-->
        <UserProfileDropdown right />
      </template>

      <!-- Custom navbar links -->
      <template #links>
        <div/>
      </template>

      <!-- Custom navbar sub navigation -->
<!--      <template #subnav>-->
<!--        <div-->
<!--          :class="[-->
<!--            !(activeSubnav === 'closed' || activeSubnav === 'search') &&-->
<!--              'is-active',-->
<!--          ]"-->
<!--          class="navbar-subnavbar"-->
<!--        >-->
<!--          <DashboardsSubnav :class="[activeSubnav === 'home' && 'is-active']" />-->

<!--          <LayoutsSubnav :class="[activeSubnav === 'layouts' && 'is-active']" />-->

<!--          <ElementsSubnav-->
<!--            :class="[activeSubnav === 'elements' && 'is-active']"-->
<!--          />-->

<!--          <ComponentsSubnav-->
<!--            :class="[activeSubnav === 'components' && 'is-active']"-->
<!--          />-->
<!--        </div>-->
<!--      </template>-->
    </Navbar>


<!--    <ActivityPanel />-->
<!--    <TaskPanel />-->

    <div class="view-wrapper has-top-nav">
      <div class="page-content-wrapper">
        <template v-if="props.nowrap">
          <slot></slot>
        </template>
        <div v-else class="page-content is-relative">
          <div class="is-navbar-lg">
            <div class="page-title has-text-centered">
              <!-- Mobile Page Title -->
              <div class="title-wrap">
                <h1 class="title is-4">{{ pageTitle }}</h1>
              </div>

              <Toolbar class="mobile-toolbar" />
            </div>

            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar-navbar .navbar-navbar-inner .left .brand img {
  display: block;
  min-width: 105px !important;
  height: 67px !important;
}

.mobile-navbar .navbar-brand .is-brand img {
  position: relative;
  height: 75px !important;
  max-height: 64px !important;
}
</style>
