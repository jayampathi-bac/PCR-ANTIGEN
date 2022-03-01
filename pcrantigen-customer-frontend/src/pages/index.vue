<script setup>
import {prototype} from "@mapbox/mapbox-gl-geocoder";
import {socket_url} from "/@src/utils/basic_config";

useHead({
  title: 'Login',
})

import {ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useHead} from '@vueuse/head'
import {useStore} from 'vuex'
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
import {isDark} from '/@src/state/darkModeState'
import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'

const store = useStore()
const route = useRoute()

const isLoading = ref(false)
const router = useRouter()
const notif = useNotyf()
const userName1 = ref(null)
const ups = ref(null)

//websocket part
let connection = null

const handleLogin = async () => {
  if (!isLoading.value) {
    isLoading.value = true
    if (userName1.value && ups.value) {
      store.dispatch("auth/login", {
        username: userName1.value,
        password: ups.value
      }).then(() => {
          isLoading.value = false
          router.push({name: 'results'})
          notif.success(`ようこそ！ ${store.state.auth.user.name} .!`)
          if (identifier.value !== undefined){
            // console.log("calling websocket")
            callingWebSocket();
          }
        },
        (error) => {
          notif.warning('誤った資格情報です。もう一度やり直してください。')
          isLoading.value = false
        }
      );
    } else {
      notif.warning("未入力フィールドがございます。")
      isLoading.value = false
    }
  }
}

const callingWebSocket = () => {
  // console.log("Starting connection to WebSocket Server")
  connection = new WebSocket(socket_url)

  connection.onopen = function (event) {
    // console.log(event)
    // console.log("Successfully connected to the echo websocket server...")
    sendMessage();
  }

  connection.onclose = function(){
    connection = new WebSocket(socket_url)
  };
}

const sendMessage = () => {
  // console.log(connection);
  // console.log("hi",store.getters['auth/getContactNo'])
  connection.send(`{"contact_number": "${cookies.get('user').contact_number}","branch_id":"${store.getters.getBranchID}"}`);
}

const identifier = ref('-1')

onMounted(() => {
  // console.log("hi this is the param",route.query.identifier)
  // console.log("hi this is the param data",route.params.data)
  // const branch_id = route.params.index;
  identifier.value = route.query.identifier ? route.query.identifier : 0
  if(!route.query.identifier ){
    // console.log("testing data params",route.params.data)
    identifier.value = (!route.params.data || route.params.data !== 0) ? route.params.data : 0
    // console.log("testing data params identifier",identifier.value)
  }
  store.commit('setBranchID', identifier.value)
})


</script>

<template>
  <div class="auth-wrapper-inner is-single">
    <!--Fake navigation-->
    <div class="auth-nav">
      <div class="left"></div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <img src="./assets/jvpd.png" alt=""/>
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
        <div class="auth-head mt-5">
          <p>ログイン</p>
          <RouterLink
            :to="{
            name: 'auth-signup-3',
            params: { identifier: identifier}
            }"
          >会員登録がお済みでない方は新規会員登録を行って下さい。
          </RouterLink>
        </div>

        <!--Form-->
        <div class="form-card">
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
                    placeholder="電話番号"
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
                    placeholder="パスワード"
                    autocomplete="current-password"
                    v-model="ups"
                  />
                </V-Control>
              </V-Field>
              <!-- Switch -->
              <V-Control class="setting-item">
                <label for="remember-me" class="form-switch is-primary">
                  <input id="remember-me" type="checkbox" class="is-switch"/>
                  <i aria-hidden="true"></i>
                </label>
                <div class="setting-meta">
                  <label for="remember-me">
                    <span>パスワードを保存する</span>
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
                  ログイン
                </V-Button>
              </V-Control>
            </div>
          </form>
        </div>
        <RouterLink
          :to="{ name: 'auth-login-1' }"
          class="is-submenu"
        >
          <div class="forgot-link has-text-centered">
            <a>パスワードを忘れた方はこちら</a>
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

.auth-nav .center a img {
  max-width: 120px !important;
  margin-top: 150px;
}

.auth-wrapper-inner .single-form-wrap .inner-wrap .auth-head p{
  font-weight: 550 !important;
}

.auth-wrapper-inner .single-form-wrap .inner-wrap .auth-head a{
  font-size: 0.84rem  !important;
}
//
</style>
