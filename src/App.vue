<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Cabin|Raleway&display=swap");
@import "~firebaseui/dist/firebaseui.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

nav#top {
  font-size: 0.9rem;
  &.navbar {
    background-color: #ececec;
  }
  .navbar-nav a {
    color: #555555;
    &:hover {
      text-decoration: none;
      color: #f31515;
    }
  }
}
.b-sidebar-body .list-group {
  text-align: center;
}

.container .text-muted{
  text-align: center;
  display: block;
}

body {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23b3f69e' fill-opacity='0.08'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E");
}

#app {
  // padding-top: 80px;
  margin-top: 80px;
  
}
// ::-webkit-scrollbar {
//   display: none;
// }

// ::-webkit-scrollbar {
//   width:10px;
// }

// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 1px rgba(3, 231, 79, 0.3);
//   border-radius: 5px;
// }

// ::-webkit-scrollbar-thumb {
//   border-radius: 5px;
//   -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
// }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
body {
  overflow-y: auto;
}
</style>

<script>
import axios from "./config/index";
import { mapGetters } from "vuex";

export default {
  mounted: function() {
    
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
    window.fbAsyncInit = function() {
      FB.init({
        appId: "3254483804579476",
        cookie: true,
        xfbml: true,
        version: "v6.0"
      });

      FB.AppEvents.logPageView();
      //this.checkLoginState();
    }.bind(this);
    axios.defaults.headers.common[
      "Authorization"
    ] = ` Bearer ${this.userToken}`;
  },
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  computed: {
    ...mapGetters(["userToken", "language"])
    // isLogin: function() {
    //   let token = this.$store.state.userAccount.password;
    //   if (token == "") {
    //     return false;
    //   } else {
    //     axios.defaults.headers.common["Authorization"] = ` Bearer ${token}`;
    //     return true;
    //   }
    // },
  },
  methods: {
    checkLoginState: function() {
      FB.getLoginStatus(
        function(response) {
          if (response.status === "connected") {
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            orderService.login(accessToken).then(data => {
              axios.defaults.headers.common[
                "Authorization"
              ] = ` Bearer ${data.userToken}`;
              this.$store.dispatch("app/login", data.userToken);
            });
          } else if (response.status === "not_authorized") {
            // The user hasn't authorized your application.  They
            // must click the Login button, or you must call FB.login
            // in response to a user gesture, to launch a login dialog.
            //this.$store.dispatch("app/logout", {});
          } else {
            // The user isn't logged in to Facebook. You can launch a
            // login dialog with a user gesture, but the user may have
            // to log in to Facebook before authorizing your application.
            //this.$store.dispatch("app/logout", {});
          }
        }.bind(this),
        { scope: "public_profile,email" }
      );
    }
  },
  watch: {
    language: {
      immediate: true,
      handler: function(value) {
        this.$i18n.locale = value;
      }
    }
  }
};
</script>
