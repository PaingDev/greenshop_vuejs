<template>
<div>
 <navbar />
 <b-container fluid>
  <b-row class="justify-content-md-center">
    <!-- <b-col cols="12" md="8"> -->
         <template v-for="item in listSaleItemDto">
          <group-card :item="item" :key="item.itemId"/>
        </template>
    <!-- </b-col> -->
  </b-row>
 </b-container>
</div>
</template>

<script>
import Navbar from "@/components/Navbar";
import GroupCard from "@/components/FullGroupCard";
import groupCategoryService from "../service/GroupCategoryService";

export default {
  mounted: function () {
     groupCategoryService.getAllCategory().then(data=>{
       this.listSaleItemDto = this.listSaleItemDto.filter(f=>false);
       this.listSaleItemDto.push(...data);
     });
  },
  data(){
      return{
          listSaleItemDto: []
      }
  },
  components: {
      navbar: Navbar,
      'group-card': GroupCard
  },
  watch:{
     
  }
};
</script>

<style scoped>
</style>