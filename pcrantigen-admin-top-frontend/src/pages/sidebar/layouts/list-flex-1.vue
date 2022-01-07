<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'
import ResultGeneration from "/@src/components/pages/layouts/flex-list/ResultGeneration.vue";

pageTitle.value = 'Result Generation'
useHead({
  title: 'Result Generation',
})
</script>

<template>
  <div class="page-content-inner">
    <ResultGeneration/>
  </div>
</template>
