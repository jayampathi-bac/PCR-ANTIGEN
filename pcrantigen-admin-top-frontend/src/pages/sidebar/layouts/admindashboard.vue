<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = '管理者ダッシュボード'
useHead({
  title: '管理者ダッシュボード',
})
</script>

<template>
  <div class="page-content-inner">
    <admin-top-dashboard/>
  </div>
</template>
