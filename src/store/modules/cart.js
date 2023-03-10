import Vue from "vue";

const state = {
  shoppingCart: [],
};

const mutations = {
  ADD_ITEM: (
    state,
    item = {
      itemId: Number,
      itemName: String,
      unitName: String,
      unitId: Number,
      currency: String,
      price: Number,
      qty: Number,
    }
  ) => {
    let index = state.shoppingCart.findIndex((obj) => {
      if (obj.itemId == item.itemId && obj.unitName == item.unitName) {
        return true;
      }
      return false;
    });
    if (index == -1) {
      Vue.set(item, "qty", 1);
      state.shoppingCart.push(item);
    } else {
      let originItem = state.shoppingCart[index];
      originItem.qty += 1;
    }
  },
  REMOVE_ITEM: (state, index) => {
    state.shoppingCart = state.shoppingCart.filter((obj, i) => {
      if (i == index) return false;
      return true;
    });
  },
  CHANGE_QTY: (state, { index, qty }) => {
    let obj = state.shoppingCart[index];
    obj.qty = qty;
    Vue.set(state.shoppingCart, index, obj);
    //state.shoppingCart[index].qty = qty;
  },
  INC_QTY: (state, index) => {
    state.shoppingCart[index].qty++;
  },
  DEC_QTY: (state, index) => {
    state.shoppingCart[index].qty--;
  },
  REMOVE_ALL: (state) => {
    state.shoppingCart = state.shoppingCart.filter((v) => false);
  },
};

const actions = {
  addToCart({ commit }, item) {
    commit("ADD_ITEM", item);
  },
  removeFromCart({ commit }, index) {
    commit("REMOVE_ITEM", index);
  },
  changeQty({ commit }, { index, qty }) {
    commit("CHANGE_QTY", { index, qty });
  },
  incQty({ commit }, { index }) {
    commit("INC_QTY", index);
  },
  decQty({ commit }, { index }) {
    commit("DEC_QTY", index);
  },
  removeAll({ commit }) {
    commit("REMOVE_ALL");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
