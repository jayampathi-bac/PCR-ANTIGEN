<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = '顧客情報レポート'
useHead({
  title: '顧客情報レポート',
})
</script>

<template>
  <div class="page-content-inner">
    <CustomerReportsList/>
  </div>
</template>
