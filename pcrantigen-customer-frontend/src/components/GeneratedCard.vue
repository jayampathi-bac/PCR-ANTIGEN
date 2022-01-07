<!-- Generated Card UI added here -->
<template>
  <div class="section-container section-right col-6">
    <div class="id-card-container" id="collegeCard">

      <div class="card-container">
        <div class="card-wrapper" id="generatedIdCard">
          <div class="user-card">
            <div style="margin: 2px">
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" style="border-radius: 50%" width="76em" >

            </div>
            <div style="margin-top: 2rem">
               <img src="https://i.ibb.co/8B6hd6y/Massive-testing-of-population-Quick-antibody-detection-test-Color-icons-on-blue-background-Vector-fl.jpg" alt="" style="border-radius: 5%" width="126em" >

            </div>
          </div>
          <div class="general-information text-left">
            <div class="card-element card-name">
              <span class="card-title">Name: </span>
              <span class="card-input" id="cardName">{{formData.fullName}}</span>
            </div>
            <div class="card-element test-date">
              <span class="card-title">Test Date: </span>
              <span class="card-input" id="cardTestName">{{formData.testName}}</span>
            </div>
            <div class="card-element test-time">
              <span class="card-title">Test Time: </span>
              <span class="card-input" id="cardTestTime">{{formData.testTime}}</span>
            </div>
            <div class="card-element test-result">
               <span class="card-title">Test Result: </span>
               <span class="card-input" id="cardTestResult">{{formData.testResult}}</span>
            </div>
            <p class="validity">Validity : yy/mm/dd/hh/mm to yy/mm/dd/hh/mm</p>
          </div>
        </div>
      </div>
<!--      <button class="btn-pdf" @click="generateCard()">PDF</button>-->
<!--          <button class="btn-pdf" @click="generateCard()">JPG</button>-->
<!--          <button class="btn-pdf" @click="generateCard()">PRINT</button>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeneratedCard',
  props: {
      formData: Object
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root {
  --bg-official: #4047f0;
  --font-body: "Montserrat", sans-serif;
}
.subtitle-section {
  color: var(--bg-official);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 25px;
}
.btn-pdf{
margin:20px;
}
.subtitle-card {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 25px;
}

.text-center {
  text-align: center;
}

.container-general {
  display: flex;
  align-items: center;
}

.section-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #c8c8c8;
}

.section-left {
  border-bottom-left-radius: 16px;
}

.section-right {
  border-bottom-right-radius: 16px;
}

.container-box {
  padding-left: 0;
  padding-right: 0;
}
/*#myimg{*/
/*  height: 10%;*/
/*  width:10%;*/
/*}*/


.form-element {
  margin: 5px;
  min-width: 200px;
}

.form-box {
  width: 100%;
  max-width: 285px;
}

.form-label {
  min-width: 150px;
  display: block;
  font-family: var(--font-body);
  font-weight: 600;
}

.form-input {
  display: block;
  border: 1px solid #c4b4b4;
  border-radius: 10px;
  height: 40px;
  padding: 5px 10px 5px 40px;
}

.font-icon {
  position: relative;
}

.font-icon i {
  position: absolute;
  left: 15px;
  top: 45px;
  color: #000;
}

.btn-generate {
  border: none;
  border-radius: 10px;
  background-color: var(--bg-official);
  color: #fff;
  font-family: var(--font-body);
  font-weight: bold;
  padding: 0.5em;
  margin-top: 1em;
}

.id-card-container {
  display: block;
  width: 100%;
}

.card-container {
  width: 100%;
  height: 300px;
  border-radius: 10px;
  font-family: var(--font-body);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 500px;
}

.card-title {
  font-size: 16px;
  color: #babfc9;
  font-weight: bold;
}
.validity {
  font-size: 12px;
  color: #babfc9;
  font-weight: bold;
  text-align: center;
}
.card-input {
  font-size: 16px;
  color: #515a67;
  font-weight: bold;
}

.card-wrapper {
  width: 100%;
  height: 250px;
  background-color: #fff;
  background: linear-gradient(#f8f8f8, #fff);
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin: 1.5rem;
  display: flex;
}

.user-card {
  width: 50%;
  height: 100%;
  position: relative;
  background: linear-gradient(to top, var(--bg-official), #8f94fb);
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.general-information {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f8f8f8;
}

.user-photo {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(to top, var(--bg-official), #8f94fb);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-element {
  margin-left: 10px;
  margin-bottom: 15px;
}

.card-name {
  font-size: 1.5rem;
}

.college-name {
  font-size: 1.2rem;
}
</style>
