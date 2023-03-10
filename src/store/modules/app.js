import axios from "../../config/index.js";

const state = {
  userToken: "",
  type: "",
  phoneNo: "",
  userName: "",
  language: "en",
};

const mutations = {
  ADD_TOKEN: (state, data) => {
    state.userToken = data.userToken;
    state.type = data.type;
    state.phoneNo = data.phoneNo;
    state.userName = data.userName;
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.userToken}`;
  },
  REMOVE_TOKEN: (state, token) => {
    state.userToken = "";
    state.type = "";
    state.phoneNo = "";
    state.userName = "";
  },
  CHANGE_LANGUAGE: (state, lng) => {
    state.language = lng;
  },
};

const actions = {
  login({ commit }, token) {
    commit("ADD_TOKEN", token);
  },
  logout({ commit }) {
    commit("REMOVE_TOKEN");
  },
  changeLanguage({ commit }, language) {
    commit("CHANGE_LANGUAGE", language);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
