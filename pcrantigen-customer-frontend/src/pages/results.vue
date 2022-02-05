<script setup lang="ts">
/**
 * This is a Vue Component that will be
 * automatically mapped to a entry on vue-router.
 *
 * You will be able to access this page at http://localhost:3000/results
 * Page uri will match related path to src/pages folder
 *
 * Read more about routing:
 * @see /vite.config.ts
 * @see /src/router.ts
 */

import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/navbarLayoutState'
import SearchResults from "/@src/pages/navbar/layouts/search-results.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()
pageTitle.value = 'Antigen Results'
useHead({
  title: 'Antigen Results',
})

</script>

<template>
  <NavbarLayout  >
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <!--
        Page content goes here

        You can see pages content samples from
        files in /src/components/pages directory
      -->
      <search-results/>
    </div>
  </NavbarLayout>
</template>
