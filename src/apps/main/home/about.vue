<template>
    <div >
    	<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="true"
	            :fix-head="true"
	            :show-back="true"
	            :show-menu="false"
	            :page-name="$route.meta.title" >
	    </nv-head>
        <div class="main" :class="{'fix-head':true}">
	        <dl class="about-info">
	            <dt>关于项目：</dt>
	            <dd>
	                江苏省各大城市的车辆信息，感谢各位车友的分享与支持，写代码不容易，老哥们赏个饮料钱。
	            </dd>
	            <dt>技术栈：</dt>
	            <dd>
	                vue2.x+webpack2.x+vux+vue-router+fetch+ajax
	            </dd>
	            <dt>作者：</dt>
	            <dd>
	                js 阿强
	            </dd>
	            <dt>当前版本</dt>
	            <dd>V2.0</dd>
	        </dl>
        </div>
    </div>
</template>
<script>
import nvHead from "@/components/header.vue";
export default {
  components: {
    nvHead
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/colors";
.main {
  width: 100vw;
  height: 100vh;
}
.about-info {
  height: 100%;
  padding: 1.2rem 0.3rem;
  line-height: 1.25;
  background: #f7f7f7;
}
.about-info dt {
  padding: 0.3rem 0;
  font-weight: bold;
}
.about-info dd {
  padding-bottom: 0.15rem;
  font-size: 0.28rem;
  border-bottom: 1px solid #d5dbdb;
}
.about-info a {
  color: #42b983;
}
</style>