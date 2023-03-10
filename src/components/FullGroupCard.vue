<template>
  <div class="col-12 col-md-3 p-1">
    <b-card
    @click="$router.push({name:'CategoryList', params: { id:item.itemId }})"
        class="shop-card-img shop-card "
     :img-src="
      item.frontImg == null
        ? `${imgUrl}/items/no_image.jpg`
        : `${imgUrl}/items/${item.frontImg}`
    "
      img-alt="Card image"
      img-left
    >
      <b-card-text class="text-left">
         {{
      $t("itemName", {
      itemName: item.itemName,
      itemNameMm: item.itemNameMm,
      })
      }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "../config/index";

export default {
  data() {
    return {
      imgUrl: axios.defaults.baseURL,
    };
  },
  props: {
    title: String,
    item: {
      itemId: Number,
      itemName: String,
      itemNameMm: String,
      frontImg: String,
      backImg: String
    }
  },
  i18n: {
    // `i18n` option, setup locale info for component
    messages: {
      en: { itemName: "%{itemName}", unitName: "%{unitName}" },
      mm: { itemName: "%{itemNameMm}", unitName: "%{unitNameMm}" }
    }
  },
};
</script>

<style scoped>
/* shop-card-img shop-card flex-row */

.shop-card-img img {
  padding: 10px;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: 50% 50%;
    object-position: 50% 50%;
    width: 100px;
    height: 100px;
}

.shop-card .card-body {
  padding: 0;
  font-size: 0.9em;
    font-weight: 800;
    font-family: Raleway,sans-serif;
    -ms-flex-item-align: center;
    align-self: center;
}
</style>