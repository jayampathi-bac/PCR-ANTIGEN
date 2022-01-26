<script setup lang="ts">
import {useWindowScroll} from '@vueuse/core'
import {computed, inject, onBeforeMount, ref} from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'
import {useStore} from 'vuex'
import axios from "axios";
import {useCookies} from "vue3-cookies";
import {basic_url} from "/@src/utils/basic_config";
import UserService from '/@src/service/userService';

const userService = new UserService();

const swal = inject('$swal')
const {cookies} = useCookies();
const store = useStore()
const isUploading = ref(false)
const isLoading = ref(false)
const experience = ref('')
const remote = ref('')
const skills = ref(['software', 'saas', 'engineering'])
const skillsOptions = [
  {value: 'software', label: 'Software'},
  {value: 'saas', label: 'SaaS'},
  {value: 'engineering', label: 'Engineering'},
]

const notyf = useNotyf()
const {y} = useWindowScroll()

const isScrolling = computed(() => {
  return y.value > 30
})

const onAddFile = (error: any, file: any) => {
  if (error) {
    console.error(error)
    return
  }

  console.log('file added', file)
}

const onRemoveFile = (error: any, file: any) => {
  if (error) {
    console.error(error)
    return
  }
  console.log('file removed', file)
}

const name = ref(store.state.auth.admintop.name);
const contact_number = ref(store.state.auth.admintop.contact_number);
const address = ref(store.state.auth.admintop.address);
const profile_picture_url = ref(store.state.auth.admin2.profile_url ? store.state.auth.admin2.profile_url : "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png");


const fireEditProfileAlert = () => {
  if (name.value && address.value) {
    swal.fire({
      title: `Do you want to edit profile ?`,
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        onSave()
      }
    })
  } else {
    notyf.warning('Fields are empty..!')
  }
}

const onSave = async () => {
  isLoading.value = true
  let data = {
    company_name: name.value,
    contact_number: contact_number.value,
    address: address.value,
    profile_url: profile_picture_url.value
  }
  userService.editUserProfile(data)
    .then(function (response) {
      if (response.data.success) {
        notyf.success('Your changes have been successfully saved!')
        swal.fire('Saving Successful!', '', 'success')
        store.dispatch("auth/updateUser", {
          name: name.value,
          address: address.value
        })
        const user = {
          name: name.value,
          contact: contact_number.value,
          address: address.value,
          access_token: cookies.get('admintop').access_token,
          profile_url: profile_picture_url.value,
        };
        cookies.set("admin2", user, 60 * 60 * 24 * 3);
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

onBeforeMount(() => {
  if (cookies.isKey("admintop")) {

    const userToken = cookies.get('admintop').access_token
    name.value = cookies.get('admintop').name
    contact_number.value = cookies.get('admintop').contact
    address.value = cookies.get('admintop').address
    profile_picture_url.value = cookies.get('admintop').profile_url
  }
})
</script>

<template>
  <div class="account-box is-form is-footerless">
    <div class="form-head stuck-header" :class="[isScrolling && 'is-stuck']">
      <div class="form-head-inner">
        <div class="left">
          <h3>General Info</h3>
          <p>Edit your account's general information</p>
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
              @click="fireEditProfileAlert()"
            >
              Save Changes
            </V-Button>
          </div>
        </div>
      </div>
    </div>
    <div class="form-body">
      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Profile Picture</h4>
        </div>

        <V-Avatar size="xl" class="profile-v-avatar">
          <template #avatar>
            <img
              v-if="!isUploading"
              class="avatar"
              src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
              alt=""
              @error.once="
                $event.target.src = 'https://via.placeholder.com/150x150'
              "
            />
            <V-FilePond
              v-else
              class="profile-filepond"
              name="profile_filepond"
              :chunk-retry-delays="[500, 1000, 3000]"
              label-idle="<i class='lnil lnil-cloud-upload'></i>"
              :accepted-file-types="['image/png', 'image/jpeg', 'image/gif']"
              :image-preview-height="140"
              :image-resize-target-width="140"
              :image-resize-target-height="140"
              image-crop-aspect-ratio="1:1"
              style-panel-layout="compact circle"
              style-load-indicator-position="center bottom"
              style-progress-indicator-position="right bottom"
              style-button-remove-item-position="left bottom"
              style-button-process-item-position="right bottom"
              @addfile="onAddFile"
              @removefile="onRemoveFile"
            />
            <V-IconButton
              v-if="!isUploading"
              icon="feather:edit-2"
              class="edit-button is-edit"
              circle
              @click="isUploading = true"
            />
            <V-IconButton
              v-else
              icon="feather:arrow-left"
              class="edit-button is-back"
              circle
              @click="isUploading = false"
            />
          </template>
        </V-Avatar>
      </div>

      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Personal Info</h4>
          <p>Update your personal details here. </p>
        </div>

        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <V-Control icon="feather:user">
                <input
                  type="text"
                  class="input"
                  placeholder="Full Name"
                  autocomplete="full-name"
                  v-model="name"
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <V-Control icon="feather:phone">
                <input
                  type="text"
                  class="input"
                  placeholder="Contact Number"
                  autocomplete="contact-number"
                  readonly
                  v-model="contact_number"
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <V-Control icon="feather:mail">
                <input
                  type="text"
                  class="input"
                  placeholder="EAddress"
                  autocomplete="address"
                  v-model="address"
                />
              </V-Control>
            </V-Field>
          </div>
        </div>
      </div>
    </div>
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
