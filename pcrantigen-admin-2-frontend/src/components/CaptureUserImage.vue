<template>
  <div>
    <div class="camera-frame columns">
      <div>
        <video
          v-show="!imageCaptured"
          ref="video"
          class="has-fullwidth"
          autoplay
          muted
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
              :disabled="!imageCaptured"
              rounded
            >上書き
            </VButton>
            <VButton
              @click="captureImage"
              :disabled="imageCaptured"
              color="success" outlined
              rounded
            >撮影
            </VButton>
<!--            <VButton-->
<!--              @click="swapCamera"-->
<!--              outlined-->
<!--              rounded-->
<!--            >Swap-->
<!--            </VButton>-->
          </VButtons>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useNotyf from "/@src/composable/useNotyf";


export default {
  name: "CaptureUserImage",
  props: {
    isOpened: Boolean
  },
  data() {
    return {
      photo: null,
      imageCaptured: false,
      hasCameraSupport: true,
      imageUploadData: [],
      locationLoading: false,
      notif: useNotyf(),
      shouldFaceUser: false,
    }
  },
  methods: {
    initCamera() {
      let shouldFaceUser123 = this.shouldFaceUser ? 'user' : 'environment';
      // console.log("initCamera", shouldFaceUser123)
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: shouldFaceUser123
        },
      }).then(stream => {
        this.$refs.video.srcObject = stream
      }).catch(error => {
        console.log("error", error)
        this.notif.warning("カメラを設置してください。")
        this.hasCameraSupport = false
      })
    },
    captureImage() {
      let video = this.$refs.video
      let canvas = this.$refs.canvas
      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height
      let context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      this.imageCaptured = true
      this.photo = this.dataURItoBlob(canvas.toDataURL())
      this.disableCamera()
      // this.$emit('savedCustomerImage', this.photo)
      this.$emit('savedCustomerImage', canvas.toDataURL())
    },
    swapCamera() {
      // console.log("shouldFaceUser", this.shouldFaceUser)
      this.shouldFaceUser = !this.shouldFaceUser;
      this.initCamera();
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })

    },
    dataURItoBlob(dataURI) {
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

    },
    addPost() {
      this.$q.loading.show()
      let formdata = new FormData()
      formdata.append('id', this.post.id)
      formdata.append('caption', this.post.caption)
      formdata.append('location', this.post.location)
      formdata.append('date', this.post.date)
      formdata.append('file', this.post.photo, this.post.id + '.png')

      this.$axios.post(`${process.env.API}/createPost`, formdata).then(response => {
        // console.log("response : ", response)
        this.$router.push('/')

        //notification
        this.$q.notify({
          message: 'Post created.',
          actions: [
            {label: 'Dismiss', color: 'white'}
          ]
        })
        this.$q.loading.hide()
      }).catch(err => {
        this.$q.dialog({
          title: 'Error',
          message: 'Could not create the post'
        })
        this.$q.loading.hide()
      })
    },
    reloadCapture() {
      this.initCamera()
      this.imageCaptured = false
    }
  },
  mounted() {
    this.initCamera()
  },
  beforeUnmount() {
    if (this.hasCameraSupport) {
      // console.log("destroyed")
      this.disableCamera()
    }
  },

  watch: {
    isOpened: function (newVal, oldVal) {
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      if (newVal) {
        this.initCamera()
      } else {
        this.disableCamera()
        // console.log("photo",this.photo)
      }
    }
  }
}
</script>


