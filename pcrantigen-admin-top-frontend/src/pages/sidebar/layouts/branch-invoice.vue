<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Branch Invoice'
useHead({
  title: 'Branch Invoice',
})
</script>

<template>
  <div class="page-content-inner">
    <BranchesInvoice />
  </div>
</template>
