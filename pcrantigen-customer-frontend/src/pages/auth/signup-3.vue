<script setup lang="ts">
import {onMounted, ref, defineProps, toRefs, watch} from 'vue'
import {useRouter} from 'vue-router'
import {useHead} from '@vueuse/head'
import useNotyf from '/@src/composable/useNotyf'
import {basic_url} from "/@src/utils/basic_config";

import {isDark} from '/@src/state/darkModeState'
import sleep from '/@src/utils/sleep'
import axios from "axios";

const props = defineProps({
  identifier: String,
});

let {identifier} = toRefs(props);


const router = useRouter()
const notif = useNotyf()
const isLoading = ref(false)
const name = ref(null)
const contact_number = ref(null)
const email = ref(null)
const password = ref(null)
const repeat_password = ref(null)
const isAgreed = ref(null)

const handleSignup = async () => {
  console.log("identifier handle", identifier.value)
  if (name.value && contact_number.value && email.value && password.value && repeat_password.value) {
    isLoading.value = true
    if (password.value !== repeat_password.value) {
      notif.warning('Passwords do not match. Please try again..!')
    } else {
      if (!isAgreed.value) {
        notif.warning('Please agree to the terms and conditions..!')
      } else {
        axios
          .post(`${basic_url}/v1/customer`, {
            name: name.value,
            contact_number: contact_number.value,
            email: email.value,
            password: password.value,
            profile_url: "https://resource.jvpdtest.com/User.png",
            branch_id: (identifier.value !== '0') ? identifier.value : null
          })
          .then(response => {
            // console.log("signup response : ",response)
            if (response.data.success === true) {
              notif.success(response.data.message)
              router.push({name: 'index', params: { data: identifier ? identifier.value  : 0}})
            } else {
              notif.warning(response.data.message)
            }
          });
      }
    }
    // notif.success('Welcome, Erik Kovalsky')
    // router.push({ name: 'index' })
    isLoading.value = false
  } else {
    notif.warning('Please fill the empty Fields..!')
    isLoading.value = false
  }
}

useHead({
  title: 'Signup',
})

onMounted(() => {
  // @ts-ignore
  console.log("hi this is the identifier",identifier);
  if (identifier === undefined) {
    router.push({ name: "index" })
  }
  console.log("hi this is the identifier",identifier);


})
</script>

<template>
  <div class="auth-wrapper-inner is-single">
    <!--Fake navigation-->
    <div class="auth-nav">
      <div class="left"></div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <!--          <AnimatedLogo width="38px" height="38px" />-->
          <img src="../assets/jvpd.png" class="pt-6" alt=""/>
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
        <div class="auth-head">
          <!--          <h2>Join Us Now.</h2>-->
          <p>Start by creating your account</p>
          <RouterLink :to="{ name: 'index' }">
            I already have an account
          </RouterLink>
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="handleSignup">
            <div class="login-form">
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:user">
                  <input
                    class="input"
                    type="text"
                    placeholder="Name"
                    autocomplete="name"
                    v-model="name"
                  />
                </V-Control>
              </V-Field>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:phone">
                  <input
                    class="input"
                    type="text"
                    placeholder="Contact Number"
                    autocomplete="contact_number"
                    v-model="contact_number"
                  />
                </V-Control>
              </V-Field>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:mail">
                  <input
                    class="input"
                    type="text"
                    placeholder="Email Address"
                    autocomplete="email"
                    v-model="email"
                  />
                </V-Control>
              </V-Field>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:lock">
                  <input
                    class="input"
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                    v-model="password"
                  />
                </V-Control>
              </V-Field>
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:lock">
                  <input
                    class="input"
                    type="password"
                    placeholder="Repeat Password"
                    v-model="repeat_password"
                  />
                </V-Control>
              </V-Field>

              <V-Field>
                <V-Control class="setting-item">
                  <label for="send-promotional" class="form-switch is-primary">
                    <input
                      id="send-promotional"
                      type="checkbox"
                      class="is-switch"
                      v-model="isAgreed"
                    />
                    <i aria-hidden="true"></i>
                  </label>
                  <div class="setting-meta">
                    <label for="send-promotional">
                      <span>Agree to our terms & conditions.</span>
                    </label>
                  </div>
                </V-Control>
              </V-Field>

              <!-- Submit -->
              <V-Field>
                <V-Control class="login">
                  <V-Button color="primary" bold fullwidth raised>
                    Sign Up
                  </V-Button>
                </V-Control>
              </V-Field>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/auth/_auth.scss';

.auth-nav .center a img {
  max-width: 120px !important;
  margin-top: 20px;
}
</style>
