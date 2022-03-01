<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'レポート'
useHead({
  title: 'レポート',
})
</script>

<template>
  <div class="page-content-inner">
    <ReportsList />
  </div>
</template>
