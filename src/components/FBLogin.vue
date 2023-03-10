<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col col-md-7 col-lg-4">
        <h5 class="product-title" v-if="!isLogin" v-html="$t('freshText')"></h5>
        <h5 v-else>Logout ထွက်မှာ သေချာပါသလား။</h5>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col col-md-5 col-lg-3">
        <img :src="`${baseUrl}/img/fresh_bg.png`" class="img-fluid" alt="Fresh Myanmar" />
      </div>
    </div>
    <template v-if="!isLogin">
      <div class="row justify-content-md-center">
        <div class="col col-lg-3 my-1">
          <a class="btn btn-social btn-facebook btn-block" @click="login" v-if="!isLogin">
            <span class="fa fa-facebook"></span> Sign in with Facebook
          </a>
          <a class="btn btn-social btn-facebook btn-block" v-else @click="logout">
            <span class="fa fa-facebook"></span> Logout
          </a>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col col-md-6 col-lg-3 my-1">
          <b-link class="btn btn-social btn-block btn-phone" to="/phoneLogin">
            <i class="fa fa-phone" aria-hidden="true"></i>Sign in with Phone
          </b-link>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row justify-content-md-center">
        <div class="col col-md-3 my-1">
          <b-link class="btn btn-social btn-block btn-logout" @click="logout">
            <i class="fa fa-sign-out" aria-hidden="true"></i>Logout
          </b-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import orderService from "../service/OrderService";
import { mapGetters } from "vuex";
import axios from "../config/index";
import { Capacitor, Plugins } from "@capacitor/core";
import { FacebookLoginResponse } from "@capacitor-community/facebook-login";
const { FacebookLogin } = Plugins;

export default {
  mounted: function () {
    console.log("Capacitor FbLogin" + Capacitor.isNative);
    if (Capacitor.isNative) {
      this.platform = "native";
    } else {
      this.platform = "web";
      window.fbAsyncInit = function () {
        FB.init({
          appId: "3254483804579476",
          cookie: true,
          xfbml: true,
          version: "v6.0",
        });

        this.checkLoginState();
      }.bind(this);
    }
  },
  data() {
    return {
      baseUrl: axios.defaults.baseURL,
      platform: "loading",
    };
  },
  computed: {
    ...mapGetters(["userToken", "isLogin", "type"]),
  },
  methods: {
    async login(){
      if (this.platform == "native") {
        const FACEBOOK_PERMISSIONS = ["email", "public_profile"];
        // FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS }).then(
        //   result => {
        //     console.log("Result : " +result);
        //     if (result.accessToken) {
        //     // Login successful.
        //     console.log(`Facebook access token is ${result.accessToken.token}`);
        //     orderService.login(result.accessToken.token).then((data) => {
        //         axios.defaults.headers.common[
        //           "Authorization"
        //         ] = ` Bearer ${data.userToken}`;
        //         this.$store.dispatch("app/login", data);
        //       });
        //   } else {
        //     // Cancelled by user.
        //   }
        //   }
        // ).catch(e => {
        //   console.log("Error " +e);
        // })
        const result = await FacebookLogin.getCurrentAccessToken();

          if (result.accessToken) {
            console.log(`Facebook access token is ${result.accessToken.token}`);
            orderService.login(result.accessToken.token).then((data) => {
                    axios.defaults.headers.common[
                      "Authorization"
                    ] = ` Bearer ${data.userToken}`;
                    this.$store.dispatch("app/login", data);
            });
          } else {
            FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS }).then(
              result => {
                console.log("Result : " +result);
                if (result.accessToken) {
                // Login successful.
                console.log(`Facebook access token is else ${result.accessToken.token}`);
                orderService.login(result.accessToken.token).then((data) => {
                    axios.defaults.headers.common[
                      "Authorization"
                    ] = ` Bearer ${data.userToken}`;
                    this.$store.dispatch("app/login", data);
            });
                
                } else {
                  // Cancelled by user.
                }
                }
            ).catch(e => {
              console.log("Error " +e);
            })
            
          }
        
      } else {
        FB.login(
          function (response) {
            if (response.status == "unknown") {
              //auth.accessToken
              //userID
            } else if (response.status == "connected") {
              let auth = response.authResponse;

              orderService.login(auth.accessToken).then((data) => {
                axios.defaults.headers.common[
                  "Authorization"
                ] = ` Bearer ${data.userToken}`;
                this.$store.dispatch("app/login", data);
              });
            } else if (response.status == "not_authorized") {
            }
          }.bind(this),
          { scope: "public_profile,email" }
        );
      }
    },
    logout: function () {
      if (this.type == "phone") {
        this.$store.dispatch("app/logout", {});
      } else {
        this.$store.dispatch("app/logout", {});
        FB.logout(function (response) {}.bind(this));
      }
    },
    checkLoginState: function () {
      FB.getLoginStatus(
        function (response) {
          if (response.status === "connected") {
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            orderService.login(accessToken).then((data) => {
              axios.defaults.headers.common[
                "Authorization"
              ] = ` Bearer ${data.userToken}`;
              this.$store.dispatch("app/login", data.userToken);
            });
          } else if (response.status === "not_authorized") {
            // The user hasn't authorized your application.  They
            // must click the Login button, or you must call FB.login
            // in response to a user gesture, to launch a login dialog.
            // this.$store.dispatch("app/logout", {});
          } else {
            // The user isn't logged in to Facebook. You can launch a
            // login dialog with a user gesture, but the user may have
            // to log in to Facebook before authorizing your application.
            // this.$store.dispatch("app/logout", {});
          }
        }.bind(this),
        { scope: "public_profile,email" }
      );
    },
    fbInfo: function () {
      FB.api("/me", function (response) {
        console.log(response);
      });
    },
  },
};
</script>

<style scoped>
@import "~bootstrap-social/bootstrap-social.css";

.btn-facebook {
  color: white !important;
}
.btn-phone {
  color: white !important;
  background: #02bd7e;
}
.btn-logout {
  color: white !important;
  background: red;
}
</style>
<style>
.product-title {
  line-height: 1.7rem;
}
.product-title b.green {
  color: #73c40f;
}
.product-title b.red {
  color: #ce380d;
}
</style>
