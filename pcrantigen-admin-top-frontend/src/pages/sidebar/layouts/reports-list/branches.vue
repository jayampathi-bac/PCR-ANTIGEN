<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Branches Reports'
useHead({
  title: 'Branches Reports',
})
</script>

<template>
  <div class="page-content-inner">
    <BranchReportsList/>
  </div>
</template>
