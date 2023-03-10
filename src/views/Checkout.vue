<template>
  <div>
    <navbar :showCart="false" />
    <b-container fluid class="mx-n2">
      <b-row style="background:#F9F9F9">
        <b-col cols="4" class="d-none d-sm-block">
          <b-breadcrumb :items="navItem"></b-breadcrumb>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="4"></b-col>
        <b-col cols="12" md="8">
          <b-row>
            <b-col>
              <div class="checkout-title">{{ $t("shoppingCart") }}</div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6">
              <b-card
                class="shop-card-img shop-card mb-2"
                :img-src="
                  item.frontImg == null
                    ? `${imgUrl}/items/no_image.jpg`
                    : `${imgUrl}/items/${item.frontImg}`
                "
                img-alt="Card image"
                img-left
                v-for="(item, index) in shoppingCart"
                :key="index"
              >
                <b-card-text class="text-right">
                  <div class="close" aria-label="Close" @click="remove(index)">
                    <span aria-hidden="true">&times;</span>
                  </div>
                </b-card-text>
                <b-card-text class="text-left">
                  {{
                  $t("itemName", {
                  itemName: item.itemName,
                  itemNameMm: item.itemNameMm,
                  })
                  }}
                </b-card-text>
                <b-card-text class="text-left">
                  {{ item.qty }} x
                  <span class="item-price">
                    {{ item.currency }}
                    {{ item.price }}
                  </span>
                  <div class="discount" v-if="item.discountPrice!=0">
                    {{ item.currency }}
                    {{ item.price + item.discountPrice }}
                  </div>
                </b-card-text>
                <template v-slot:footer>
                  <div>
                    <span>
                      {{
                      $t("unitName", {
                      unitName: item.unitName,
                      unitNameMm: item.unitNameMm,
                      })
                      }}
                    </span>
                    <div class="btn-num" @click="incQty(item)">
                      <b-icon icon="chevron-up"></b-icon>
                    </div>
                    <center>
                      <b-form-input
                        type="text"
                        class="input-qty"
                        v-model.number="item.qty"
                        @change="changeQty(index, item)"
                      ></b-form-input>
                    </center>
                    <div class="btn-num" @click="decQty(item)">
                      <b-icon icon="chevron-down"></b-icon>
                    </div>
                  </div>
                </template>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-alert class="price-list" variant="dark" show>
                <b-row>
                  <b-col cols="8">{{ $t("itemTotal") }}</b-col>
                  <b-col cols="4" class="price">MMK {{ amount }}</b-col>
                </b-row>
              </b-alert>
              <!-- <b-alert class="price-list" variant="dark" show>
                <b-row>
                  <b-col cols="8">{{ $t("delivery") }}</b-col>
                  <b-col cols="4" class="price">MMK {{ deliveryCharge }}</b-col>
                </b-row>
              </b-alert>-->
              <b-alert class="price-list" variant="dark" show>
                <b-row>
                  <b-col cols="7">
                    <b-form-group :label="$t('township')" label-for="township">
                      <b-form-select
                        id="township"
                        v-model="$v.form.townshipId.$model"
                        :state="validateState('townshipId')"
                        :options="listTownship"
                        value-field="townshipId"
                        @change="townshipChange"
                        :text-field="$t('townshipText')"
                        placeholder="Enter Township"
                      >
                        <template v-slot:first>
                          <b-form-select-option :value="0" disabled>{{$t('selectTownship')}}</b-form-select-option>
                        </template>
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col cols="5" class="price">
                    <span class="text-black-50">{{$t('deliveryCharge')}}</span>
                    <br />
                    MMK {{ deliveryCharge }}
                  </b-col>
                </b-row>
              </b-alert>
              <b-alert class="price-list" variant="dark" show>
                <b-row>
                  <b-col cols="8">{{ $t("total") }}</b-col>
                  <b-col cols="4" class="price">MMK {{ total }}</b-col>
                </b-row>
              </b-alert>
               <b-alert class="price-list" variant="success" show>
                <b-row>
                  <b-col cols="12"><i class="fa fa-check text-success" aria-hidden="true"></i> Cash on delivery </b-col>
                </b-row>
              </b-alert>
              <b-row>
                <b-col cols="12" md="6" class="mb-2">
                  <b-btn
                    block
                    variant="primary"
                    v-if="userToken != ''"
                    @click="checkout"
                  >{{ $t("orderNow") }}</b-btn>
                  <b-btn
                    block
                    variant="danger"
                    @click="orderFill = false"
                    v-b-modal.orderinfo
                    v-else
                  >{{ $t("orderNow") }}</b-btn>
                </b-col>
                <b-col cols="12" md="6" class="mb-2">
                  <b-btn block variant="dark" @click="$router.go(-1)">
                    <b-icon icon="chevron-left"></b-icon>
                    {{ $t("continueShop") }}
                  </b-btn>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row></b-row>
        </b-col>
      </b-row>
      <b-modal ref="orderInfo" id="orderinfo" centered :title="$t('orderDialogTitle')">
        <b-form @submit.stop.prevent="onSubmit" v-if="userToken != '' || orderFill">
          <b-form-group :label="$t('phoneNo')" label-for="phoneNo">
            <b-form-input
              id="phoneNo"
              v-model="$v.form.phoneNo.$model"
              type="tel"
              name="phoneNo"
              placeholder="Enter PhoneNo"
              :state="validateState('phoneNo')"
              aria-describedby="input_phoneNo"
            ></b-form-input>
            <b-form-invalid-feedback id="input_phoneNo">Require Phone No</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group :label="$t('address')" label-for="address">
            <b-form-textarea
              id="address"
              v-model="$v.form.address.$model"
              placeholder="Enter Address"
              :state="validateState('address')"
              aria-describedby="input_address"
            ></b-form-textarea>
            <b-form-invalid-feedback id="input_address">Require address</b-form-invalid-feedback>
          </b-form-group>
          <!-- <b-form-group :label="$t('township')" label-for="township">
            <b-form-select
              id="township"
              v-model="$v.form.townshipId.$model"
              :state="validateState('townshipId')"
              :options="listTownship"
              value-field="townshipId"
              :text-field="$t('townshipText')"
              placeholder="Enter Township"
            >
              <template v-slot:first>
                <b-form-select-option :value="0" disabled>-- Select Township --</b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>-->
          <b-form-group :label="$t('chooseTime')" label-for="time">
            <b-form-radio-group
              id="time"
              v-model="preferedTime"
              :options="preferedTimeOptions"
              buttons
              button-variant="outline-primary"
              size="small"
              @input="changeTime"
            ></b-form-radio-group>
          </b-form-group>
          <el-time-picker
            v-if="preferedTime == 'custom'"
            arrow-control
            v-model="form.time"
            format="hh:mm:A"
            value-format="yyyy-MM-ddTHH:mm:00.000Z"
            :picker-options="{
              selectableRange: '10:00:00 - 16:00:00',
            }"
            @change="validateState('time')"
            placeholder="Select Time"
          ></el-time-picker>
          <div
              :style="styleTime"
              v-if="!$v.form.time.required"
              id="input_address"
            >{{ $t("orderTimeRequire") }}</div>
          <b-form-group :label="$t('date')" label-for="date">
            <el-date-picker
              id="date"
              v-model="form.date"
              type="date"
              format="dd-MMM-yyyy"
              value-format="dd-MMM-yyyy"
              name="orderDate"
              autocomplete="off"
              :pickerOptions="pickerOptions"
              @change="validateState('date')"
              placeholder="Pick a day"
            ></el-date-picker>
            <div
              :style="styleDate"
              v-if="!$v.form.date.required"
              id="input_address"
            >{{ $t("orderDateRequire") }}</div>
            <b-button
              type="submit"
              class="d-none"
              variant="primary"
              ref="orderBtn"
            >{{ $t("orderConfirm") }}</b-button>
          </b-form-group>
        </b-form>
        <div v-else>
          <fb-login />
        </div>
        <template v-slot:modal-footer>
          <b-button
            type="submit"
            variant="primary"
            @click="order"
            v-if="userToken != '' || orderFill"
          >{{ $t("orderConfirm") }}</b-button>
          <b-button class="d-none" v-else variant="link" @click="orderFill = true"></b-button>
        </template>
      </b-modal>
      <b-modal id="complete" ok-only>
        <p class="my-4">{{ $t("orderSuccess") }}</p>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapGetters } from "vuex";

