<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/navbarLayoutState'
import {defineProps, ref, toRefs} from "vue";
pageTitle.value = 'Search Results'
useHead({
  title: 'Search Results - Navbar',
})
</script>

<template>
  <div
    class="
      page-contents
      tabs-wrapper
      is-triple-slider is-squared is-inverted is-navbar-lg
    "
  >
    <div class="page-content-inner">
      <FacetSearch />
    </div>
  </div>
</template>
