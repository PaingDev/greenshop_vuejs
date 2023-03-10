import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Default",
    redirect: { name: "Home" },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/categories/:id",
    name: "Category",
    component: () =>
      import(/* webpackChunkName: "category" */ "../views/Category.vue"),
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () =>
      import(/* webpackChunkName: "checkout" */ "../views/Checkout.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/item/search",
    name: "ItemSearch",
    component: () =>
      import(/* webpackChunkName: "itemsearch" */ "../views/ItemSearch.vue"),
  },
  {
    path: "/myOrder",
    name: "MyOrder",
    component: () =>
      import(/* webpackChunkName: "myorder" */ "../views/MyOrder.vue"),
  },
  {
    path: "/phoneLogin",
    name: "PhoneLogin",
    component: () =>
      import(/* webpackChunkName: "phoneLogin" */ "../views/PhoneLogin.vue"),
  },
  {
    path: "/categoryList/:id",
    name: "CategoryList",
    component: () =>
      import(/* webpackChunkName: "category-list" */ "../views/CategoryList.vue"),
  },
  {
    path: "/groupCategoryList",
    name: "GroupCategoryList",
    component: () =>
      import(/* webpackChunkName: "category-list" */ "../views/GroupCategoryList.vue"),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  routes,
});

export default router;
