<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = '検査情報レポートを'
useHead({
  title: '検査情報レポートを',
})
</script>

<template>
  <div class="page-content-inner">
    <TestReportsList/>
  </div>
</template>
