<script setup lang="ts">
import {useHead} from '@vueuse/head'

import {pageTitle} from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Dashboard'
useHead({
  title: 'Dashboard',
})

</script>

<template>
  <div class="page-content-inner">
    <Admin2Dashboard/>
  </div>
</template>
