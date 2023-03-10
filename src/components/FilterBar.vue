<template>
  <div class="row no-gutters justify-content-end mt-1 mx-1 sticky-top">
    <div class="col-4 text-right pr-2 py-2">Sort By</div>
    <div class="col-8 col-md-4">
      <b-form-select v-model="selected" class="mb-3" @change="sortBy">
        <template v-slot:first>
          <b-form-select-option value disabled>-- none --</b-form-select-option>
        </template>
        <b-form-select-option
          :value="{
          sortBy:'itemName',
          dir:'ASC'}"
        >Item Name (A to Z)</b-form-select-option>
        <b-form-select-option
          :value="{
          sortBy:'itemName',
          dir:'DESC'}"
        >Item Name (Z to A)</b-form-select-option>
        <b-form-select-option
          :value="{
          sortBy:'date',
          dir:'ASC'}"
        >Date Added (Newest first)</b-form-select-option>
        <b-form-select-option
          :value="{
          sortBy:'date',
          dir:'DESC'}"
        >Date Added (Oldest first)</b-form-select-option>
        <b-form-select-option
          :value="{
          sortBy:'unitPrice',
          dir:'ASC'}"
        >Price (Low to High)</b-form-select-option>
        <b-form-select-option
          :value="{
          sortBy:'unitPrice',
          dir:'DESC'}"
        >Price (High to Low)</b-form-select-option>
      </b-form-select>
      <!-- <div class="btn btn-sm btn-outline-primary">
        <i class="fa fa-filter" aria-hidden="true"></i> FILTER
      </div>-->
      <!-- <div class="btn btn-sm btn-primary">
        <i class="fa fa-sort-desc" aria-hidden="true"></i>
      </div>
      <div class="btn btn-sm btn-primary">
        <i class="fa fa-sort-asc" aria-hidden="true"></i>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: ""
    };
  },
  methods: {
    sortBy: function() {
      this.$emit("sort", this.selected);
    }
  }
};
</script>

<style scoped>
</style>