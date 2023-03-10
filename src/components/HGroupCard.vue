<template>
  <b-col cols="6" md="4" class="p-1">
    <b-card
    @click="$router.push({name:'CategoryList', params: { id:categoryDto.itemId }})"
        class="shop-card-img shop-card "
      :img-src="categoryDto.frontImg == null
        ? `${imgUrl}/items/no_image.jpg`
        : `${imgUrl}/items/${categoryDto.frontImg}`"
      img-alt="Card image"
      img-left
    >
      <b-card-text class="text-left">
          {{
        $t("itemName", {
        itemName: categoryDto.itemName,
        itemNameMm: categoryDto.itemNameMm,
        })
        }}
      </b-card-text>
    </b-card>
  </b-col>
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
    categoryDto: {
      itemId: Number,
      itemName: String,
      itemNameMm: String,
      frontImg: String
    },
  },
  i18n: {
    // `i18n` option, setup locale info for component
    messages: {
      en: { itemName: "%{itemName}", unitName: "%{itemName}" },
      mm: { itemName: "%{itemNameMm}", unitName: "%{itemNameMm}" },
    },
  },
};
</script>

<style scoped>
/* shop-card-img shop-card flex-row */

.shop-card-img img {
  padding: 5px;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: 50% 50%;
    object-position: 50% 50%;
    width: 100px;
    height: 100px;
}

.shop-card .card-body {
  padding: 0;
    font-weight: 800;
    font-size: 0.8rem;
    font-family: Raleway,sans-serif;
    -ms-flex-item-align: center;
    align-self: center;
}
</style>