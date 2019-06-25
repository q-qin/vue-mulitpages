import "babel-polyfill";
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import VueLazyload from 'vue-lazyload'
import conf from 'conf'


import './rem'
import './JKEventHandler'
import msgbox from './msgbox'
import utils from './utils';
import './vueFilter';

// 公共样式
import '@/assets/css/common.less';

Vue.prototype.$apiurl = conf.apiurl;
Vue.prototype.$adApi = conf.adApi;
Vue.prototype.$alert = msgbox.alert;
Vue.prototype.$confirm = msgbox.confirm;
Vue.prototype.$success = msgbox.success;
Vue.prototype.$toast = msgbox.toast;

Vue.prototype.$h5url = conf.h5url;
Vue.prototype.$currVer = conf.currVer;

Vue.prototype.$utils = utils;

//解决click点击300毫秒延时问题
import FastClick from 'fastclick';
FastClick.attach(document.body);

const options = {
  color: '#d53c3e',
  failedColor: '#874b4b',
  thickness: '2px',
}

Vue.use(VueProgressBar, options)
Vue.use(VueLazyload,{
  loading:require('@/assets/images/img_loading.png'),
  lazyComponent:true,
  attempt:1,
})