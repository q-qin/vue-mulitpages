import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import filters from "./filter/index";

import "lib-flexible";
// @ts-ignore
import YDUI from "vue-ydui";
import "vue-ydui/dist/ydui.rem.css";
// @ts-ignore
import VueWechatTitle from "vue-wechat-title";
Vue.config.productionTip = false;
Vue.use(VueWechatTitle);
Vue.use(YDUI);

Vue.use(filters);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
