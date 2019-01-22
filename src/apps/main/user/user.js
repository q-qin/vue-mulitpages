import Vue from 'vue'
import Lib from "@/assets/js/Lib";
import store from '@/store/'
import VueRouter from 'vue-router'
import routes from '@/router/user.js'
import '@/statistics/baidu.js' // 百度统计

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title + " - 3keji.com";
//   }
//   next();
// })

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
  store.dispatch('saveuserinfo', JSON.parse(window.sessionStorage.user));
}


new Vue({
  router,
  store
}).$mount('#app')