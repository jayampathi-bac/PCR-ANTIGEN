<script setup lang="ts">
import {defineEmit, defineProps, onMounted, ref, toRefs, watch} from 'vue'
import axios from "axios";
import {useStore} from 'vuex'
import { useCookies } from "vue3-cookies";
import {basic_url} from "/@src/utils/basic_config";
import CustomerService from "/@src/service/customerService";
import html2canvas from "html2canvas";

import jsPDF from "jspdf";

const { cookies } = useCookies();

const centeredActionsOpen = ref(false)

const customerService = new CustomerService();
const store = useStore()
const profile_url = ref('')
const testkit_image = ref('')
const test_name = ref("PCR Antigen")
const brand_name = ref("PFizer")
const test_result = ref("Negative （-）")
const test_done_at = ref("2022/01/02 - 17:25 PM")
const test_validity = ref("2022/01/02 - 2022/01/02")
const contact_number = ref(store.state.auth.user.contact_number);
const isIdCardAvailable = ref(false)

async function getData() {
  customerService.getCustomerIDCard(contact_number.value)
    .then(function (response) {
      isIdCardAvailable.value = !!response.success
      console.log('response --------', response)
      test_done_at.value = response.data.created_at
      brand_name.value = response.data.brand_name
      test_validity.value = response.data.validity
      // profile_url.value = response.user_image_url
      // testkit_image .value = response.script_image_url
      getBase64FromImageUrlProfile(response.data.user_image_url)
      getBase64FromImageUrlTestKit(response.data.script_image_url)
    })
    .catch(function (error) {
      console.log(error);
    });
}

const downloadPDF = () => {
  const node = document.getElementById('id-card');

  html2canvas(node).then(canvas => {
    const doc = new jsPDF("l", "mm", "a4");
    const imgData = canvas.toDataURL();
    doc.addImage(imgData, 'JPEG', 0, 0, 300, 192);
    doc.save('document.pdf');
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

const PrintImage = () => {
  console.log('Im batman')
  window.print();
}

const bindInputToElement = (inputEl: any, elementEl: any) => {
  inputEl.addEventListener('change', () => {
    elementEl.textContent = inputEl.value;
  });
}

function getBase64FromImageUrlProfile(url : any) {
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

    const img2 = document.getElementById('id-card-mugshot');
    img2.src = dataURL;
  };

  img.src = url;
}

function getBase64FromImageUrlTestKit(url: any) {
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

    const img2 = document.getElementById('img2');
    img2.src = dataURL;
  };

  img.src = url;
}

onMounted(async () => {
  await getData();
})

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
            <div id="print-div">
              <div id="id-card" >
                <div class="id-card material-ui-shadow">
                  <div class="rotated2"></div>
                  <p class="topic">测试结果证书</p>
                  <hr style="margin: 5px 0; ">
                  <div id="id-card__mugshot">
                    <img  id="id-card-mugshot" :src="profile_url" />
                  </div>
                  <img id="img2"  :src="testkit_image"  />
                  <p class="para">Test Name ：{{test_name}} - {{brand_name}}</p>
                  <p class="para">Result ：{{test_result}}</p>
                  <p class="para">Test Done At ：{{test_done_at}}</p>


                  <div>
                    <p class="para">Validity : {{test_validity}}</p>
<!--                    <p class="para">Validity : 2022-02-03 01:39 - 2022-02-06 01:39</p>-->
                  </div>
                  <div class="rotated"></div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #action>
          <VButton color="primary" raised v-on:click="downloadPNG"> PNG</VButton>
          <VButton color="primary" raised v-on:click="downloadPDF">  PDF</VButton>
          <VButton color="primary" raised v-on:click="PrintImage"> PRINT</VButton>
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

            <div class="search-results-list" v-if="isIdCardAvailable">
              <!--Item-->
              <div
                class="search-results-item"
              >
                <V-Block title="Antigen Test" :subtitle="test_done_at" center>
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

.modal-card-body{
  justify-content: center;
  display: flex;
}

@import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');

template {
  font-family: 'PT Sans', sans-serif;
}

#id-card {
  display: inline-block;
  float: left;
  margin-right: 2em;

}

.id-card {
  width: 336px;
  height: 193px;
  background: #ffffff;
  padding: 10px;
  position: relative;

  &__mugshot {
    position: absolute;
    right: 10px;

    width: 100px;
    height: 100px;
    //border-left: 4px solid red;
    background: #ffffff;

    img {
      width: 100px;
      height: 100px;
    }
  }

  &__logo {
    width: 200px;
  }

  &__subject-id {
    position: absolute;
    top: 54px;
    left: 130px;

    font-family: monospace;
    font-size: 14pt;
    transform: rotate(-4deg);
  }

  &__banner {
    height: 10pt;
    background: red;
    margin-top: 10px;
    margin-left: -10px;
    padding-left: 12px;
  }

  &__banner-text {
    color: #ffffff;
    font-size: 8pt;
    letter-spacing: 2px;
    line-height: 0;
    position: relative;
    top: -6px;
  }

  &__details {
    padding-top: 20px;
    font-size: 6pt;
    line-height: 1.5;
    text-transform: uppercase;
    width: 60%;
    display: inline-block;

    &--short {
      float: right;
      margin-left: 30px;
      width: 100px;
    }
  }

  &__detail {
    height: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    & + & {
      border-top: 1px solid #eeee;
    }
  }

  &__detail-label {
    color: #333;
    font-weight: bold;

    &:after {
      content: ' • ';
      font-weight: normal;
    }
  }
}
.rotated2 {
  background-color: rgb(45, 167, 120);
  top: 0%;
  height:2%;
  width: 100%;
}

#id-card__mugshot{
  float: left;
  width:45%;
  object-fit: cover;
}

#id-card-mugshot{
  width: 128px;
  border-radius: 5px;
  height: 127px;
  object-fit: fill;
}

#img2{
  width: 50%;
  height: 30%;
}

.para{
  font-family: 'PT Sans', sans-serif;
  color: black;
  font-size: 6.3pt;
  font-weight: 400;
}
.topic{
  font-family: 'PT Sans', sans-serif;
  color: black;
  font-size: 11pt;
  font-weight: 400;
}


.rotated {
  background-color: rgb(45, 167, 120);
  bottom: 0%;
  height: 4px;
  width: 100%;
  margin-top: 24px;
}
</style>
