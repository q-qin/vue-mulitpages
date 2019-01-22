<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head"
	            :show-head="true"
	            :fix-head="true"
	            :show-back="true"
	            :show-menu="false"
	            :page-name="$route.meta.title" >
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="qiandao" :class="{'fix-head':true}" v-show="!loading">
      签到赚金币，奖励拿不停~~~速来速来
      <br>
      <br>
      <router-link to="/role" style="color:#ff0000">活动规则</router-link>
    </div>
  </div>
</template>
<script>
import nvHead from "@/components/header.vue"
import nvLoading from "@/components/loading.vue"
import ajax from "@/assets/js/ajax"
import appcall from "@/assets/js/appcall"
  export default {
    name: 'qiandao',
    data() {
      return {
        loading: false
      }
    },
    components: {
      nvHead,
      nvLoading,
    },
    created() {
      this.$Progress.start();
    },
    mounted() {
      setTimeout(()=>{
        this.$Progress.finish();
      })
    },
    methods: {}
  }

</script>

<style lang="less" scoped>
@import '../../../assets/css/colors';
  .qiandao {
    padding: .5rem ;
  }

</style>
