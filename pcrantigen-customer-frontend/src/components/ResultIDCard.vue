<script setup lang="ts">

import {ref,toRefs, onMounted, defineProps, watch,defineEmit } from 'vue'
import html2canvas from "html2canvas";
import CustomerService from '../../src/service/customerService';
import {useStore} from "vuex";
import jsPDF from 'jspdf';

const props = defineProps({
  foo: Number
})

const emit = defineEmit(['btnChanged'])

// const emit =defineEmit({
//   btnChanged() {
//     return -1
//   },
// })

const handleClose = () => {
  emit('btnChanged')
}

const { foo } = toRefs(props);

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
  handleClose();
  emit('btnChanged')
};

const bindInputToElement = (inputEl, elementEl) => {
  inputEl.addEventListener('change', () => {
    elementEl.textContent = inputEl.value;
  });
}

function getBase64FromImageUrlProfile(url) {
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

function getBase64FromImageUrlTestKit(url) {
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

const PrintImage = () => {
  console.log('Im batman')
  window.print();
}

watch(() => props.foo, (first, second) => {
  // console.log("Watch props:", first, second);
  first === 1 ? downloadPNG() :
    first === 2 ? downloadPDF() :
      first === 3 ? PrintImage() : null
});



onMounted(() => {
  console.log(contact_number.value, "contact")
  //calling api

  customerService.getCustomerIDCard(contact_number.value)
    .then(function (response) {
      console.log('response', response)
      test_done_at.value = response.created_at
      brand_name.value = response.brand_name
      test_validity.value = response.validity
      // profile_url.value = response.user_image_url
      // testkit_image .value = response.script_image_url
      // getBase64FromImageUrlProfile('https://i.ibb.co/6vy5156/user.jpg')
      // getBase64FromImageUrlTestKit('https://i.ibb.co/GcycDhP/testkit.png')
      getBase64FromImageUrlProfile(response.user_image_url)
      getBase64FromImageUrlTestKit(response.script_image_url)
      // getBase64FromImageUrlProfile('https://sample.jvpdtest.com/User.jpg')
      // getBase64FromImageUrlTestKit('https://sample.jvpdtest.com/testkit.jpg')
    })
    .catch(function (error) {
      console.log(error);
    });

})


</script>

<template>
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
        <p class="para">Validity : {{test_validity}}</p>
        <div class="rotated"></div>
      </div>
    </div>
  </div>
<!--  <div><button @click="downloadPNG()">downlaod</button></div>-->
<!--  <div><button @click="downloadPDF()">pdf</button></div>-->
</template>


<style lang="scss" scoped>
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
  height: 192px;
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
  width: 95%;
  border-radius: 5px;
}

#img2{
  width: 50%;
  height: 30%;
}

.para{
  font-family: 'PT Sans', sans-serif;
  color: black;
  font-size: 7pt;
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
