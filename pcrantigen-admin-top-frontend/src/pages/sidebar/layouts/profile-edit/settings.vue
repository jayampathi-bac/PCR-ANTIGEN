<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/navbarLayoutState'

pageTitle.value = 'アカウント設定'

useHead({
  title: 'アカウント設定',
})
</script>

<template>
  <EditProfileSettings />
</template>
