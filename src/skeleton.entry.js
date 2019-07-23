import Vue from 'vue';
import Skeleton from './Skeleton.vue';

export default new Vue({
  components: {
    Skeleton,
  },
  created(){
    console.log(Skeleton)
  },
  render: h => h(Skeleton),
});