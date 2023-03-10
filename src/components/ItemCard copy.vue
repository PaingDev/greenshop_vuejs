<template>
  <b-card
    ref="cart"
    deck
    :img-src="
      item.frontImg == null
        ? `${imgUrl}/items/no_image.jpg`
        : `${imgUrl}/items/${item.frontImg}`
    "
    class="text-left shop-card-img shop-card card-highlight m-0"
    img-top
  >
    <b-card-text>
      {{
      $t("itemName", {
      itemName: item.itemName,
      itemNameMm: item.itemNameMm,
      })
      }}
    </b-card-text>
    <b-card-text class="small text-muted item-price">
      {{
      $t("unitName", {
      unitName: item.unitName,
      unitNameMm: item.unitNameMm,
      })
      }}
      - {{ item.currency }} {{ item.price }}
    </b-card-text>
    <button class="btn btn-sm btn-outline-primary" @click="addToCart(item)">
      <i class="fa fa-cart-plus" aria-hidden="true"></i>
      {{ $t("addToCart") }}
    </button>
    <!-- <button class="btn btn-sm btn-outline-danger" @click="addToCart(item)">
      <i class="fa fa-minus" aria-hidden="true"></i>
    </button>-->
  </b-card>
</template>

<script>
import axios from "../config/index";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      animate: false,
      imgUrl: axios.defaults.baseURL
    };
  },
  computed: {
    ...mapGetters(["language"])
  },
  i18n: {
    // `i18n` option, setup locale info for component
    messages: {
      en: { itemName: "%{itemName}", unitName: "%{unitName}" },
      mm: { itemName: "%{itemNameMm}", unitName: "%{unitNameMm}" }
    }
  },
  props: {
    item: {
      itemId: Number,
      itemName: String,
      itemNameMm: String,
      unitName: String,
      unitNameMm: String,
      currency: String,
      price: Number,
      frontImg: String,
      backImg: String
    }
  },
  methods: {
    addToCart: function(item) {
      this.animate = true;
      let cart = $(".shop-cart-icon");
      let itemCard = $(this.$refs.cart.getElementsByTagName("img")[0]);

      var imgclone = itemCard
        .clone()
        .offset({
          top: itemCard.offset().top,
          left: itemCard.offset().left
        })
        .css({
          opacity: "0.8",
          position: "absolute",
          height: "150px",
          width: "150px",
          "z-index": "100"
        })
        .appendTo($("body"))
        .animate(
          {
            top: cart.offset().top,
            left: cart.offset().left,
            width: 65,
            height: 65
          },
          1000,
          "easeInOutExpo"
        );

      setTimeout(function() {
        cart.effect(
          "shake",
          {
            times: 2
          },
          200
        );
      }, 1500);

      imgclone.animate(
        {
          width: 0,
          height: 0
        },
        function() {
          $(this).detach();
        }
      );
      let left = this.$refs.cart.getBoundingClientRect().left;
      let top = this.$refs.cart.getBoundingClientRect().top;

      this.$store.dispatch("cart/addToCart", item);
    }
  }
};
</script>
<style scoped>
.shop-card-img img {
  object-fit: cover;
  object-position: 50% 50%;
}
.shop-card .card-body {
  padding: 0.3rem;
  font-weight: 800;
  font-family: "Raleway", sans-serif;
}

.shop-card:hover,
.shop-card:active {
  transition-duration: 0.4s;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
.item-price {
  color: red !important;
  font-weight: 200;
  font-family: "Cabin", sans-serif;
}

.card-body {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem !important;
}
.card-highlight .card-body .card-text {
  opacity: 0.8;
  color: black;
  background: #f6f6f6;
  padding: 2px;
  margin: 2px;
}

.shop-card:hover .card-text {
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
  -moz-transition: opacity 0.25s ease-in-out;
  -webkit-transition: opacity 0.25s ease-in-out;
}

.shop-card:hover img {
  transform-origin: center;
  transition-duration: 2s;
  transform: scale(1.2);
}

.add-to-cart {
  /* transform: translate(0px, 150px); */
}
</style>
