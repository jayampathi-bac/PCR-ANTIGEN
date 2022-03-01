<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'
import ResultGeneration from "/@src/components/pages/layouts/flex-list/ResultGeneration.vue";

pageTitle.value = '検査結果を送信'
useHead({
  title: '検査結果を送信',
})
</script>

<template>
  <div class="page-content-inner">
    <ResultGeneration/>
  </div>
</template>
