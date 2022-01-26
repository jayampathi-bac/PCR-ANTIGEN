<script setup lang="ts">
import { computed, defineEmit, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { isDark } from '/@src/state/darkModeState'
import { activePanel } from '/@src/state/activePanelState'
import useDropdown from '/@src/composable/useDropdown'

const emit = defineEmit(['close'])

const { locale } = useI18n()
const dropdownElement = ref<HTMLElement | null>(null)
const dropdown = useDropdown(dropdownElement)

const localFlagSrc = computed(() => {
  switch (locale.value) {
    case 'fr':
      return 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png'
    case 'es':
      return 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png'
    case 'es-MX':
      return 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png'
    case 'de':
      return 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png'
    case 'zh-CN':
      return 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png'
    case 'en':
    default:
      return 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png'
  }
})
</script>

<template>
  <div class="toolbar ml-auto">
    <div class="toolbar-link">
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

    <a
      class="toolbar-link right-panel-trigger"
      @click="activePanel = 'languages'"
    >
      <img :src="localFlagSrc" alt="" />
    </a>

    <div class="toolbar-notifications is-hidden-mobile">
      <div
        ref="dropdownElement"
        class="dropdown is-spaced is-dots is-right dropdown-trigger"
      >
        <div class="is-trigger" aria-haspopup="true" @click="dropdown.toggle">
          <i aria-hidden="true" class="iconify" data-icon="feather:bell"></i>
          <span class="new-indicator pulsate"></span>
        </div>
        <div class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <div class="heading">
              <div class="heading-left">
                <h6 class="heading-title">Notifications</h6>
              </div>
              <div class="heading-right">
                <RouterLink
                  class="notification-link"
                  :to="{ name: 'sidebar-layouts-profile-notifications' }"
                >
                  See all
                </RouterLink>
              </div>
            </div>
            <ul class="notification-list">
              <li>
                <a class="notification-item">
                  <div class="img-left">
                    <img
                      class="user-photo"
                      alt=""
                      src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
                      @error.once="
                        $event.target.src =
                          'https://via.placeholder.com/150x150'
                      "
                    />
                  </div>
                  <div class="user-content">
                    <p class="user-info">
                      <span class="name">Alice C.</span> left a comment.
                    </p>
                    <p class="time">1 hour ago</p>
                  </div>
                </a>
              </li>
              <li>
                <a class="notification-item">
                  <div class="img-left">
                    <img
                      class="user-photo"
                      alt=""
                      src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
                      @error.once="
                        $event.target.src =
                          'https://via.placeholder.com/150x150'
                      "
                    />
                  </div>
                  <div class="user-content">
                    <p class="user-info">
                      <span class="name">Joshua S.</span> uploaded a file.
                    </p>
                    <p class="time">2 hours ago</p>
                  </div>
                </a>
              </li>
              <li>
                <a class="notification-item">
                  <div class="img-left">
                    <img
                      class="user-photo"
                      alt=""
                      src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
                      @error.once="
                        $event.target.src =
                          'https://via.placeholder.com/150x150'
                      "
                    />
                  </div>
                  <div class="user-content">
                    <p class="user-info">
                      <span class="name">Tara S.</span> sent you a message.
                    </p>
                    <p class="time">2 hours ago</p>
                  </div>
                </a>
              </li>
              <li>
                <a class="notification-item">
                  <div class="img-left">
                    <img
                      class="user-photo"
                      alt=""
                      src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
                      @error.once="
                        $event.target.src =
                          'https://via.placeholder.com/150x150'
                      "
                    />
                  </div>
                  <div class="user-content">
                    <p class="user-info">
                      <span class="name">Melany W.</span> left a comment.
                    </p>
                    <p class="time">3 hours ago</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <a id="hide-chat-side" class="toolbar-link" @click="emit('close')">
      <i
        aria-hidden="true"
        class="iconify"
        data-icon="feather:chevron-right"
      ></i>
    </a>
  </div>
</template>
