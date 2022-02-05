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
import html2canvas from "html2canvas";

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
const image_in_base64 = ref();

const notyf = useNotyf()
const {y} = useWindowScroll()

const isScrolling = computed(() => {
  return y.value > 30
})

const getBase64 = (file: any) => {
  console.log("basing")
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
    image_in_base64.value = reader.result;
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

const onAddFile = (error: any, file: any) => {
  if (error) {
    console.error(error)
    return
  }
  getBase64(file.file)
  console.log('file added', file)
}

const onRemoveFile = (error: any, file: any) => {
  if (error) {
    console.error(error)
    return
  }
  console.log('file removed', file)
}

const name = ref(store.state.auth.admin2.name);
const contact_number = ref(store.state.auth.admin2.contact_number);
const address = ref(store.state.auth.admin2.address);
const profile_picture_url = ref(store.state.auth.admin2.profile_url ? store.state.auth.admin2.profile_url : "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png");


const QrCodeActionsOpen = ref(false)

const downloadQR = () => {
  QrCodeActionsOpen.value = true;

}

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
    profile_url: image_in_base64.value ? image_in_base64.value : ''
  }
  userService.editUserProfile(data)
    .then(function (response) {
      console.log('userService response--------',response)
      if (response.data.success) {
        notyf.success('Your changes have been successfully saved!')
        swal.fire('Saving Successful!', '', 'success')
        store.dispatch("auth/updateUser", {
          name: name.value,
          address: address.value,
          profile_url:response.data.data.profile_url ,
        })
        const user = {
          name: name.value,
          contact: contact_number.value,
          branch_id: response.data.data.branch_id,
          address: address.value,
          access_token: cookies.get('admin2').access_token,
          profile_url: response.data.data.profile_url,
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

const downloadPNG = () => {
  const node = document.getElementById('id-card');

  html2canvas(node).then(canvas => {
    var link = document.createElement('a');
    link.download = 'idcard.png';
    link.href = canvas.toDataURL()
    link.click();
  });
};


function getBase64FromImageUrlQR(url : any) {
  const img = new Image();

  img.setAttribute('crossOrigin', 'anonymous');

  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width =this.width;
    canvas.height =this.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);

    const dataURL = canvas.toDataURL("image/png");

    // alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));

    const img2 = document.getElementById('qr-img');
    img2.src = dataURL;
  };

  img.src = url;
}


onBeforeMount(() => {
  name.value = cookies.get('admin2').name
  contact_number.value = cookies.get('admin2').contact
  address.value = cookies.get('admin2').address
  profile_picture_url.value = cookies.get('admin2').profile_url
  getBase64FromImageUrlQR(store.state.auth.admin2.qr_code_url)
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
              :to="{ name: 'sidebar-layouts-dashboard' }"
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
              :src="store.state.auth.admin2.profile_url"
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
       <div class="columns is-multiline">
         <div class="column is-9">
           <div class="fieldset-heading">
             <h4>Personal Info</h4>
             <p>Update your personal details here. </p>
           </div>
         </div>
         <div class="column is-2">
           <div class="fieldset-heading">
<!--             <VButton icon="feather:eye" outlined> QR Code </VButton>-->
             <VButton icon="feather:eye" color="primary" outlined @click="QrCodeActionsOpen = true">  QR Code </VButton>
           </div>
         </div>
       </div>

        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <label>Full Name</label>
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
              <label>Contact Number</label>
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
              <label>Address</label>
              <V-Control icon="feather:mail">
                <input
                  type="text"
                  class="input"
                  placeholder="Address"
                  autocomplete="address"
                  v-model="address"
                />
              </V-Control>
            </V-Field>
          </div>
        </div>
      </div>
    </div>
    <VModal
      :open="QrCodeActionsOpen"
      size="medium"
      actions="center"
      @close="QrCodeActionsOpen = false"
      title="QR Code"
    >
      <template #content>
        <form class="form-layout is-split" @submit.prevent>
          <div class="form-outer">
            <div class="form-section is-grey">
              <div id="id-card">
                <img id="qr-img" :src="store.state.auth.admin2.qr_code_url" alt="qrcode-1" border="0">
              </div>
            </div>
          </div>
        </form>
      </template>
      <template #action>
        <VButton color="primary" raised @click="downloadPNG">Download</VButton>
      </template>
    </VModal>
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
