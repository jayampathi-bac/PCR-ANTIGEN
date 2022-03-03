<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import {computed, inject, onBeforeMount, ref} from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'
import axios from "axios";
import {useStore} from "vuex";
import {basic_url} from "/@src/utils/basic_config";

import { useCookies } from "vue3-cookies";

import UserService from '/@src/service/userService';

const userService = new UserService();
const swal = inject('$swal')
const { cookies } = useCookies();
const notyf = useNotyf()
const { y } = useWindowScroll()

const isLoading = ref(false)
const twoFactor = ref(true)
const notifications = ref(false)
const notificationsLow = ref(false)
const marketing = ref(false)
const partners = ref(false)
const store = useStore()

const isScrolling = computed(() => {
  return y.value > 30
})

const fireEditAccountAlert = () => {
  isLoading.value = true
  if (current_password.value && new_password.value && confirm_password.value) {
    if (new_password.value === confirm_password.value){
      swal.fire({
        title: `プロフィール情報変更したいですか？`,
        showCancelButton: true,
        confirmButtonText: '保存する',
        cancelButtonText:'キャンセル',
        confirmButtonColor: '#41b883',
      }).then((result) => {
        if (result.isConfirmed) {
          onSave()
        }
      })
    }else{
      notyf.warning('パスワードが間違っていないかもう一度ご確認お願い致します。')
      isLoading.value = false
    }

  } else{
    notyf.warning('未入力フィールドがございます。')
    isLoading.value = false
  }
}

const current_password = ref(null);
const new_password = ref(null);
const confirm_password = ref(null);

const onSave = async () => {
  isLoading.value = true
  let data = {current_password: current_password.value, new_password: new_password.value, contact_number: store.state.auth.admin2.contact}
  userService.editUserAccount(data)
    .then(function (response) {
      if (response.data.success) {
        notyf.success('保存完了')
        swal.fire('保存完了', '', 'success')
        isLoading.value = false
      } else {
        swal.fire('フィールドが保存しました。', '', 'error')
        notyf.warning('もう一度トライしてください。')
        isLoading.value = false
      }
    }).catch(function (error) {
    console.log(error);
    isLoading.value = false
  });
}


</script>

<template>
  <div class="account-box is-form is-footerless">
    <div class="form-head stuck-header" :class="[isScrolling && 'is-stuck']">
      <div class="form-head-inner">
        <div class="left">
          <h3>設定</h3>
          <p>プロフィール情報変更と設定</p>
        </div>
        <div class="right">
          <div class="buttons">
            <V-Button
              :to="{ name: 'sidebar-layouts-dashboard' }"
              icon="lnir lnir-arrow-left rem-100"
              light
              dark-outlined
            >
              前に戻る
            </V-Button>
            <V-Button
              color="primary"
              raised
              :loading="isLoading"
              @click="fireEditAccountAlert"
            >
              保存する
            </V-Button>
          </div>
        </div>
      </div>
    </div>
    <form class="form-body" @submit.prevent="">
      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>パスワードを変更</h4>
          <p>アカウントのセキュリティを向上させるため</p>
        </div>

        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <V-Control icon="feather:unlock">
                <input
                  type="password"
                  class="input"
                  placeholder="現在のパスワード"
                  autocomplete="current-password"
                  v-model="current_password"
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <V-Control icon="feather:lock">
                <input
                  type="password"
                  class="input"
                  placeholder="新しいパスワード"
                  autocomplete="new-password"
                  v-model="new_password"
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <V-Control icon="feather:lock">
                <input
                  type="password"
                  class="input"
                  placeholder="再新しいパスワード"
                  autocomplete="new-password"
                  v-model="confirm_password"
                />
              </V-Control>
            </V-Field>
          </div>
        </div>
      </div>

      <!--Fieldset-->
      <!--      <div class="fieldset">-->
      <!--        <div class="fieldset-heading">-->
      <!--          <h4>2 Factor Auth</h4>-->
      <!--          <p>Enable or disable 2 factor auth</p>-->
      <!--        </div>-->

      <!--        <div class="columns is-multiline">-->
      <!--          &lt;!&ndash;Field&ndash;&gt;-->
      <!--          <div class="column is-12">-->
      <!--            <V-Field>-->
      <!--              <V-Control>-->
      <!--                <V-SwitchBlock-->
      <!--                  v-model="twoFactor"-->
      <!--                  label="Enable / disable 2 factor"-->
      <!--                  color="primary"-->
      <!--                />-->
      <!--              </V-Control>-->
      <!--            </V-Field>-->
      <!--          </div>-->
      <!--          &lt;!&ndash;Field&ndash;&gt;-->
      <!--          <div v-if="twoFactor" class="column is-12">-->
      <!--            <V-Field>-->
      <!--              <V-Control icon="feather:smartphone">-->
      <!--                <input-->
      <!--                  type="text"-->
      <!--                  class="input"-->
      <!--                  placeholder="Phone Number"-->
      <!--                  autocomplete="tel"-->
      <!--                  inputmode="tel"-->
      <!--                />-->
      <!--              </V-Control>-->
      <!--            </V-Field>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>通知</h4>
          <p>通知の受信方法を構成する。</p>
        </div>

        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <V-Control>
                <V-SwitchBlock
                  v-model="notifications"
                  label="全ての通知を無効にする。"
                  color="primary"
                />
              </V-Control>
            </V-Field>

            <!--            <V-Field>-->
            <!--              <V-Control>-->
            <!--                <V-SwitchBlock-->
            <!--                  v-model="notificationsLow"-->
            <!--                  label="Disable low priority notifications"-->
            <!--                  color="primary"-->
            <!--                />-->
            <!--              </V-Control>-->
            <!--            </V-Field>-->
          </div>
        </div>
      </div>

      <!--Fieldset-->
      <!--      <div class="fieldset">-->
      <!--        <div class="fieldset-heading">-->
      <!--          <h4>Marketing</h4>-->
      <!--          <p>Configure how you receive promotions</p>-->
      <!--        </div>-->

      <!--        <div class="columns is-multiline">-->
      <!--          &lt;!&ndash;Field&ndash;&gt;-->
      <!--          <div class="column is-12">-->
      <!--            <V-Field>-->
      <!--              <V-Control>-->
      <!--                <V-SwitchBlock-->
      <!--                  v-model="marketing"-->
      <!--                  label="Enable marketing emails"-->
      <!--                  color="primary"-->
      <!--                />-->
      <!--              </V-Control>-->
      <!--            </V-Field>-->
      <!--            <V-Field>-->
      <!--              <V-Control>-->
      <!--                <V-SwitchBlock-->
      <!--                  v-model="partners"-->
      <!--                  label="Enable partners emails"-->
      <!--                  color="primary"-->
      <!--                />-->
      <!--              </V-Control>-->
      <!--            </V-Field>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </form>
  </div>
</template>
<style lang="scss">
.swal2-title {
  font-size: 20px !important;
}

.swal2-styled.swal2-confirm {
  background-color: #41b883 !important;
}

</style>
