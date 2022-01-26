<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Reports'
useHead({
  title: 'Reports',
})
</script>

<template>
  <div class="page-content-inner">
    <ReportsList />
  </div>
</template>
