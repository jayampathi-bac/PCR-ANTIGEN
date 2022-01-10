<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/navbarLayoutState'

pageTitle.value = 'Profile'
useHead({
  title: 'Edit Profile',
})
</script>

<template>
  <EditProfileGeneral />
</template>
