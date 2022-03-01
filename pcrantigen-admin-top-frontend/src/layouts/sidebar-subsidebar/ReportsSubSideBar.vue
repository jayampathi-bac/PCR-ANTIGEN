<script setup lang="ts">
import { defineEmit } from 'vue'

const emit = defineEmit(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">レポート</h3>
      <div class="panel-close" @click="emit('close')">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li>
          <RouterLink :to="{ name: 'sidebar-layouts-reports-list-customer' }">顧客情報レポート</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'sidebar-layouts-reports-list-branches' }">薬局者情報レポート</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'sidebar-layouts-reports-list-tests' }">検査情報レポートを</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-panel.scss';
</style>
