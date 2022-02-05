<script setup lang="ts">
import {ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
const router = useRouter()
const store = useStore()

function handleLogOut() {
  store.dispatch("auth/logout")
  router.push({name: "index"})
};

const name = ref(cookies.get('admintop') ? cookies.get('admintop').name : null)
const profile_url = ref(cookies.get('admintop') ? cookies.get('admintop').profile_url : null)
</script>

<template>
  <V-Dropdown right spaced class="user-dropdown profile-dropdown">
    <template #button="{ toggle }">
      <a
        class="is-trigger dropdown-trigger"
        aria-haspopup="true"
        @click="toggle"
      >
        <V-Avatar picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"/>
      </a>
    </template>

    <template #content>
      <div class="dropdown-head">
        <V-Avatar size="large" picture="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"/>

        <div class="meta">
          <span>{{ name }}</span>
          <!--          <span>Product Manager</span>-->
        </div>
      </div>
<!--      <RouterLink-->
<!--        :to="{ name: 'sidebar-layouts-profile-edit' }"-->
<!--        class="is-submenu"-->
<!--      >-->
<!--        <a href="#" role="menuitem" class="dropdown-item is-media">-->
<!--          <div class="icon">-->
<!--            <i aria-hidden="true" class="lnil lnil-user-alt"></i>-->
<!--          </div>-->
<!--          <div class="meta">-->
<!--            <span>Profile</span>-->
<!--            <span>View your profile</span>-->
<!--          </div>-->
<!--        </a>-->
<!--      </RouterLink>-->

<!--      <hr class="dropdown-divider"/>-->
      <!--      <a href="#" role="menuitem" class="dropdown-item is-media">-->
      <!--        <div class="icon">-->
      <!--          <i aria-hidden="true" class="lnil lnil-briefcase"></i>-->
      <!--        </div>-->
      <!--        <div class="meta">-->
      <!--          <span>Projects</span>-->
      <!--          <span>All my projects</span>-->
      <!--        </div>-->
      <!--      </a>-->

      <!--      <a href="#" role="menuitem" class="dropdown-item is-media">-->
      <!--        <div class="icon">-->
      <!--          <i aria-hidden="true" class="lnil lnil-users-alt"></i>-->
      <!--        </div>-->
      <!--        <div class="meta">-->
      <!--          <span>Team</span>-->
      <!--          <span>Manage your team</span>-->
      <!--        </div>-->
      <!--      </a>-->

      <hr class="dropdown-divider"/>
      <RouterLink
        :to="{ name: 'sidebar-layouts-profile-edit-settings' }"
        class="is-submenu"
      >
        <a href="#" role="menuitem" class="dropdown-item is-media">
          <div class="icon">
            <i aria-hidden="true" class="lnil lnil-cog"></i>
          </div>
          <div class="meta">
            <span>Settings</span>
            <span>Account settings</span>
          </div>
        </a>
      </RouterLink>

      <hr class="dropdown-divider"/>

      <div class="dropdown-item is-button">
        <V-Button
          class="logout-button"
          icon="feather:log-out"
          color="primary"
          role="menuitem"
          raised
          fullwidth
          @click="handleLogOut"
        >
          Logout
        </V-Button>
      </div>
    </template>
  </V-Dropdown>
</template>
