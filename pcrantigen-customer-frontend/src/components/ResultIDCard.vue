<script setup>

</script>

<template>
  <div id="card">
    <div class="rotated2"></div>
    <!-- <h2>Test Result Certificate</h2> -->
    <h3>测试结果证书</h3>
    <img src="https://i.ibb.co/TLmMFvZ/jvpd.png" id="logo" />
    <!-- <img src="jvpd-logo original.png" id="logo" /> -->
    <hr style="margin-top: 0%;">
    <div id="d1">
      <img src="https://www.nicepng.com/png/detail/60-609253_smile-shapers-men-smile-smiling-man-conditioning-black.png" id="img1" />
    </div>
    <!-- <p class="validity center para">Year : 2022</p>
    <p class="validity2 center para">Validity : Sept/02 - Dec/02</p> -->

    <img src="https://www.abingdonhealth.com/app/uploads/2021/01/Multi-plex-lfd-720x500-c-default.jpg" id="img2" />
    <!-- <p class="para">Test Name : PCR Antigen - PFizer</p>
    <p class="para">Test Result : Negative(-)</p>
    <p class="para">Done At : 2022/01/02 - 17:25 PM</p>
    <p class="para center">Result Valid Through : 2022/01/02 - 2022/01/02</p> -->
    <p class="para">测试名称 ：PCR 抗原 - PFizer</p>
    <p class="para">测试结果 ：阴性（-）</p>
    <p class="para">完成时间 ：2022/01/02 - 17:25 PM</p>
    <p class="para center">结果有效期至 : 2022/01/02 - 2022/01/02</p>
    <div class="rotated"></div>
    <!-- <a href="https://ibb.co/tX8pWmS"><img src="https://i.ibb.co/TLmMFvZ/jvpd.png" alt="jvpd" border="0"></a> -->
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

.validity{
  position: absolute;
  bottom: 18px;
}
.validity2{
  position: absolute;
  bottom: 0px;
}

#card {
  position: absolute;
  width: 336px;
  height: 220px;
  /* height: 192px; */
  padding: 1%;
  padding-top: 1;
  padding-bottom: 1;
  margin:10%;
  border-color: black;
  border-width: medium;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}




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

#card h3 {
  font-family: 'PT Sans', sans-serif;
  color: #333;
  margin-top: 2.5%;
  padding: 0;
  font-size: 8pt;
  float: left;
  margin-left: 5%;
}

.para{
  font-family: 'PT Sans', sans-serif;
  color: black;
  font-size: 7pt;
  font-weight: 400;
}
.rotated {
  background-color: rgb(45, 167, 120);
  bottom: 0%;
  height: 2%;
  width: 100%;
}
.rotated2 {
  background-color: rgb(45, 167, 120);
  top: 0%;
  height:2%;
  width: 100%;
}
</style>
