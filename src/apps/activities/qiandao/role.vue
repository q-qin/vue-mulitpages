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
    <div class="role" :class="{'fix-head':true}" v-show="!loading">
      这是活动规则页面
    </div>
  </div>
</template>
<script>
import nvHead from "@/components/header.vue"
import nvLoading from "@/components/loading.vue"
import ajax from "@/assets/js/ajax"
import appcall from "@/assets/js/appcall"
  export default {
    name: 'noviceAskTips',
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

    },
    async mounted() {},
    methods: {
    }
  }

</script>

<style lang="less" scoped>
@import '../../../assets/css/colors';
  .role {
    padding: .5rem ;
  }


</style>
