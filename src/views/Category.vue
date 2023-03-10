<template>
  <div>
    <navbar />
    <b-container fluid>
      <!-- <b-breadcrumb :items="navItem"></b-breadcrumb> -->
      <b-row class="justify-content-end pt-2" style="background:#F9F9F9">
        <b-col cols="4" class="d-none d-sm-block">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li
                class="breadcrumb-item"
                :class="item.active ? 'active' : ''"
                :aria-current="item.active ? 'page' : ''"
                v-for="(item, index) in navItem"
                :key="index"
              >
                <b-link v-if="!item.active" :href="item.href" :to="item.to">
                  {{ item.text }}
                </b-link>
                <template v-else>
                  {{
                    $t("categoryName", {
                      categoryName: category.categoryName,
                      categoryNameMm: category.categoryNameMm,
                    })
                  }}</template
                >
              </li>
            </ol>
          </nav>
        </b-col>
        <b-col cols="1" class="d-block d-sm-none"></b-col>
        <b-col cols="11" md="8">
          <filter-bar @sort="sort" />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="4"></b-col>
        <b-col cols="12" md="8">
          <b-row>
            <b-col>
              <div class="category-title">
                {{
                  $t("categoryName", {
                    categoryName: category.categoryName,
                    categoryNameMm: category.categoryNameMm,
                  })
                }}
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              cols="6"
              md="3"
              v-for="item in items"
              :key="item.itemId + item.unitName"
              class="mt-3 px-2"
            >
              <item-card :item="item" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import ItemCard from "@/components/ItemCard";
import itemService from "../service/ItemService";
import categoryService from "../service/CategoryService";
import FilterBar from "@/components/FilterBar";

export default {
  name: "Home",
  mounted: function() {
    //this.$route.params.id
  },
  data() {
    return {
      items: [],
      category: {
        categoryId: 0,
        categoryName: "",
      },
      categoryId: 0,
    };
  },
  i18n: {
    // `i18n` option, setup locale info for component
    messages: {
      en: { categoryName: "%{categoryName}", unitName: "%{categoryName}" },
      mm: { categoryName: "%{categoryNameMm}", unitName: "%{categoryNameMm}" },
    },
  },
  components: {
    navbar: Navbar,
    "item-card": ItemCard,
    "filter-bar": FilterBar,
  },
  methods: {
    loadItemByCategoryId: function() {
      itemService.getItemByCategoryId(this.categoryId).then((data) => {
        this.items = this.items.filter((v) => false);
        this.items.push(...data);
      });
    },
    loadCategoryById: function() {
      categoryService.getCategoryById(this.categoryId).then((data) => {
        this.category = data;
      });
    },
    sort: function(value) {
      itemService.getItemByCategoryId(this.categoryId, value).then((data) => {
        this.items = this.items.filter((v) => false);
        this.items.push(...data);
      });
    },
  },
  computed: {
    navItem: function() {
      let item = [
        {
          text: "Home",
          to: { name: "Home" },
        },
      ];
      let catId = this.category.categoryId;
      if (catId != 0) {
        item.push({
          text: this.category.categoryName,
          href: `/categories/${catId}`,
          active: true,
        });
      }
      return item;
    },
  },
  watch: {
    "$route.params.id": {
      handler: function(value) {
        this.categoryId = value;
        this.loadCategoryById();
        this.loadItemByCategoryId();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.shop-card-img img {
  object-fit: cover;
  object-position: 50% 50%;
  height: 180px;
}
.shop-card .card-body {
  padding: 0.3rem;
  font-weight: 800;
  font-family: "Raleway", sans-serif;
}
.shop-card .card:hover,
.shop-card .card:active {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
.item-price {
  color: red !important;
  font-weight: 200;
  font-family: "Cabin", sans-serif;
}
.category-title {
  color: red;
  text-align: left;
  padding: 10px;
  font-weight: 600;
  border-top: red solid 2px;
}
</style>
