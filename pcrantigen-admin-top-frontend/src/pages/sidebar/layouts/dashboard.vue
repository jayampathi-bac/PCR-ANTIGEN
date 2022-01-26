<script setup lang="ts">
import {useHead} from '@vueuse/head'

import {pageTitle} from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Admin Dashboard'
useHead({
  title: 'Admin Dashboard',
})

</script>

<template>
  <div class="page-content-inner">
    <AdminDashboard/>
  </div>
</template>
