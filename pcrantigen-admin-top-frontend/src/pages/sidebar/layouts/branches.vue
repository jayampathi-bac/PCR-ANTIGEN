<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Branches'
useHead({
  title: 'Branches',
})
</script>

<template>
  <div class="page-content-inner">
    <BranchesList/>
  </div>
</template>
