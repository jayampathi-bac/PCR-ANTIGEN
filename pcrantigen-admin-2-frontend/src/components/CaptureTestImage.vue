<template>
  <div>
    <div class="camera-frame columns">
      <div>
        <video
          v-show="!imageCaptured"
          ref="video"
          class="has-fullwidth"
          autoplay
        />
        <canvas
          v-show="imageCaptured"
          ref="canvas"
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
              :disable="imageCaptured"
              rounded
            >Reload</VButton>
            <VButton
              @click="captureImage"
              color="success" outlined
              rounded
            >Capture</VButton>
            <VButton
              @click="swapCamera"
              outlined
              rounded
            >Swap</VButton>
          </VButtons>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, toRefs, inject, defineProps, watch} from 'vue'
// const refs = inject('$refs')
const emit = inject('$emit')

const props = defineProps({
  isOpened: Boolean,
});

const video = ref(null)
const canvas = ref(null)

const { isOpened } = toRefs(props);

const photo = ref(null);
const imageCaptured = ref(false);
const hasCameraSupport = ref(true);
const imageUploadData = ref([]);
const locationLoading = ref(false);
const shouldFaceUser = ref(false);

const initCamera = () => {
  let shouldFaceUser123 = shouldFaceUser.value ? 'user' : 'environment';
  console.log("initCamera", shouldFaceUser123)
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'user'
    },
  }).then(stream => {
    video.value.srcObject = stream
  }).catch(error => {
    console.log("error",error)
    // notif.warning("Please Connect a camera..!")
    hasCameraSupport.value = false
  })
}

const captureImage = () => {
  let video = video.value
  let canvas = canvas.value
  canvas.width = video.getBoundingClientRect().width
  canvas.height = video.getBoundingClientRect().height
  let context = canvas.getContext('2d')
  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  imageCaptured.value = true
  photo.value = this.dataURItoBlob(canvas.toDataURL())
  disableCamera()
  emit('savedTestImage', this.photo)
  console.log("capturing")
}

const swapCamera = () => {
  console.log("shouldFaceUser",shouldFaceUser.value)
  shouldFaceUser.value = !shouldFaceUser.value;
  initCamera()
}

const disableCamera = () => {
  video.value.srcObject.getVideoTracks().forEach(track =>{
    track.stop()
  })

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

const addPost = () => {

  // let formdata = new FormData()
  // formdata.append('id',this.post.id)
  // formdata.append('caption',this.post.caption)
  // formdata.append('location',this.post.location)
  // formdata.append('date',this.post.date)
  // formdata.append('file',this.post.photo,this.post.id+'.png')
  //
  // this.$axios.post(`${process.env.API}/createPost`,formdata).then(response =>{
  //   console.log("response : ",response)
  //   this.$router.push('/')
  //
  //   //notification
  //   this.$q.notify({
  //     message: 'Post created.',
  //     actions: [
  //       { label: 'Dismiss', color: 'white' }
  //     ]
  //   })
  //   this.$q.loading.hide()
  // }).catch(err =>{
  //   this.$q.dialog({
  //     title: 'Error',
  //     message: 'Could not create the post'
  //   })
  //   this.$q.loading.hide()
  // })
}

const reloadCapture = () => {
  initCamera()
  imageCaptured.value = false
}

onMounted(() => {
  initCamera()
})

watch(
  () => isOpened.value,
  (count, prevCount) => {
    if (count){
      initCamera()
    }else{
      disableCamera()
      // console.log("photo",this.photo)
    }
  }
)


</script>


