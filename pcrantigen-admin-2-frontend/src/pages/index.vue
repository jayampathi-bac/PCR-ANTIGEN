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
  // await router.push({name: 'sidebar-layouts-dashboard'})
  if (!isLoading.value) {
    isLoading.value = true
    if (userName1.value && ups.value) {
      store.dispatch("auth/login", {
        username: userName1.value,
        password: ups.value
      }).then((response) => {
          console.log("resp resp",response)
          isLoading.value = false
          router.push({ name: 'sidebar-layouts-dashboard' })
          // console.log('hrere hrer',store.state.auth.admin2)
          notif.success(`Welcome ${store.state.auth.admin2.name} .!`)
        },
        (error) => {
          // console.log("eror",error.response)
          // if (error.response.data.error_description){
          //
          //   notif.warning(error.response.data.error_description )
          // }else{
          //   notif.warning(error)
          // }
          if(error.response !== undefined){
            error.response.data.error_description === "Bad credentials" ? notif.warning('Invalid username or password..!'):
              error.response.data.error_description === "Time in not Valid period" ? notif.warning('Not Within Valid Time Period..!'):
                error.response.data.error_description === "Account Not Found" ? notif.warning('User Account Not Found..!'):
                  notif.warning('Something went wrong!')
          }else{
            notif.warning('Connection was interrupted!')
          }
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
                <V-Control icon="feather:phone">
                  <input
                    class="input"
                    type="number"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    placeholder="Contact Number"
                    autocomplete="contact"
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
