<template>
  <div>
    <navbar ref="nav" :searchTextHint="searchTextHint" @changeSearchText="changeSearchText" />
    <b-container fluid>
      <div class="row">
        <b-col cols="1" class="d-block d-sm-none"></b-col>
        <b-col cols="11" md="8">
          <filter-bar @sort="sort" />
        </b-col>
      </div>
      <b-row no-gutters class="justify-content-md-center">
        <b-col cols="12" md="8">
          <b-row no-gutters>
            <b-col cols="6" md="3" class="mt-3 px-2" v-for="(item, index) in items" :key="index">
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
import FilterBar from "@/components/FilterBar";

export default {
  mounted: function() {},
  data() {
    return {
      items: [],
      searchTextHint: ""
    };
  },
  props: {},
  methods: {
    sort: function(value) {
      itemService.getItemByName(this.searchTextHint, value).then(data => {
        this.items = this.items.filter(v => false);
        this.items.push(...data);
      });
    },
    changeSearchText: function(value) {}
  },
  components: {
    "item-card": ItemCard,
    navbar: Navbar,
    "filter-bar": FilterBar
  },
  watch: {
    "$route.query.q": {
      immediate: true,
      handler: function(value) {
        this.searchTextHint = value;
        itemService.getItemByName(value).then(data => {
          this.items = this.items.filter(v => false);
          this.items.push(...data);
        });
      }
    }
  }
};
</script>