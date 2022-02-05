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
        title: `Do you want to edit profile ?`,
        showCancelButton: true,
        confirmButtonText: 'Save',
      }).then((result) => {
        if (result.isConfirmed) {
          // onSave()
        }
      })
    }else{
      notyf.warning('Passwords do not match. Please try again..!')
      isLoading.value = false
    }

  } else{
    notyf.warning('Fields are empty..!')
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
        notyf.success('Your changes have been successfully saved!')
        swal.fire('Saving Successful!', '', 'success')
        isLoading.value = false
      } else {
        swal.fire('Saving Failed!', '', 'error')
        notyf.warning('Please try again!')
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
          <h3>Settings</h3>
          <p>Edit your account prefs and settings</p>
        </div>
        <div class="right">
          <div class="buttons">
            <V-Button
              :to="{ name: 'sidebar-layouts-admindashboard' }"
              icon="lnir lnir-arrow-left rem-100"
              light
              dark-outlined
            >
              Go Back
            </V-Button>
            <V-Button
              color="primary"
              raised
              :loading="isLoading"
              @click="fireEditAccountAlert"
            >
              Save Changes
            </V-Button>
          </div>
        </div>
      </div>
    </div>
    <form class="form-body" @submit.prevent="">
      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Change Password</h4>
          <p>For an improved account security</p>
        </div>

        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <V-Control icon="feather:unlock">
                <input
                  type="password"
                  class="input"
                  placeholder="Current Password"
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
                  placeholder="New Password"
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
                  placeholder="Repeat New Password"
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
          <h4>Notifications</h4>
          <p>Configure how you receive notifications</p>
        </div>

        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <V-Control>
                <V-SwitchBlock
                  v-model="notifications"
                  label="Disable all notifications"
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
