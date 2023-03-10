<template>
  <div>
    <b-navbar id="top" fixed="top">
      <b-navbar-brand href="#">
        <img
          :src="`/img/logo.png`"
          class="d-inline-block align-top"
          alt="Fresh Myanmar"
          width="50"
          height="50"
        />
      </b-navbar-brand>

      <form class="my-2 d-inline w-100" v-on:submit.prevent>
        <div class="form-group row justify-content-md-left">
          <div class="col-1 mr-2">
            <b-button v-b-toggle.sidebar-profile variant="outline-secondary" size="sm">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </b-button>
          </div>
          <div class="col-9 col-md-5 pl-3">
            <b-input
              type="text"
              v-model="searchText"
              :placeholder="searchTextHint"
              @change="$emit('changeSearchText', searchText)"
              class="form-control form-control-sm"
            />
          </div>
          <div class="col-1 pl-0">
            <button class="btn btn-outline-success btn-sm" @click="search">
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>

      <!-- <b-navbar-nav class="ml-auto">
        <b-link to="/login" v-if="!isLogin">Login</b-link>
        <b-link @click="logout" v-else>Logout</b-link>
      </b-navbar-nav>-->
    </b-navbar>
    <div
      @click="shoppingCard"
      class="shop-cart-icon"
      :class="isEmptyCart ? 'cart-icon-hide' : ''"
      v-if="showCart"
    >
      <i class="fa text-primary" style="font-size:23px">&#xf07a;</i>
      <span class="badge badge-danger" id="lblCartCount">{{ itemCount }}</span>
    </div>

    <b-sidebar
      id="sidebar-profile"
      title="Fresh Myanmar"
      text-variant="success"
      :backdrop-variant="variant"
      backdrop
      shadow
    >
      <!-- <b-navbar-nav class="ml-auto">
        <b-link to="/login" v-if="!isLogin">Login</b-link>
        <b-link @click="logout" v-else>Logout</b-link>
      </b-navbar-nav>-->
      <div class="px-1">
        <b-list-group>
          <b-list-group-item to="/login" v-if="!isLogin">
            {{ $t("accountLogin") }}
            <i class="fa fa-sign-in" aria-hidden="true"></i>
          </b-list-group-item>
          <b-list-group-item to="/login" v-else>
            {{ $t("myAccount") }}
            <i class="fa fa-sign-out" aria-hidden="true"></i>
          </b-list-group-item>
        </b-list-group>
        <br />
        <b-list-group>
          <b-list-group-item class="text-success" to="/home">
            {{ $t("home") }}
            <i class="fa fa-home" aria-hidden="true"></i>
          </b-list-group-item>
          <b-list-group-item class="text-success">
            {{ $t("profile") }}
            <i class="fa fa-user" aria-hidden="true"></i>
            <small>&nbsp;- comming soon</small>
          </b-list-group-item>
          <b-list-group-item class="text-success" to="/myOrder">
            {{ $t("myOrder") }}
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
          </b-list-group-item>
          <b-list-group-item class="text-success">
            {{ $t("about") }}
            <i class="fa fa-info-circle" aria-hidden="true"></i>
          </b-list-group-item>
          <b-list-group-item>{{ $t("termAndCondition") }}</b-list-group-item>
          <b-list-group-item>
            Language
            <br />
            <br />
            <b-button-group>
              <b-button
                :variant="language=='mm'?'secondary':'outline-secondary'"
                @click="changeLanguage('mm')"
              >မြန်မာ</b-button>
              <b-button
                :variant="language=='en'?'secondary':'outline-secondary'"
                @click="changeLanguage('en')"
              >English</b-button>
            </b-button-group>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "../config/index";

export default {
  name: "navbar",
  data() {
    return {
      variant: "dark",
      searchText: null,
      baseUrl: axios.defaults.baseURL
    };
  },
  props: {
    showCart: {
      required: false,
      default: true
    },
    searchTextHint: {
      required: false,
      default: ""
    }
  },
  computed: {
    ...mapGetters([
      "shoppingCart",
      "isLogin",
      "isEmptyCart",
      "itemCount",
      "language"
    ])
  },
  methods: {
    shoppingCard: function() {
      this.$router.push({ name: "Checkout" });
    },
    logout: function() {
      FB.logout(
        function(response) {
          this.$store.dispatch("app/logout", {});
        }.bind(this)
      );
    },
    search: function() {
      this.$router.push({
        path: "/item/search",
        query: { q: this.searchText }
      });
    },
    changeLanguage: function(language) {
      this.$store.dispatch("app/changeLanguage", language);
    }
  }
};
</script>

<style scoped>
.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}

.label-warning[href],
.badge-warning[href] {
  background-color: #c67605;
}
#lblCartCount {
  font-size: 12px;
  background: #ff0000;
  color: #fff;
  padding: 0 5px;
  vertical-align: top;
  margin-left: -10px;
}
.shop-cart-icon {
  z-index: 100;
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;

  background: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  border: solid 2px rgb(3, 212, 3);
  border-radius: 50px;
}
.shop-cart-icon:hover {
  cursor: pointer;
}
#top.navbar {
  background: rgb(236, 255, 228);
}
.cart-icon-hide{
  visibility: hidden;
}
</style>
