<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Group Invoice'
useHead({
  title: 'Group Invoice',
})
</script>

<template>
  <div class="page-content-inner">
    <GroupsInvoice />
  </div>
</template>
