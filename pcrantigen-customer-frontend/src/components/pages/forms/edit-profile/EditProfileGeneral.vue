<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import {computed, onBeforeMount, onMounted, ref} from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'
import {useStore} from 'vuex'
import axios from "axios";
import { useCookies } from "vue3-cookies";
import {basic_url,ip_address_for_image} from "/@src/utils/basic_config";

const { cookies } = useCookies();
const store = useStore()
const isUploading = ref(false)
const isLoading = ref(false)
const experience = ref('')
const firstJob = ref('')
const flexibility = ref('')
const remote = ref('')
const skills = ref(['software', 'saas', 'engineering'])
const skillsOptions = [
  { value: 'software', label: 'Software' },
  { value: 'saas', label: 'SaaS' },
  { value: 'engineering', label: 'Engineering' },
]

const notyf = useNotyf()
const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value > 30
})

const image_in_base64 = ref();
const image_file = ref();
const image = ref();

function getBase64(file) {
  console.log("basing")
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
    image_in_base64.value = reader.result;
    dataURItoBlob(reader.result)
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}


const dataURItoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], {type: mimeString});
  image_file.value = blob;
}


const onAddFile = (error: any, file: any) => {
  if (error) {
    console.error(error)
    return
  }

  console.log('file added', file)
  getBase64(file.file)
}



const onRemoveFile = (error: any, file: any) => {
  if (error) {
    console.error(error)
    return
  }

  console.log('file removed', file)
}
const name = ref(store.state.auth.user.name);
const contact_number = ref(store.state.auth.user.contact);
const email = ref(store.state.auth.user.email);
const profile_picture_url = ref(store.state.auth.user.profile_url ? store.state.auth.user.profile_url : "https://resource.jvpdtest.com/User.png");

const isLoaderActive = ref(false)



const onSave = async () => {
  isLoaderActive.value = !isLoaderActive.value
  isLoading.value = true

  if (name.value && email.value) {
    let data = {name: name.value, contact_number: contact_number.value, email: email.value, profile_url : image_in_base64.value ? image_in_base64.value : ''}
    let formData = new FormData();
    formData.append("name",name.value);
    formData.append("contact_number",contact_number.value);
    formData.append("email",email.value);
    // formData.append("profile_url",image_file.value, contact_number.value+'.jpg');
    formData.append("profile_url",image_in_base64.value);


    let config = {
      headers: {
        Authorization: "Bearer " + cookies.get('user').access_token,
      }}
    const res = await axios.post(`${basic_url}/v1/customer/post`,data, config);
    // console.log("updating response : ",res)
    if (res.data.success){
      console.log("response ",res)
      notyf.success('Your changes have been successfully saved!')
      store.dispatch("auth/updateUser", {
        name: name.value,
        email: email.value,
        profile_url: res.data.data.profile_url,
      })
      const user = {
        name:name.value,
        contact_number:contact_number.value,
        email:email.value ,
        access_token:cookies.get('user').access_token ,
        profile_url:res.data.data.profile_url ,
      };
      cookies.set("user",user,60 * 60 * 24 * 3);
    }else{
      console.log("response ",res)
      notyf.warning(res.data.message)
    }
  }else{
    notyf.warning('Fields are empty..!')
  }
  isLoaderActive.value = !isLoaderActive.value
  isLoading.value = false
}

onBeforeMount(() => {
  const userToken = cookies.get('user').access_token
  name.value = cookies.get('user').name
  contact_number.value =  cookies.get('user').contact_number
  email.value = cookies.get('user').email
  profile_picture_url.value = store.getters['auth/getUser'].name
})
onMounted( () => {
  console.log("store", store.getters['auth/getUser'].profile_url)
})
</script>

<template>
  <VLoader size="large"  center="smooth" lighter="true" translucent="true" :active="isLoaderActive">
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
              :to="{ name: 'results' }"
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
              @click.prevent="onSave"
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
              :src="store.getters['auth/getUser'] ? store.getters['auth/getUser'].profile_url : 'https://resource.jvpdtest.com/User.png'"
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
                  placeholder="Email Address"
                  autocomplete="email"
                  v-model="email"
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
<!--          <div class="column is-12">-->
<!--            <V-Field>-->
<!--              <V-Control icon="feather:map-pin">-->
<!--                <input-->
<!--                  type="text"-->
<!--                  class="input"-->
<!--                  placeholder="Location"-->
<!--                  autocomplete="country-name"-->
<!--                />-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
          <!--Field-->
