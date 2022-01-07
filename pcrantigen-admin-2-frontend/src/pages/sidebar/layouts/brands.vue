<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'
import ResultGeneration from "/@src/components/pages/layouts/flex-list/ResultGeneration.vue";
import CustomersList from "/@src/components/pages/layouts/flex-list/CustomersList.vue";
import BrandsList from "/@src/components/pages/layouts/flex-list/BrandsList.vue";

pageTitle.value = 'Brands'
useHead({
  title: 'Brands',
})
</script>

<template>
  <div class="page-content-inner">
    <BrandsList/>
  </div>
</template>
