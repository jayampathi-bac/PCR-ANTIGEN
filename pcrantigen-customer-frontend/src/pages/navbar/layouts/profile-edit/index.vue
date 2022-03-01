<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/navbarLayoutState'

pageTitle.value = 'プロフィール'
useHead({
  title: 'マイプロフィールを編集',
})
</script>

<template>
  <EditProfileGeneral />
</template>