<!--          <div class="column is-12">-->
<!--            <V-Field>-->
<!--              <V-Control>-->
<!--                <textarea-->
<!--                  class="textarea"-->
<!--                  rows="4"-->
<!--                  placeholder="About / Bio"-->
<!--                  autocomplete="off"-->
<!--                  autocapitalize="off"-->
<!--                  spellcheck="true"-->
<!--                ></textarea>-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
        </div>
      </div>

<!--      <div class="fieldset">-->
<!--        <div class="fieldset-heading">-->
<!--          <h4>Change your password</h4>-->
<!--          <p>Please fill the following fields if you need to change the old password.</p>-->
<!--        </div>-->

<!--        <div class="columns is-multiline">-->
<!--          &lt;!&ndash;Field&ndash;&gt;-->
<!--          <div class="column is-12">-->
<!--            <V-Field>-->
<!--              <V-Control icon="feather:lock">-->
<!--                <input-->
<!--                  class="input"-->
<!--                  type="password"-->
<!--                  placeholder="Current Password"-->
<!--                  autocomplete="current-password"-->
<!--                />-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
<!--          &lt;!&ndash;Field&ndash;&gt;-->
<!--          <div class="column is-12">-->
<!--            <V-Field>-->
<!--              <V-Control icon="feather:lock">-->
<!--                <input-->
<!--                  class="input"-->
<!--                  type="password"-->
<!--                  placeholder="New Password"-->
<!--                  autocomplete="new-password"-->
<!--                />-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
<!--          <div class="column is-12">-->
<!--            <V-Field>-->
<!--              <V-Control icon="feather:lock">-->
<!--                <input-->
<!--                  class="input"-->
<!--                  type="password"-->
<!--                  placeholder="Confirm Password"-->
<!--                  autocomplete="confirm-password"-->
<!--                />-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <!--Fieldset-->
<!--      <div class="fieldset">-->
<!--        <div class="fieldset-heading">-->
<!--          <h4>Social Profiles</h4>-->
<!--          <p>This can help others finding you on social media</p>-->
<!--        </div>-->
<!--        <div class="columns is-multiline">-->
<!--          &lt;!&ndash;Field&ndash;&gt;-->
<!--          <div class="column is-6">-->
<!--            <V-Field>-->
<!--              <V-Control icon="fab fa-facebook-f">-->
<!--                <input-->
<!--                  type="text"-->
<!--                  class="input"-->
<!--                  placeholder="Facebook URL"-->
<!--                  inputmode="url"-->
<!--                />-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
<!--          &lt;!&ndash;Field&ndash;&gt;-->
<!--          <div class="column is-6">-->
<!--            <V-Field>-->
<!--              <V-Control icon="fab fa-twitter">-->
<!--                <input-->
<!--                  type="text"-->
<!--                  class="input"-->
<!--                  placeholder="Twitter URL"-->
<!--                  inputmode="url"-->
<!--                />-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
<!--          &lt;!&ndash;Field&ndash;&gt;-->
<!--          <div class="column is-6">-->
<!--            <V-Field>-->
<!--              <V-Control icon="fab fa-dribbble">-->
<!--                <input-->
<!--                  type="text"-->
<!--                  class="input"-->
<!--                  placeholder="Dribbble URL"-->
<!--                  inputmode="url"-->
<!--                />-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
<!--          &lt;!&ndash;Field&ndash;&gt;-->
<!--          <div class="column is-6">-->
<!--            <V-Field>-->
<!--              <V-Control icon="fab fa-instagram">-->
<!--                <input-->
<!--                  type="text"-->
<!--                  class="input"-->
<!--                  placeholder="Instagram URL"-->
<!--                  inputmode="url"-->
<!--                />-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
<!--          &lt;!&ndash;Field&ndash;&gt;-->
<!--          <div class="column is-6">-->
<!--            <V-Field>-->
<!--              <V-Control icon="fab fa-github">-->
<!--                <input-->
<!--                  type="text"-->
<!--                  class="input"-->
<!--                  placeholder="Github URL"-->
<!--                  inputmode="url"-->
<!--                />-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
<!--          &lt;!&ndash;Field&ndash;&gt;-->
<!--          <div class="column is-6">-->
<!--            <V-Field>-->
<!--              <V-Control icon="fab fa-gitlab">-->
<!--                <input-->
<!--                  type="text"-->
<!--                  class="input"-->
<!--                  placeholder="Gitlab URL"-->
<!--                  inputmode="url"-->
<!--                />-->
<!--              </V-Control>-->
<!--            </V-Field>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
  </VLoader>
</template>
