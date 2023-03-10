const getters = {
  shoppingCart: (state) => state.cart.shoppingCart,
  userToken: (state) => state.app.userToken,
  isLogin: (state) => state.app.userToken != "",
  type: (state) => state.app.type,
  phoneNo: (state) => state.app.phoneNo,
  userName: (state) => state.app.userName,
  language: (state) => state.app.language,
  isEmptyCart: (state) => state.cart.shoppingCart.length == 0,
  itemCount: (state) => {
    let count = 0;
    for (let item of state.cart.shoppingCart) {
      count += Number(item.qty);
    }
    return count;
  },
};
export default getters;
