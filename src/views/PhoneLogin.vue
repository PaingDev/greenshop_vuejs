<template>
  <div class="container">
    <b-navbar id="top" fixed="top">
      <b-navbar-brand>
        <i @click="$router.go(-1)" class="fa fa-chevron-left btn" aria-hidden="true"></i>
        &nbsp;Sign in with phone
      </b-navbar-brand>
    </b-navbar>

    <div class="row justify-content-center" v-if="platform == 'native'">
      <div class="col-12 col-md-5">
        <b-card title="Enter your phone number" v-if="stage == 'phone'">
          <hr />
          <b-card-body class="text-right">
           <b-card-text class="mb-5">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">+95</div>
                <input
                  type="tel"
                  v-model="phoneNo"
                  class="form-control"
                  id="phoneNo"
                  placeholder="Phone No"
                  pattern="[0-9]{*}"
                  required
                />
              </div>
            </div>
          </div>
           </b-card-text>
            <b-button variant="outline-danger" size="sm" class="mx-1" @click="$router.go(-1)">CLOSE</b-button>
            <b-button variant="success" size="sm" class="mx-1" @click="sendPhoneNo">VERIFY</b-button>
          </b-card-body>
        </b-card>
        <b-card title="Verify your phone number" v-else-if="stage == 'code'">
          <hr />
          <b-card-body class="text-right">
            <b-card-text class="mb-5 text-left">
              Enter the 6-digit code we sent to
              <br><span class="text-primary">+95 {{this.successPhoneNo}}</span>
              <b-form-input class="mt-2" v-model="code" placeholder="6-digit code" type="number" ></b-form-input>
              
            </b-card-text>
            <b-button variant="outline-danger" size="sm" class="mx-1" @click="stage='phone'">CANCEL</b-button>
            <b-button variant="success" size="sm" class="mx-1" ref="btnAuth" @click="authenticate">CONTINUE</b-button>
          </b-card-body>
        </b-card>
      </div>
    </div>
    <div class="row justify-content-center" v-else-if="platform == 'loading'">
      <div>Loading...</div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-12 col-md-5">
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
    </div>
  </div>
</template>

<script>
import phoneLogin from "../util/PhoneLoginUtil";

import orderService from "../service/OrderService";
import { Capacitor } from "@capacitor/core";
import firebase from "firebase/app";
import "firebase/auth";
//import { cfaSignInPhoneOnCodeSent,cfaSignInPhoneOnCodeReceived } from "capacitor-firebase-auth";
//const {cfaSignInPhone, cfaSignInPhoneOnCodeSent}, {cfaSignInPhoneOnCodeReceived} = () => import("capacitor-firebase-auth");



export default {
  mounted: function () {
    console.log("Capacitor Platform " +Capacitor.isNative)
    if (Capacitor.isNative) {
      this.platform = "native"
    } else {
      this.platform = "web"
      this.$nextTick(()=>{
         phoneLogin.phoneLoginDialog().then((token) => {
          orderService.loginPhone(token).then((data) => {
            this.$store.dispatch("app/login", data);
            this.$router.go(-1);
          });
        });
      })
      
      //end else
    }
    
  },
  data() {
    return {
      platform: "loading", //Capacitor.platform
      stage: "phone",
      phoneNo: "",
      code: "",
      verificationId: "",
      successPhoneNo: ""
    };
  },
  methods: {
    sendPhoneNo: function () {
      this.platform = "loading";
      phoneLogin.sendPhone(this.phoneNo, this.loginStage);
      //this.loginStage("code", "0993000");
      // cfaSignIn("phone", { phone: "+95" + this.phoneNo }).subscribe((user) => {
      //   console.log("test" + user.phoneNumber);
      //   this.successPhoneNo = "success";
      // });
      // this.successPhoneNo = "filled";
    },
    loginStage(stage, message){
      console.log("LoginStage" + stage + message);
      if(stage == 'phone' || stage== 'verification'){
        this.platform = "native";
        this.stage = 'code';
        this.successPhoneNo = this.phoneNo;
      }else if(stage == 'code'){
        this.platform = "native";
        this.stage = 'code';
        this.verificationId = message.verificationId;
        this.code = message.verificationCode;
        //this.$refs.btnAuth.click(); 
        //this.$nextTick(()=>{          
                   
        //})
         firebase
        .auth()
        .currentUser.getIdToken()
        .then((token) => {        
          orderService.loginPhone(token).then((data) => {          
            this.$store.dispatch("app/login", data);
            this.$router.go(-1);
          });
        });
      }
    },
    authenticate: function () {
      console.log("Authenticate With Code")
      const credential = firebase.auth.PhoneAuthProvider.credential(
        this.verificationId,
        this.code
      );
      firebase.auth().signInWithCredential(credential);

        firebase
        .auth()
        .currentUser.getIdToken()
        .then((token) => {
          console.log("token " + token);
          
          orderService.loginPhone(token).then((data) => {
            this.$store.dispatch("app/login", data);
            this.$router.go(-1);
          });
        });
       
      

      
    },
  },
};
</script>

<style scoped></style>
