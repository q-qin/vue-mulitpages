import Vue from 'vue'
import Lib from "@/assets/js/Lib";
import VueRouter from 'vue-router'

import index from './index.vue'
import role from './role.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'index',
    path: '/',
    meta: {
      title: '签到首页'
    },
    component: index
  },{
    name: 'role',
    path: '/role',
    meta: {
      title: '活动规则'
    },
    component: role
  }]
})

new Vue({
  router: router
}).$mount('#app')