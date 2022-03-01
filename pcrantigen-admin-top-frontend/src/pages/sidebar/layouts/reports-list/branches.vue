<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = '薬局者情報レポート'
useHead({
  title: '薬局者情報レポート',
})
</script>

<template>
  <div class="page-content-inner">
    <BranchReportsList/>
  </div>
</template>
