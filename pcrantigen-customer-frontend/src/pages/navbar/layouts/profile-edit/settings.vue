<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/navbarLayoutState'

pageTitle.value = '設定'
useHead({
  title: '設定',
})
</script>

<template>
  <EditProfileSettings />
</template>
