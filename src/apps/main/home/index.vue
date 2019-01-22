<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div class="index" v-show="!loading" >
      hello world
    </div>
  </div>
</template>

<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue"
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";

export default {
  name: "index",
  components: {
    nvHead,
    nvLoading
  },
  data() {
    return {
      loading: true
    };
  },
  created(){
    this.$Progress.start();
  },
  mounted() {
    try {  
      window.console &&
        window.console.log &&
        (console.log(`%c❤ Front-end ? => joinUs() %c EmailMe：qin124@qq.com `,"color:#c30005",'font-size:15px;color:#009a61;text-shadow: 0 0 3px #009a61;'));
    } catch (e) {}
    setTimeout(()=>{
      this.$Progress.finish();
      this.loading= false;
      this.$router.push('list')
    },1000)
  },
  methods: {}
};
</script>

<style lang="less">
@import "../../../assets/css/colors";
.index {
  font-size: 0.34rem;
  text-align: center;
  line-height: 2rem;
}
</style>
