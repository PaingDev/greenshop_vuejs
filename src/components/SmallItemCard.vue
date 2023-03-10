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
    <b-card-text v-if="item.discountPrice!=0" class="small discount">
      MMK {{item.price+item.discountPrice}}
    </b-card-text>
    <template v-slot:footer>
      <button class="btn btn-sm btn-block btn-outline-fresh " @click="addToCart(item)">
        <small>
          <i class="fa fa-cart-plus" aria-hidden="true"></i>
          {{ $t("addToCart") }}
        </small>
      </button>
    </template>
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
      discountPrice: Number,
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
          height: "100px",
          width: "100px",
          "z-index": "100"
        })
        .appendTo($("body"))
        .animate(
          {
            top: cart.offset().top,
            left: cart.offset().left,
            width: 10,
            height: 10
          },
          1000,
          "easeInOutExpo"
        );

      setTimeout(function() {
        cart.effect(
          "shake",
          {
            distance: 15,
            times: 2
          },
          
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
  transform: scale(0.5) translate(0px, 30%);
}
.shop-card .card-body {
  padding: 0.2rem;
  font-weight: 800;
  font-family: "Raleway", sans-serif;
  
}
.card-body {
  position: absolute;
  font-size: 0.8em;
  left: 0;
  right: 0;
  padding: 2px !important;
}

.shop-card:hover,
.shop-card:active {
  transition-duration: 0.4s;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
.item-price {
  color: #00a651 !important;
  font-size: 0.8em;
  font-weight: 600;
  font-family: "Cabin", sans-serif;
}

.discount {
  color: rgb(255, 0, 0) !important;
  text-decoration: line-through;
  font-family: "Cabin", sans-serif;
}

.card-highlight .card-body .card-text {
  opacity: 0.8;
  color: black;
  background: #f6f6f6;
  padding: 1px;
  margin: 2px;
}

.shop-card:hover .card-text {
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
  -moz-transition: opacity 0.25s ease-in-out;
  -webkit-transition: opacity 0.25s ease-in-out;
}

.shop-card:hover img {
  object-position: 50% 50%;
  transform-origin: center;
  transition-duration: 2s;
  transform: scale(1.2);
}

.shop-card .card-footer {
  padding: 0;
}
.shop-card .card-footer button {
  /* font-size: 0.8em !important; */
}

.btn-outline-fresh{
  font-size: 0.8em !important;
  color: #00a651;
  border-color: #00a651;
  border-radius: 30px;
}
.card-img-top{
  min-height: 150px;
}
.add-to-cart {
  /* transform: translate(0px, 150px); */
}
</style>
