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
	    <div v-show="!loading" :class="{'fix-head':true}">
	    	<div class="content" >
	    		<h1 >{{detail.title}}</h1>
	    		<div class="tt">
	    			<span class="region">{{detail.sub_title}}</span> 
	    			<span class="time">{{detail.update_time | getLastTimeStr}}</span>
	    		</div>
	    		<div class="article_content" :style="height" v-html="detail.description"></div>
	    		<div class="load_all" v-show="!loadall">
	    			<a @click="showall">展开显示全文 <i class="zhankai"></i> </a>
	    			<em></em>
	    		</div>
	    	</div>
	    </div>
	    <nv-top></nv-top>
	</div>
</template>

<script>
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import nvTop from "@/components/backtotop.vue";
import { mapState } from "vuex";
import ajax from "@/assets/js/ajax";
import fetch from "@/assets/js/fetch";

export default {
  name: "detail",
  data() {
    return {
      loading: true,
      height: "height:8rem;",
      loadall: false,
      detail: {},
      comments: [],
      id: 0
    };
  },
  components: {
    nvHead,
    nvLoading,
    nvTop
  },
  created() {},
  computed: {
    ...mapState(["userinfo"])
  },
  mounted() {
    this.getdetail();
  },
  methods: {
    async getdetail() {
      let params = {
        tid: this.$route.params.id,
        uid: this.userinfo.uid ? this.userinfo.uid : ""
      };
      let rs = await fetch(this.$apiurl + "/news/detail", params);
      if (rs && rs.code === 0 && rs.data) {
        this.loading = false;
        this.detail = rs.data;
      } else {
        this.$alert(rs.msg);
      }
    },
    showall() {
      this.loadall = true;
      this.height = "height:auto";
    }
  },
  filters: {
    getLastTimeStr(dateStr) {
      let date = new Date(dateStr);
      let yyyy = date.getFullYear(),
        MM = date.getMonth() + 1,
        dd = date.getDate(),
        HH = date.getHours(),
        mm = date.getMinutes(),
        ss = date.getSeconds();
      return yyyy + "/" + MM + "/" + dd + " " + HH + ":" + mm + ":" + ss;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/colors";
.content {
  overflow: hidden;
  width: 100vw;
  padding: 0.3rem;
  h1 {
    font-size: 0.36rem;
  }
  .tt {
    line-height: 0.8rem;
    font-size: 0.3rem;
  }
  .region {
    color: #999;
    margin-right: 0.5rem;
  }
  .time {
    color: #999;
  }
  .article_content {
    margin-bottom: 0.25rem;
    overflow: hidden;
    font-size: .28rem;
  }
  .load_all {
    position: relative;
    width: 100%;
    height: 1rem;
    margin-top: -1rem;
  }
  .load_all a {
    width: 6rem;
    height: .8rem;
    border: 1px solid @mcolor;
    border-radius: 0.15rem;
    display: block;
    line-height: .8rem;
    text-align: center;
    color: @mcolor;
    margin: 1rem auto;
    font-size: 0.3rem;
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    i.zhankai {
      width: 0.3rem;
      height: 0.24rem;
      display: inline-block;
      background-image: url("../../../assets/images/zhankai.png");
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  .load_all em {
    position: absolute;
    top: -1rem;
    left: 0;
    width: 100%;
    display: block;
    height: 1rem;
    background: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.9) 55%,
      rgba(255, 255, 255, 0.93) 60%,
      rgba(255, 255, 255, 0.96) 65%,
      #fff 100%
    );
  }
}
</style>
