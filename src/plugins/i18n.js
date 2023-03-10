import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: "mm",
  fallbackLocale: "en",
  silentTranslationWarn: process.env.NODE_ENV === "production",
  messages: {
    en: {
      category: "Categories",
      accountLogin: "AccountLogin",
      myAccount: "My Account",
      home: "Home Page",
      profile: "Profile",
      myOrder: "My Order",
      about: "About",
      termAndCondition: "Terms And Conditions",
      addToCart: "Add to Cart",
      checkout: "Check out",
      shoppingCart: "Shopping Cart",
      itemTotal: "Total Item Cost",
      delivery: "Delivery Cost",
      total: "Total",
      orderNow: "OrderNow",
      continueShop: "Continue Shopping",

      orderConfirm: "Order Confirm",
      freshText:
        "Fresh Meals & Vegetables are ready<br />to order From <br /><b class='green'>Fresh Myanmar.</b><b class='red'>Let's Login</b>",
      orderSuccess: "Order Success",
      orderDateRequire: "Order date is required",
      orderTimeRequire: "Order time is required",
      phoneNo: "PhoneNo:",
      address: "Address:",
      township: "Township",
      chooseTime: "ChooseTime",
      date: "Date:",
      orderDialogTitle: "Fill Order Information",
      sortBy: "Sort By",
      more: "More",
      mainCategory: "Main Category",
      
      deliveryCharge: "Delivery Charge",
      selectTownship: "-- Select Township --",
      townshipText: "townshipName",
    },
    mm: {
      category: "အမျိုးအစားများ",
      accountLogin: "အကောင့်ဝင်မည်",
      myAccount: "ကျွန်ုပ်၏ အကောင့်",
      home: "မူလစာမျက်နှာ",
      profile: "ပရိုဖိုင်",
      myOrder: "မှာထားသော အော်ဒါများ",
      about: "ကျွန်တော်တို့ အကြောင်း",
      termAndCondition: "စည်းကမ်းနှင့်သတ်မှတ်ချက်များ",
      addToCart: "ခြင်းထဲထည့်ရန်",
      checkout: "မှာမည်",
      shoppingCart: "ဈေးဝယ်လှည်း",
      itemTotal: "ကုန်ပစ္စည်း စုစုပေါင်း",
      delivery: "ပို့ဆောင်ခ",
      total: "ကုန်ကျစရိတ် စုစုပေါင်း",
      orderNow: "အော်ဒါမှာမည်",
      continueShop: "ဈေးဆက်ဝယ်မည်။",

      orderConfirm: "အော်ဒါမှာမည် သေချာသည်",
      freshText:
        "သန့်ရှင်းလတ်ဆက်သော<br />အသီးအနှံ အသားငါးများကို စားသုံးရန်<br /><b class='green'>Fresh Myanmar</b> တွင်<b class='red'>Login</b> ဝင်ပါ။",
      orderSuccess: "အော်ဒါမှာ ပြီးပါပြီ",
      orderDateRequire: "အော်ဒါမှာမည့်နေ့ရွေးပါ။",
      orderTimeRequire: "အချိန်ရွေးပေးပါ။",
      phoneNo: "ဖုန်းနံပါတ်",
      address: "လိပ်စာ :",
      township: "မြို့နယ် :",
      chooseTime: "အချိန်ရွေးပါ",
      date: "ရက်စွဲ :",
      orderDialogTitle: "အော်ဒါ မှာရန် သင့်အချက်အလက် ဖြည့်ပါ။",
      sortBy: "စီ",
      more: "ပိုမို၍",
      mainCategory: "အဓိက အမျိုးအစား",

      deliveryCharge: "ပို့ဆောင်ခ",
      townshipText: "townshipNameMm",
      selectTownship: "-- မြို့နယ် ရွေးပါ။ --",
      
     
    },
  },
});
