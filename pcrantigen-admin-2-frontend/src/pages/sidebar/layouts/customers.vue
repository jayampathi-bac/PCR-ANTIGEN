<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'
import ResultGeneration from "/@src/components/pages/layouts/flex-list/ResultGeneration.vue";
import CustomersList from "/@src/components/pages/layouts/flex-list/CustomersList.vue";

pageTitle.value = '患者'
useHead({
  title: '患者',
})
</script>

<template>
  <div class="page-content-inner">
    <CustomersList/>
  </div>
</template>
