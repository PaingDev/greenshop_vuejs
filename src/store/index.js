import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters";
import app from "./modules/app";
import cart from "./modules/cart";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: {
    app,
    cart,
  },
  getters,
  plugins: [vuexLocal.plugin],
});
