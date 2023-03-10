<template>
  <div>
    <b-navbar id="top" fixed="top">
      <b-navbar-brand
        ><i
          @click="$router.go(-1)"
          class="fa fa-chevron-left btn"
          aria-hidden="true"
        ></i>
        &nbsp;My Order</b-navbar-brand
      >
    </b-navbar>
    <div class="container">
      <div class="row">
        <div
          class="col-12 col-md-6 mb-3"
          v-for="order in listOrder"
          :key="order.orderId"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                [{{ order.date }} / {{ order.preferedTime }}]
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">
                OrderId - {{ order.orderId | idFilter }} 
                <span v-if="status(order.orderId) == 'ACCEPT'" class="badge badge-primary">ACCEPT</span>
                <span v-else-if="status(order.orderId) == 'REJECT'" class="badge badge-danger">REJECT</span>
                <span v-else-if="status(order.orderId) == 'Pending'" class="badge badge-secondary">PENDING</span>                
                <span v-else-if="status(order.orderId) == 'COMPLETE'" class="badge badge-success">COMPLETE</span>
                <span v-else>{{status(order.orderId)}}</span>
              </h6>
              <div class="card-text">
                <div class="row">
                  <!-- <div class="col-3">
                  {{ order.townshipName }}<br />
                  {{ order.address }}
                </div> -->
                  <div class="col text-left">
                    <ul class="list-group list-group-flush">
                      <li
                        v-for="(item, index) in order.listDto"
                        :key="index"
                        class="list-group-item"
                      >
                        <img
                          :src="
                            item.frontImg == null
                              ? `${imgUrl}/items/no_image.jpg`
                              : `${imgUrl}/items/${item.frontImg}`
                          "
                          class="img-item"
                        />
                        {{ item.itemName }}({{ item.price }}/{{
                          item.unitName
                        }}
                        - {{ item.currency }}) - {{ item.qty }}
                      </li>
                      <li
                        class="list-group-item list-group-item-success total-price"
                      >
                        Total - {{ order.total }} MMK
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderService from "../service/OrderService";
import axios from "../config/index";

export default {
  mounted: function () {
    orderService.getOrder().then((data) => {
      this.listOrder.push(...data);
    });
  },
  data() {
    return {
      listOrder: [],
      imgUrl: axios.defaults.baseURL,
    };
  },
  methods: {
    status: function(value){
      let result = value.split("-");
      return result[1].trim();
    }
  },
  filters: {
    idFilter: function (value) {
      let result = value.split("-");
      return result[0].trim();
    },
    
  },
};
</script>

<style scoped>
.img-item {
  width: 40px;
  height: 40px;
  margin-right: 3px;
  object-fit: cover;
  object-position: center;
}
.total-price {
  padding-left: 70px;
}
</style>
