<script setup lang="ts">
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
</script>

<template>
  <div class="page-content-inner">
    <!--Edit Profile-->
    <div class="account-wrapper">
      <div class="columns">
        <!--Navigation-->
        <div class="column is-12">
          <RouterView v-slot="{ Component }">
            <transition name="translate-page-y" mode="in-out">
              <component :is="Component" />
            </transition>
          </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/profile/_user-profile.scss';
</style>
