<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push({
    name: 'sidebar-layouts-dashboard',
  })
})
</script>

<template>
  <div></div>
</template>
