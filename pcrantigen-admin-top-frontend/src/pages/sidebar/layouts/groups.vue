<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'グループ'
useHead({
  title: 'グループ',
})
</script>

<template>
  <div class="page-content-inner">
    <GroupsList/>
  </div>
</template>
