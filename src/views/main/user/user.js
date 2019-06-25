import "@/assets/js/Lib";
import Vue from 'vue'
import store from '@/store/'
import VueRouter from 'vue-router'
import routes from '@/router/user.js'
import VueClipboard from 'vue-clipboard2'
import '@/statistics/baidu.js' // 百度统计

Vue.use(VueRouter)
Vue.use(VueClipboard)

const router = new VueRouter({
  routes: routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - 用户中心";
  }
  next();
})

if (window.sessionStorage.user) {
  store.dispatch('saveuserinfo', JSON.parse(window.sessionStorage.user));
}


new Vue({
  router: router,
  store:store,
}).$mount('#app')