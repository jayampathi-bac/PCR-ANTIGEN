<script setup lang="ts">
import { isDark } from '/@src/state/darkModeState'
import { activePanel } from '/@src/state/activePanelState'
import useDropdown from '/@src/composable/useDropdown'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'

const { locale } = useI18n()
const dropdownElement = ref<HTMLElement | null>(null)
const dropdown = useDropdown(dropdownElement)


</script>

<template>
  <div class="toolbar ml-auto">
    <div class="toolbar-link pr-3">
      <label class="dark-mode ml-auto">
        <input
          type="checkbox"
          :checked="!isDark"
          @change="
            (event) => {
              isDark = !event.target.checked
            }
          "
        />
        <span></span>
      </label>
    </div>




  </div>
</template>
