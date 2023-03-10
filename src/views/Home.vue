<template>
  <b-container fluid >
    <b-row>
      <b-col cols="12">
        <navbar ref="nav" />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
      <div
        class="loadingView"
        v-infinite-scroll="loadAllItem"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <!-- <b-navbar toggleable type="light" variant="light" class="d-md-none mx-n3">
          <b-navbar-brand href="#">{{ $t("category") }}</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav align="left">
              <b-nav-item
                class="text-left"
                :to="`/categories/${category.categoryId}`"
                v-for="category in categories"
                :key="category.categoryId"
              >
                {{
                $t("categoryName", {
                categoryName: category.categoryName,
                categoryNameMm: category.categoryNameMm,
                })
                }}
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
          </b-navbar>-->

        <b-row class="justify-content-md-center" no-gutters>
          <b-col cols="4" class="d-none d-sm-block">
            <b-navbar-nav align="left">
              <b-nav-item
                class="text-left"
                :to="`/categories/${category.categoryId}`"
                v-for="category in categories"
                :key="category.categoryId"
              >
                {{
                  $t("categoryName", {
                    categoryName: category.categoryName,
                    categoryNameMm: category.categoryNameMm,
                  })
                }}
              </b-nav-item>
            </b-navbar-nav>
          </b-col>
          <b-col cols="12" md="8">
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              img-width="1024"
              img-height="420"
              background="#ababab"
              class="mx-n3 mb-2"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <b-carousel-slide
                v-for="slideImg in slideImages"
                :key="slideImg.slideImageId"
                :img-src="`${imgUrl}/items/${slideImg.img}`"
              ></b-carousel-slide>
            </b-carousel>

            <template v-for="(spItem, index) of listSpecialCategory">
              <horizontal-category
                v-if="spItem.title == 'category'"
                :title="spItem.title"
                :categoryDto="spItem.categoryDto"
                :listSaleItemDto="spItem.listSaleItemDto"
                :key="index"
              />
              <!-- <horizontal-group-category
                  v-else
                  :key="index"
                  :title="spItem.title"
                  :groupCategoryDto="spItem.groupCategoryDto"
                  :listSaleItemDto="spItem.listSaleItemDto"
                />-->

              <h-scroll-group-category
                v-else
                :key="index"
                :title="spItem.title"
                :groupCategoryDto="spItem.groupCategoryDto"
                :listSaleItemDto="spItem.listSaleItemDto"
              />
            </template>

            <b-row>
              <b-col
                cols="6"
                md="3"
                class="mt-2 px-1"
                v-for="(item, index) in items"
                :key="index"
              >
                <item-card :item="item" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row v-if="busy" class="justify-content-center" no-gutters>
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </b-row>
      </div>
      </b-col>
    </b-row>
    <!-- <fix-footer></fix-footer> -->
  </b-container>
</template>

<script>
import Navbar from "@/components/Navbar";
import FixFooter from "@/components/FixFooter";
import ItemCard from "@/components/ItemCard";
import itemService from "../service/ItemService";
import categoryService from "../service/CategoryService";
import FilterBar from "@/components/FilterBar";
import HorizontalCategory from "@/components/HorizontalCategory";
import groupCard from "@/components/GroupCard";
//import HorizontalGroupCategory from "@/components/HorizontalGroupCategory.vue";
import HScrollGroupCategory from "@/components/HScrollGroupCategory.vue";

import slideImageService from "../service/SlideImageService";
import axios from "../config/index";
import debounce from "lodash/debounce";
import infiniteScroll from "vue-infinite-scroll";
// new Vue({
//   directives: {infiniteScroll}
// })

let app = document.querySelector(".loadingView");

export default {
  name: "Home",
  created: function () {
    //this.debounceLoadItem = debounce(this.loadAllItem, 300);
  },
  mounted: function () {
    // this.loadAllCategory();
    // this.loadAllItem();
    //this.loadSpecialCategory();
    //this.loadSpecialCategory();
    this.loadAllCategory();
    this.loadSlideImage();

    // window.onscroll = () => {
    //   let bottomOfWindow =
    //     document.documentElement.scrollTop + window.innerHeight ===
    //     document.documentElement.offsetHeight;
    //   console.log("OnScroll")
    //   if (bottomOfWindow) {
    //     // Do something, anything!
    //     this.debounceLoadItem();
    //   }
    // };
  },
  data() {
    return {
      listSpecialCategory: [],
      items: [],
      categories: [],
      page: 0,
      pageSize: 10,
      loading: false,
      noItem: false,
      ops: {
        vuescroll: {
          sizeStrategy: "percent",
          detectResize: true,
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 800,
          easing: undefined,
        },
      },
      slideImages: [],
      slide: 0,
      imgUrl: axios.defaults.baseURL,
      busy: false,
    };
  },
  i18n: {
    // `i18n` option, setup locale info for component
    messages: {
      en: { categoryName: "%{categoryName}", unitName: "%{categoryName}" },
      mm: { categoryName: "%{categoryNameMm}", unitName: "%{categoryNameMm}" },
    },
  },
  directives: {
    "infinite-scroll": infiniteScroll,
  },
  components: {
    navbar: Navbar,
    "item-card": ItemCard,
    "fix-footer": FixFooter,
    "filter-bar": FilterBar,
    "horizontal-category": HorizontalCategory,
    "group-card": groupCard,
    //"horizontal-group-category": HorizontalGroupCategory,
    "h-scroll-group-category": HScrollGroupCategory,
  },
  methods: {
    loadAllItem: function () {
      this.busy = true;
      //if (!this.loading) {
      // this.loading = true;
      setTimeout(() => {
        var app = document.querySelector(".loadingView");
        var height = app.clientHeight;
        app.style.height = height + 300 + "px";

        itemService.getAllItem(this.page, this.pageSize).then((data) => {
          if (data.length == 0) {
            this.noItem = true;
          } else {
            this.items.push(...data);
            this.page += 1;
            this.busy = false;
          }
          //this.loading = false;
        });
      }, 1000);
      // }
    },
    loadAllCategory: function () {
      categoryService.getAllCategory().then((data) => {
        this.categories.push(...data);
      });
    },
    load: function () {
      //console.log("Load Outside");
      this.busy = true;

      //if (this.listSpecialCategory.length != 0) {
      console.log("Load Inside");
      //setTimeout(() => {
      this.loadAllItem();
      //}, 10);
      //}
      //
    },
    loadSpecialCategory: function () {
      itemService.loadSpecialCategory().then((data) => {
        this.listSpecialCategory = this.listSpecialCategory.filter(
          (v) => false
        );
        this.listSpecialCategory.push(...data);
        //this.loadAllItem();
      });
    },
    onSlideStart: function () {},
    onSlideEnd: function () {},
    loadSlideImage: function () {
      slideImageService.getAllSlideImage().then((data) => {
        this.slideImages = this.slideImages.filter((f) => false);
        this.slideImages.push(...data);
      });
    },
  },
  watch: {
    $router: {
      handler: function () {
        this.loadSpecialCategory();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
/* .loadingView {
  margin-bottom: 20px;
} */
</style>
