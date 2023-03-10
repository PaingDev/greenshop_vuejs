import "@babel/polyfill";
import "mutationobserver-shim";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "font-awesome/scss/font-awesome.scss";

import "./custom.scss";
import "./plugins/element.js";
import { i18n } from "./plugins/i18n.js";
import vuescroll from "vuescroll";

import { Plugins, AppState } from '@capacitor/core';
//const { SplashScreen } = Plugins

//import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap-vue/dist/bootstrap-vue.css";
Plugins.App.addListener('backButton', (state) => {
  // state.isActive contains the active state
  let numberOfEntries = window.history.length
  const path = window.location.hash;
  //console.log('App state changed. Is active?', state.url);
  
  if("#/home" == path || "#/" == path){
    Plugins.App.exitApp();
  }else{
    router.go(-1) 
  }
  //Plugins.App.exitApp();
});


Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(vuescroll, {
  name: "vue-scroll",
});

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
  mounted() {
     //SplashScreen.hide()
  }
}).$mount("#app");

