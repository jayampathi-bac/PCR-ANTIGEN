<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/navbarLayoutState'

pageTitle.value = 'Account'
useHead({
  title: 'Edit Account Settings',
})
</script>

<template>
  <EditProfileSettings />
</template>
