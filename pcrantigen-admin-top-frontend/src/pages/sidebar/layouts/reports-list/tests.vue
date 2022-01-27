<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Test Records'
useHead({
  title: 'Test Records',
})
</script>

<template>
  <div class="page-content-inner">
    <TestReportsList/>
  </div>
</template>
