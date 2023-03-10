<template>
  <div class="container">
    <b-navbar id="top" fixed="top">
      <b-navbar-brand>
        <i @click="$router.go(-1)" class="fa fa-chevron-left btn" aria-hidden="true"></i>
        &nbsp;Sign in with phone
      </b-navbar-brand>
    </b-navbar>

    <div class="row justify-content-center">
      <div class="col-12 col-md-5" v-if="platform == 'android'">
        <form>
        <div class="form-group" v-if="successPhoneNo == 'initial' || successPhoneNo == 'wrong'">
          
          <div class="input-group ">
           <div class="input-group-prepend">
          <div class="input-group-text ">+95</div>
          <input type="tel" v-model="phoneNo" class="form-control" id="phoneNo" placeholder="Phone No" pattern="[0-9]{*}" required/>
           </div>
        </div>
            
          
        </div>
        </form>
        <div class="col-12">
            <b-button size="md" block variant="success" @click="sendPhoneNo">
              <p class="h5">Verify Code <b-icon icon="arrow-right-circle" ></b-icon></p>
            </b-button>
          </div>
        <div v-if="successPhoneNo == 'wrong'">
          PhoneNo is wrong. please try again.
        </div>
        <div class="row " v-if="successPhoneNo != 'start' || successPhoneNo != 'success'">
          <div class="col-8 offset-2">
          <label for="verify">Enter Verification Code</label>
          <input type="text" id="verify" v-model="verifyCode" placeholder="Code" class="form-control"/> 
          <b-button variant="outline-success" class="mt-3" block @click="okClick">Ok</b-button>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5" v-else-if="platform == 'loading'">
      </div>
      <div class="col-12 col-md-5" v-else>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
    </div>
  </div>
</template>

<script>
//import phoneLogin from "../util/PhoneLoginUtil";

import orderService from "../service/OrderService";
import { Capacitor } from "@capacitor/core";
import { cfaSignInPhone, cfaSignInPhoneOnCodeSent,cfaSignInPhoneOnCodeReceived } from "capacitor-firebase-auth";
//const {cfaSignInPhone, cfaSignInPhoneOnCodeSent}, {cfaSignInPhoneOnCodeReceived} = () => import("capacitor-firebase-auth");

// import {
//   cfaSignInPhoneOnCodeSent,
//   cfaSignInPhoneOnCodeReceived
// } from "capacitor-firebase-auth";


export default {
  mounted: function() {
    this.$nextTick(()=>{
    this.platform = Capacitor.platform
    if (this.platform == "android") {
      // cfaSignIn('phone', {phone: '+959970074560'}).subscribe(
      // user => console.log(user.phoneNumber)
      // )
      // Android and iOS
      
         cfaSignInPhoneOnCodeSent().subscribe(
        verificationId => 
        {
          console.log('cfaSignInPhoneOnCodeSent' + verificationId)
          this.verificationId = verificationId
        }
        )
      // Android Only
      cfaSignInPhoneOnCodeReceived().subscribe(
        //
        event =>{
          console.log(
            `cfaOnCode Received : ${event.verificationId}:${event.verificationCode} : ${event}`
          )
          this.verifyCode = event.verificationCode
          const credential = firebase.auth.PhoneAuthProvider.credential(event.verificationId, event.verificationCode);
          firebase.auth().signInWithCredential(credential);
        }
      );
      
     
    } else {
      phoneLogin.phoneLoginDialog().then(token => {
        orderService.loginPhone(token).then(data => {
          this.$store.dispatch("app/login", data);
          this.$router.go(-1);
        });
      });
    }
    //end else
    })
  },
  data() {
    return {
      platform: 'loading',//Capacitor.platform
      phoneNo: "",
      successPhoneNo: 'initial',
      verifyCode: "",
      verificationId: ""
    };
  },
  methods: {
    sendPhoneNo: function(){
        
       cfaSignIn('phone', {phone: "+95"+this.phoneNo}).subscribe(
        user => {
          console.log('test' +user.phoneNumber)
          this.successPhoneNo = 'success'; 
        }
      )
      this.successPhoneNo = 'filled'; 
    },
    okClick: function(){
      const credential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.verifyCode);
      firebase.auth().signInWithCredential(credential);
       firebase
              .auth()
              .currentUser.getIdToken()
              .then((token) => {
                console.log("token" + token)
                 orderService.loginPhone(token).then(data => {
                  this.$store.dispatch("app/login", data);
                  this.$router.go(-1);
                });
              });
    }
  }
};
</script>

<style scoped></style>
