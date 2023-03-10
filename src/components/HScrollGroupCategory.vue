<template>
  <div class="row no-gutters">
    <div class="col-10 text-left">
      <h6 class="font-weight-bold">
        {{$t('mainCategory')}}
      </h6>
    </div>
    <div class="col-2">
      <b-link :to="`/groupCategoryList`">
        {{$t('more')}}
        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
      </b-link>
    </div>
    <div class="col-12">
      <vue-scroll :ops="ops" class="pb-2">
        <div class="row flex-nowrap m-n1">
          <template v-for="item in listSaleItemDto">
            <!-- <div class="col-4 col-md-2 p-1" > -->
              <!-- <small-item-card :item="item" /> -->
              <group-card :item="item" :key="item.itemId"/>
            <!-- </div> -->
          </template>
        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import GroupCard from "../components/GroupCard";

export default {
  data() {
    return {
      ops: {
        vuescroll: {
          sizeStrategy: "percent",
          detectResize: true
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: true,
          scrollingY: false,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: "right"
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: true,
          background: "#2BB46E",
          opacity: 0.5,
          hoverStyle: true,
          specifyBorderRadius: false,
          minSize: 0.1,
          size: "2px",
          disable: false
        },
        rail: {
          background: "#EEF3E1",
          opacity: 0,
          size: "1px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "2px",
          keepShow: false
        }
      }
    };
  },
  props: {
    title: String,
    groupCategoryDto: {
      groupCategoryId: Number,
      groupCategoryName: String,
      groupCategoryNameMm: String
    },
    listSaleItemDto: {
      type: Array,
      default: function() {
        return [
          {
            itemId: Number,
            itemName: String,
            itemNameMm: String,
            price: Number,
            currency: Number,
            unitName: String,
            unitNameMm: String,
            unitId: Number,
            date: String,
            frontImg: String,
            backImg: String
          }
        ];
      }
    }
  },
  i18n: {
    // `i18n` option, setup locale info for component
    // messages: {
    //   en: { groupCategoryName: "%{groupCategoryName}" },
    //   mm: { groupCategoryName: "%{groupCategoryNameMm}"}
    // }
  },
  components: {
    //"small-item-card": SmallItemCard
    'group-card': GroupCard
  }
};
</script>

<style scoped></style>
