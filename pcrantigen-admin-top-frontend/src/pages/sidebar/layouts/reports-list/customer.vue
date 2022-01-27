<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Customer Reports'
useHead({
  title: 'Customer Reports',
})
</script>

<template>
  <div class="page-content-inner">
    <CustomerReportsList/>
  </div>
</template>
