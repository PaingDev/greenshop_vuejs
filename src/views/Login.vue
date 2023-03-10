<template>
  <div>
    <b-container>
      <div class="text-left mt-n5 mb-3">
        <i
          @click="$router.go(-1)"
          class="fa fa-home btn btn-outline-info"
          aria-hidden="true"
        ></i>
      </div>
      <fb-login />
      <b-row v-if="isLogin">
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FbLogin from "../components/FBLogin";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLogin"]),
  },
  components: {
    "fb-login": FbLogin,
  },
};
</script>
