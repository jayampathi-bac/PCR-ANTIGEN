<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = '薬局者'
useHead({
  title: '薬局者',
})
</script>

<template>
  <div class="page-content-inner">
    <BranchesList/>
  </div>
</template>
