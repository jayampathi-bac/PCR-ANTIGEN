<!--<template>-->
<!--  <div v-if="!joined" class="parent-container">-->
<!--    <div class="name-container">-->
<!--      <input type="text" class="user-name" v-model="currentUser" />-->
<!--      <button class="join-button" v-on:click="sendMessage">Join </button>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div v-if="joined">-->
<!--    <div class="list-container">-->
<!--      <div v-for="message in messages" :key="message.id">-->
<!--        <b>-->
<!--          {{ message.user }}-->
<!--        </b>-->
<!--        : {{ message.text }}-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="text-input-container">-->
<!--      <textarea-->
<!--        v-model="text"-->
<!--        class="text-message"-->
<!--        v-on:keyup.enter="sendMessage"-->
<!--      ></textarea>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// import io from "socket.io-client";-->
<!--// import { io } from "socket.io";-->
<!--// import io from 'socket.io-client'-->
<!--//var socket = io('http://localhost:9092/chat');-->
<!--// import VueNativeSock from "vue-native-websocket-vue3";-->
<!--// (VueNativeSock,"ws://localhost:8080/webSocket");-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      joined: false,-->
<!--      currentUser: "",-->
<!--      text: "",-->
<!--      messages: [],-->
<!--      connection: null-->
<!--    };-->
<!--  },-->
<!--  created: function() {-->
<!--    console.log("Starting connection to WebSocket Server")-->
<!--    this.connection = new WebSocket("wss://app.jvpdtest.com/customer/webSocket")-->

<!--    this.connection.onmessage = function(event) {-->
<!--      console.log("response came")-->
<!--      console.log(event.data);-->
<!--      if(event.data == "already exists"){-->
<!--        console.log(event.data);-->
<!--      }else{-->
<!--        var myObj = JSON.parse(event.data);-->
<!--        console.log(myObj);-->
<!--      }-->

<!--    }-->

<!--    this.connection.onopen = function(event) {-->
<!--      console.log(event)-->
<!--      console.log("Successfully connected to the echo websocket server...")-->
<!--    }-->
<!--    this.$options.sockets.onmessage = (res) => {-->
<!--      console.log(res);-->
<!--    }-->

<!--  },-->
<!--  methods: {-->
<!--    sendMessage: function() {-->
<!--      console.log(this.connection);-->
<!--      this.connection.send('{"contact_number": "0998765434","branch_id":"1"}');-->
<!--    },-->

<!--  },-->


<!--  name: "ChatApp",-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.parent-container {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  position: fixed;-->
<!--  padding-top: 150px;-->
<!--}-->

<!--.name-container {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  width: 200px;-->
<!--}-->

<!--.user-name {-->
<!--  height: 30px;-->
<!--  font-size: 20px;-->
<!--  padding: 5px;-->
<!--  margin-bottom: 5px;-->
<!--  text-align: center;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.join-button {-->
<!--  height: 30px;-->
<!--  font-size: 20px;-->
<!--}-->

<!--.text-input-container {-->
<!--  height: 100vh;-->
<!--}-->

<!--.text-message {-->
<!--  width: 100%;-->
<!--  position: absolute;-->
<!--  bottom: 0px;-->
<!--  height: 70px;-->
<!--  padding: 10px;-->
<!--  box-sizing: border-box;-->
<!--}-->
<!--</style>-->