import datePicker from "element-ui/lib/date-picker";
import timePicker from "element-ui/lib/time-picker";
import { isToday, format, compareAsc } from "date-fns";
import { required, minValue, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import orderService from "../service/OrderService";
import FbLogin from "../components/FBLogin";
import axios from "../config/index";

export default {
  mounted: function() {
    orderService.getTownship().then(data => {
      this.listTownship = this.listTownship.filter(v => false);
      this.listTownship.push(...data);
    });
    if (this.isLogin && this.type == "phone") {
      this.form.phoneNo = this.phoneNo;
    }
  },
  mixins: [validationMixin],
  data() {
    return {
      deliveryCharge: 0,
      form: {
        phoneNo: null,
        address: null,
        townshipId: 0,
        date: null,
        time: null
      },
      address: "",
      preferedTime: "custom",

      listTownship: [],
      pickerOptions: {
        disabledDate(time) {
          let today = Date.now();
          let hour = format(today, "H");
          let nextWeek = new Date(today + 7 * 24 * 60 * 60 * 1000);
          let nextDay =  new Date(time.getTime() - (24)*60*60);
          if(hour >= 18 && (isToday(time) || isToday(nextDay))){          
            return true;
          }
          let logic = time.getTime() < Date.now() || time.getTime() > nextWeek;                 
          return logic; //&& !isToday(time.getTime());
        }
        // shortcuts: [
        //   {
        //     text: "Today",
        //     onClick(picker) {
        //       picker.$emit("pick", new Date());
        //     }
        //   },
        //   {
        //     text: "Tomorrow",
        //     onClick(picker) {
        //       const date = new Date();
        //       date.setTime(date.getTime() + 3600 * 1000 * 24);
        //       picker.$emit("pick", date);
        //     }
        //   }
        // ]
      },
      preferedTimeOptions: [
        { text: "10:AM - 11:AM", value: "10:AM : 11:AM" },
        { text: "04:PM - 05:PM", value: "04:PM : 05:PM" },
        { text: "Custom", value: "custom" }
      ],
      customTime: "",
      orderFill: false,
      imgUrl: axios.defaults.baseURL
    };
  },
  i18n: {
    // `i18n` option, setup locale info for component
    messages: {
      en: { itemName: "%{itemName}", unitName: "%{unitName}" },
      mm: { itemName: "%{itemNameMm}", unitName: "%{unitNameMm}" }
    }
  },
  validations: {
    form: {
      phoneNo: {
        required
      },
      address: {
        required
      },
      townshipId: {
        minValue: minValue(1)
      },
      date: {
        required
      },
      time: {
        required
      }
    }
  },
  methods: {
    remove: function(index) {
      this.$store.dispatch("cart/removeFromCart", index);
    },
    changeQty: function(index, item) {
      if (item.qty < 1 || isNaN(item.qty)) {
        item.qty = 1;
      }
      this.$store.dispatch("cart/changeQty", { index, qty: item.qty });
    },
    incQty: function(item) {
      console.log(item);
      this.$set(item, "qty", item.qty + 1);
    },
    decQty: function(item) {
      let qty = item.qty;
      if (item.qty < 2) {
      } else {
        qty = qty - 1;
      }

      this.$set(item, "qty", qty);
    },
    order: function() {
      this.$refs.orderBtn.click();
    },
    onSubmit: function() {
      
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("Form Submitted");
      let text = "";
      if (this.preferedTime == "custom") {
        this.customTime = this.form.time;
        text = this.customTime;
      } else {
        text = this.preferedTime;
      }

      let orderObj = {
        listDto: this.shoppingCart,
        townshipId: this.form.townshipId,
        address: this.form.address,
        phoneNo: this.form.phoneNo,
        preferedTime: text,
        date: this.form.date
      };
      console.log(orderObj);
      orderService.saveOrder(orderObj).then(data => {
        this.$bvModal
          .msgBoxOk("Order success.", {
            title: "OrderId is " + data,
            size: "sm",
            buttonSize: "sm",
            okVariant: "success",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true
          })
          .then(value => {
            this.removeAllItem();
          })
          .catch(err => {
            // An error occurred
          });
        //this.removeAllItem();
      });
    },
    removeAllItem: function() {
      this.$store.dispatch("cart/removeAll");

      this.$router.replace("home");
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    townshipChange: function(townshipId) {
      let selectedTownship = this.listTownship.find(
        v => v.townshipId == townshipId
      );

      this.deliveryCharge = selectedTownship.deliveryCharge;
    },
    checkout: function() {
      //this.orderFill = false;
      //v - b - modal.orderinfo;
      //this.$emit("shown.bs.modal", "orderinfo");
      //v-b-modal.orderinfo
      //this.orderFill = false;

      if (this.form.townshipId != 0) {
        this.$refs.orderInfo.show();
      } else {
        this.$v.form.$touch();
      }

      //this.$emit("bv::show::modal", "#orderinfo");
    },
    changeTime: function(){
      console.log("Change Time" + this.preferedTime);
      if(this.preferedTime != "custom"){
        this.form.time = this.preferedTime
      }else{
        this.form.time = null
      }
    }
  },
  computed: {
    ...mapGetters([
      "shoppingCart",
      "userToken",
      "isLogin",
      "type",
      "phoneNo",
      "userName"
    ]),
    navItem: function() {
      let item = [
        {
          text: "Home",
          to: { name: "Home" }
        },
        {
          text: "Checkout",
          href: `/checkout`,
          active: true
        }
      ];
      return item;
    },
    amount: function() {
      let total = 0;
      this.shoppingCart.forEach(item => {
        let amount = item.price * item.qty;
        total += amount;
      });
      return total;
    },
    total: function() {
      return this.amount + this.deliveryCharge;
    },
    styleDate: function() {
      if (this.form.date == null) {
        return {
          display: "block",
          width: "100%",
          "margin-top": "0.25rem",
          "font-size": "80%",
          color: "#dc3545"
        };
      }
      return {
        display: "none",
        width: "100%",
        "margin-top": "0.25rem",
        "font-size": "80%",
        color: "#dc3545"
      };
    },
    styleTime: function() {
      if (this.form.time == null) {
        return {
          display: "block",
          width: "100%",
          "margin-top": "0.25rem",
          "font-size": "80%",
          color: "#dc3545"
        };
      }
      return {
        display: "none",
        width: "100%",
        "margin-top": "0.25rem",
        "font-size": "80%",
        color: "#dc3545"
      };
    }
  },
  components: {
    navbar: Navbar,
    "el-date-picker": datePicker,
    "el-time-picker": timePicker,
    "fb-login": FbLogin
  }
};
</script>

<style scoped>
@import "~element-ui/lib/theme-chalk/date-picker.css";
@import "~element-ui/lib/theme-chalk/icon.css";

.shop-card-img img {
  padding: 10px;
  object-fit: cover;
  object-position: 50% 50%;
  width: 100px;
  height: 100px;
}
.shop-card .card-body {
  padding: 0.3rem;
  font-weight: 800;
  font-family: "Raleway", sans-serif;
}
.shop-card .card-body .discount {
  font-size: 0.9em !important;
  font-weight: 600;
  color: rgb(255, 0, 0) !important;
  text-decoration: line-through;
  font-family: "Cabin", sans-serif;
}
.shop-card .close {
  color: rgb(253, 55, 55);
  font: sans-serif;
  font-size: 1.8rem;
  cursor: pointer;
}
.shop-card .close:hover {
  color: red;
  font: sans-serif;
  font-size: 1.9rem;
  cursor: pointer;
}
.checkout-title {
  color: red;
  text-align: left;
  padding: 10px;
  font-weight: 600;
  border-top: red solid 2px;
}
.input-qty {
  width: 2rem;
  text-align: center;
  padding: 0.1rem;
}
.btn-num {
  padding-left: 2px;
  padding-right: 2px;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgb(255, 143, 143);
}
.btn-num:hover {
  cursor: pointer;
  color: red;
}
.shop-card .item-price {
  color: red !important;
  font-size: 1.2rem;
  font-weight: 400;
}
.price-list {
  font-weight: 600;
  text-align: left;
  margin-bottom: 0.5rem;
}
.price-list .price {
  color: red;
  text-align: right;
}
.form-group--error {
}
.shop-card .card-footer {
  padding-top: 4px;
  padding-bottom: 2px;
}
</style>
