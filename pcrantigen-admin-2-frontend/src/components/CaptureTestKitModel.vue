<script setup>
import {onMounted, ref, toRefs, inject, defineProps, watch} from 'vue'

const captureUserImageModel = ref(false)
const captureTestImageModel = ref(false)
const openCaptureUserImageModel = () => {
  captureUserImageModel.value = true
}
const openCaptureTestImageModel = () => {
  captureTestImageModel.value = true
}
const closeCaptureUserImageModel = () => {
  captureUserImageModel.value = false
}
const closeCaptureTestImageModel = () => {
  captureTestImageModel.value = false
}

// const video = ref(null)
// const canvas = ref(null)
const photo = ref(null);
const isImageCaptured = ref(false);
const hasCameraSupport = ref(true);
const imageUploadData = ref([]);

let videoElm = null
let canvasElm = null

const checkForCameraSupport = () => {
  const supports = navigator.mediaDevices.getSupportedConstraints();
  if (!supports['facingMode']) {
    hasCameraSupport.value = false
    console.log("Please Connect a camera..!")
  } else {
    hasCameraSupport.value = true
    capture('environment');
  }
}
let stream;
const capture = async facingMode => {
  const options = {
    audio: false,
    video: {
      facingMode,
    },
  };

  try {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    stream = await navigator.mediaDevices.getUserMedia(options);
  } catch (e) {
    alert(e);
    return;
  }
  videoElm.srcObject = null;
  videoElm.srcObject = stream;
  videoElm.play();
}

const captureImage = () => {
  let video = videoElm
  let canvas = canvasElm
  canvas.width = video.getBoundingClientRect().width
  canvas.height = video.getBoundingClientRect().height
  let context = canvas.getContext('2d')
  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  isImageCaptured.value = true
  photo.value = dataURItoBlob(canvas.toDataURL())
  // disableCamera()
  console.log('capturing savedTestImage', photo.value)
}

const dataURItoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}


const reloadCapture = () => {
  capture('environment');
  isImageCaptured.value = false
}

onMounted(() => {
  checkForCameraSupport()
  videoElm = document.querySelector('#video');
  canvasElm = document.querySelector('#canvas');
})

</script>

<template>
  <div>
    <V-Control>
      <VButtons class="is-centered">
        <VButton @click="openCaptureUserImageModel()"
                 color="info" icon="feather:user" raised rounded outlined
        > Capture Customer Image
        </VButton>
        <VButton @click="openCaptureTestImageModel()"
                 color="danger" icon="feather:activity" raised rounded outlined>
          Capture Test Image
        </VButton>
      </VButtons>
    </V-Control>

    <VModal
      :open="captureTestImageModel"
      size="large"
      actions="center"
      @close="closeCaptureTestImageModel()"
      title="Capture Test Record Image"
    >
      <template #content>
        <div>
          <div class="camera-frame columns">
            <div>
              <video
                v-show="!isImageCaptured"
                id="video"
                class="has-fullwidth"
                autoplay
              />
              <canvas
                v-show="isImageCaptured"
                id="canvas"
                class="full-width"
                height="240"
              />
            </div>
          </div>
          <div class="columns" v-if="hasCameraSupport">
            <div class="column">
              <div class="is-centered">
                <VButtons style="justify-content: center">
                  <VButton
                    @click="reloadCapture"
                    :disable="isImageCaptured"
                    rounded
                  >Reload
                  </VButton>
                  <VButton
                    @click="captureImage"
                    color="success" outlined
                    rounded
                  >Capture
                  </VButton>
                  <!--            <VButton-->
                  <!--              @click="swapCamera"-->
                  <!--              outlined-->
                  <!--              rounded-->
                  <!--            >Swap</VButton>-->
                </VButtons>
              </div>
            </div>
          </div>
        </div>

      </template>
      <template #action>
        <VButton color="primary" raised @click="">Save Image</VButton>
      </template>
    </VModal>

    <VModal
      :open="captureUserImageModel"
      size="large"
      actions="center"
      @close="closeCaptureUserImageModel()"
      title="Capture Customer Image"
    >
      <template #content>
        <!--        <capture-user-image :is-opened="captureUserImageModel" @savedCustomerImage="savedCustomerImage"/>-->

      </template>
      <template #action>
        <VButton color="primary" raised @click="">Save Image</VButton>
      </template>
    </VModal>
  </div>
</template>


<style scoped>

</style>
