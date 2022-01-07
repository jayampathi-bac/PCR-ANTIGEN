<script setup lang="ts">
import {defineProps, onMounted, ref, toRefs} from 'vue'
import axios from "axios";
import {useStore} from 'vuex'
import GeneratedCard from "/@src/components/GeneratedCard.vue";
import html2canvas from 'html2canvas';
import IDCardGenerator from "/@src/components/IDCardGenerator.vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


const store = useStore()

const centeredActionsOpen = ref(false)


let result = ref(null)
let branch_id = ref(null)
let contact_number = ref(null)
let created_at = ref(null)
let record_status = ref(null)
let script_image_url = ref(null)
let user_image_url = ref(null)

const formData = ref({
  branch_id: branch_id,
  contact_number: contact_number,
  created_at: created_at,
  record_status: (record_status.value === 1) ? 'Positive' : 'Negative',
  script_image_url: script_image_url,
  user_image_url: user_image_url,
  email: store.state.auth.user.email
})

async function getData() {
  let userToken = cookies.get('user').access_token;
  let contact = cookies.get('user').contact;
  const res = await axios
    .get(`http://localhost:8080/v1/test/${contact}`, {headers: {Authorization: "Bearer " + userToken}})
    .then(response => {
      console.log("results response : ", response)
      if (response.data.success) {
        result.value = response.data.data
        branch_id.value = response.data.data["branch_id"]
        contact_number.value = response.data.data["contact_number"]
        created_at.value = response.data.data["created_at"]
        record_status.value = response.data.data["record_status"]
        script_image_url.value = response.data.data["script_image_url"]
        user_image_url.value = response.data.data["user_image_url"]
      }
      console.log("result", result.value)

    });
  return res;
}

onMounted(async () => {
  getData();
})

async function generateCard() {
  console.log("Button clicked");
  const canvas = await html2canvas(document.getElementById("generatedIdCard"));
  canvas.style.display = "none";
  document.body.appendChild(canvas);
  const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  const a = document.createElement("a");
  a.setAttribute("download", `TestResultID.png`);
  a.setAttribute("href", image);
  a.click();
}

</script>

<template>
  <div class="search-results-wrapper">
    <div class="search-results-header">
      <V-Modal
        title="Result "
        :open="centeredActionsOpen"
        actions="center"
        @close="centeredActionsOpen = false"
        @noclose="false"
      >
        <template #content>
          <div id="id-card-center">
            <!--            <img src="./src/assets/id.png" alt="">-->
<!--            <generated-card :formData="formData"/>-->
            <i-d-card-generator :formData="formData"/>
          </div>
        </template>
        <template #action>
          <VButton color="primary" raised @click="generateCard()"> PNG</VButton>
          <VButton color="primary" raised> PDF</VButton>
          <VButton color="primary" raised> PRINT</VButton>
        </template>
      </V-Modal>
    </div>

    <div class="search-results-body">
      <div class="columns">
        <!--Results-->
        <div class="column is-12" >
          <div class="search-results-group">
            <div class="group-header ">
              <V-IconWrap icon="feather:list"/>
              <h4>Your test results within the 72 hours validly is shown below.</h4>
            </div>

            <div class="search-results-list" v-if="result">
              <!--Item-->
              <div
                class="search-results-item"
              >
                <V-Block title="Antigen Test" :subtitle="created_at" center>
                  <template #icon>
                    <!--                    <V-Avatar size="medium" :picture="person.avatar" />-->
                  </template>
                  <template #action>
                    <V-Button @click="centeredActionsOpen = true" color="success" outlined> View Result</V-Button>
                  </template>
                </V-Block>
              </div>
            </div>
            <div v-else>
              <div class=" m-8">
                <h3 class="pb-9">0 results.</h3>
                <p class="is-larger">
                  No test results available yet, please contact your pharmacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';
@import '../../../../scss/pages/generic/_search.scss';

.v-modal .modal-content .modal-card .modal-card-foot .v-button {
  min-width: 70px;
  /* display: none; */
}

#id-card-center{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
