<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useStore } from 'vuex'

import { isDark } from '/@src/state/darkModeState'
import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'

const store = useStore()
const isLoading = ref(false)
const router = useRouter()
const notif = useNotyf()
const userName1 = ref(null)
const ups = ref(null)

const handleLogin = async () => {
  // router.push({ name: 'sidebar-layouts-admindashboard' })
  if (!isLoading.value) {
    isLoading.value = true
    if (userName1.value && ups.value) {
      store.dispatch("auth/login", {
        username: userName1.value,
        password: ups.value
      }).then((response) => {
          console.log("resp resp",response)
          isLoading.value = false
          router.push({ name: 'sidebar-layouts-admindashboard' })
          // console.log('hrere hrer',store.state.auth.admintop.name)
          notif.success(`Welcome ${store.state.auth.admintop.name} .!`)
        },
        (error) => {
          notif.warning('Incorrect credentials.! Please try again..!')
          isLoading.value = false
        }
      );
    } else {
      notif.warning("empty fields.!")
      isLoading.value = false
    }
  }
}

useHead({
  title: 'Login',
})

</script>

<template>
  <div class="auth-wrapper-inner is-single">
    <!--Fake navigation-->
    <div class="auth-nav">
      <div class="left"></div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <img src="./assets/jvpd.png"   alt=""/>
        </RouterLink>
      </div>
      <div class="right">
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

    <!--Single Centered Form-->
    <div class="single-form-wrap">
      <div class="inner-wrap">
        <!--Form Title-->
<!--        <div class="auth-head">-->
<!--          <p>Please sign in to your account</p>-->
<!--          <RouterLink :to="{ name: 'auth-signup' }">-->
<!--            I do not have an account yet-->
<!--          </RouterLink>-->
<!--        </div>-->

        <!--Form-->
        <div class="form-card mt-6">
          <form @submit.prevent="handleLogin">
            <div class="login-form">
              <!--              contact-->
              <V-Field>
                <V-Control icon="feather:user">
                  <input
                    class="input"
                    type="text"
                    inputmode="text"
                    placeholder="User Name"
                    autocomplete="username"
                    v-model="userName1"
                  />
                </V-Control>
              </V-Field>
              <!--              password-->
              <V-Field>
                <V-Control icon="feather:lock">
                  <input
                    class="input"
                    type="password"
                    placeholder="Password"
                    autocomplete="current-password"
                    v-model="ups"
                  />
                </V-Control>
              </V-Field>
              <!-- Switch -->
              <V-Control class="setting-item">
                <label for="remember-me" class="form-switch is-primary">
                  <input id="remember-me" type="checkbox" class="is-switch" />
                  <i aria-hidden="true"></i>
                </label>
                <div class="setting-meta">
                  <label for="remember-me">
                    <span>Remember Me</span>
                  </label>
                </div>
              </V-Control>
              <!-- Submit -->
              <V-Control class="login">
                <V-Button
                  :loading="isLoading"
                  color="primary"
                  bold
                  fullwidth
                  raised
                >
                  Sign In
                </V-Button>
              </V-Control>
            </div>
          </form>
        </div>
        <RouterLink
          :to="{ name: 'auth-forget' }"
          class="is-submenu"
        >
          <div class="forgot-link has-text-centered">
            <a>Forgot Password?</a>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../scss/abstracts/_variables.scss';
@import '../scss/abstracts/_mixins.scss';
@import '../scss/pages/auth/_auth.scss';

.control {
  position: relative;
  width: 100%;
  margin-top: 16px;
}

.dont-have-an-account {
  font-size: 1.0rem;
  color: $muted-grey;
  font-weight: 500;
}
.auth-nav .center a img{
  max-width: 120px !important;
  margin-top: 156px;
}
//
</style>
