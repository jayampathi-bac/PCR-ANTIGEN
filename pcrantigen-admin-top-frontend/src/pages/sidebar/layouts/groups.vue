<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Groups'
useHead({
  title: 'Groups',
})
</script>

<template>
  <div class="page-content-inner">
    <GroupsList/>
  </div>
</template>
