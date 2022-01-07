<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'
import ResultGeneration from "/@src/components/pages/layouts/flex-list/ResultGeneration.vue";
import TestsList from "/@src/components/pages/layouts/flex-list/AllTestsList.vue";

pageTitle.value = 'All Tests'
useHead({
  title: 'All Tests',
})
</script>

<template>
  <div class="page-content-inner">
    <AllTestsList/>
  </div>
</template>
