<script setup>

</script>

<template>
  <!-- <div class="rotated2"></div> -->
  <!-- <h3>测试结果证书</h3> -->

  <!-- <img src="https://i.ibb.co/TLmMFvZ/jvpd.png" id="logo" />
  <hr style="margin: 5px 0; ">
  <div id="d1">
    <img src="https://www.nicepng.com/png/detail/60-609253_smile-shapers-men-smile-smiling-man-conditioning-black.png" id="img1" />
  </div>

  <img src="https://www.abingdonhealth.com/app/uploads/2021/01/Multi-plex-lfd-720x500-c-default.jpg" id="img2" />
  <p class="para">测试名称 ：PCR 抗原 - PFizer</p>
  <p class="para">测试结果 ：阴性（-）</p>
  <p class="para">完成时间 ：2022/01/02 - 17:25 PM</p>
  <p class="para center">结果有效期至 : 2022/01/02 - 2022/01/02</p>
  <div class="rotated"></div> -->

  <div id="id-card" >
    <div class="id-card material-ui-shadow">
      <div class="rotated2"></div>
      <h3>测试结果证书</h3>
      <!-- <img src="https://i.ibb.co/TLmMFvZ/jvpd.png" id="logo" /> -->
      <hr style="margin: 5px 0; ">
      <div id="d1">
        <img src="https://www.nicepng.com/png/detail/60-609253_smile-shapers-men-smile-smiling-man-conditioning-black.png" id="img1" />
      </div>
      <img src="https://www.abingdonhealth.com/app/uploads/2021/01/Multi-plex-lfd-720x500-c-default.jpg" id="img2" />
      <p class="para">测试名称 ：PCR 抗原 - PFizer</p>
      <p class="para">测试结果 ：阴性（-）</p>
      <p class="para">完成时间 ：2022/01/02 - 17:25 PM</p>
      <p class="para">结果有效期至 : 2022/01/02 - 2022/01/02</p>
      <div class="rotated"></div>
    </div>

  </div>




</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');

//html, body {
//  font-family: 'PT', sans-serif;
//}

template {
  font-family: 'PT Sans', sans-serif;
}

.center {
  text-align: center;
}

// .validity{
//   position: absolute;
//   bottom: 18px;
// }
// .validity2{
//   position: absolute;
//   bottom: 0px;
// }

// #card {
//   // position: absolute;
//   width: 336px;
//   height: 220px;
//   / height: 192px; /
//   padding: 1%;
//   padding-top: 1;
//   padding-bottom: 1;
//   margin:10%;
//   border-color: black;
//   border-width: medium;
//   background: white;
//   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
// }




#img1{
  width: 95%;
  border-radius: 5px;
}
#logo{
  width: 20%;
  height: 15%;
  margin: 0%;
  margin-left: 52%;
}
#d1{
  float: left;
  width:45%;
}
#img2{
  width: 50%;
  height: 30%;
}

// #card h3 {
//   font-family: 'PT Sans', sans-serif;
//   color: #333;
//   margin-top: 2.5%;
//   padding: 0;
//   font-size: 8pt;
//   float: left;
//   margin-left: 5%;
// }

.para{
  font-family: 'PT Sans', sans-serif;
  color: black;
  font-size: 7pt;
  font-weight: 400;
}
.rotated {
  background-color: rgb(45, 167, 120);
  bottom: 0%;
  height: 4px;
  width: 100%;
  margin-top: 24px;
}
.rotated2 {
  background-color: rgb(45, 167, 120);
  top: 0%;
  height:2%;
  width: 100%;
}

body {
  background: #e2e1e0;
  margin: 0 auto;
  padding: 12vmin 10vmin;
  max-width: 50em;
  line-height: 1.5em;
  font-family: 'PT Sans';
  word-wrap: break-word;
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

.logo {
  &__big {
    font-size: 24pt;
    font-weight: bold;
    line-height: 1.3;
    letter-spacing: 4px;
  }

  &__small {
    font-size: 10pt;
    letter-spacing: 4px;
    position: relative;
    top: -10px;
    left: 2px;
  }
}


.id-form {

  &__row {
    padding-bottom: 8px;

    &--inline {
      width: 10em;
      padding-right: 1em;
      padding-bottom: 1em;
      display: inline-block;
    }
  }

  &__label {
    font-size: 8pt;
    line-height: 8pt;
  }

  &__input {
  }
}

.material-ui-shadow {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.material-ui-shadow:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>
