<script setup lang="ts">
import {useHead} from '@vueuse/head'

import {pageTitle} from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Admin 2 Dashboard'
useHead({
  title: 'Admin 2 Dashboard',
})

</script>

<template>
  <div class="page-content-inner">
    <Admin2Dashboard/>
  </div>
</template>
