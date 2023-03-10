<template>
<div>
 <navbar />
 <b-container fluid>
  <b-row class="justify-content-md-center">
    <b-col cols="12" md="8">
        <template v-for="(spItem, index) of listSpecialCategory">
          <horizontal-category
            v-if="spItem.title == 'category'"
            :title="spItem.title"
            :categoryDto="spItem.categoryDto"
            :listSaleItemDto="spItem.listSaleItemDto"
            :key="index"
          />
        </template>
    </b-col>
  </b-row>
 </b-container>
</div>
</template>

<script>
import Navbar from "@/components/Navbar";
import HorizontalCategory from "@/components/HorizontalCategory";
import groupCategoryService from "../service/GroupCategoryService";

export default {
  mounted: function () {
     
  },
  data(){
      return{
          groupCatId: 0,
          listSpecialCategory: []
      }
  },
  components: {
      navbar: Navbar,
    "horizontal-category": HorizontalCategory,
  },
  watch:{
      "$route.params.id": {
      handler: function(value) {
        this.groupCatId = value;
        groupCategoryService.getSpecialCategoryByGroupId(this.groupCatId).then(data=>{
            this.listSpecialCategory = this.listSpecialCategory.filter(f=>false);
            this.listSpecialCategory.push(...data);
        });
      },
      immediate: true,
    },
  }
};
</script>

<style scoped>
</style>