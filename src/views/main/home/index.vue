<template>
  <div>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="$route.meta.title">
    </nv-head>
    <div class="index" >
      <p>hello world</p>
      <p class="timer">{{d}}天{{h}}小时{{m}}分钟{{s}}秒</p>
      <p><router-link to="list">--> 跳转到同页面不同路由</router-link></p>
      <p><a href="/views/activities/novels.html">--> 跳转到新页面</a></p>
      <p class="red">*注意路由变化</p>
    </div>
  </div>
</template>

<script>
import nvHead from "@/components/header.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";

export default {
  name: "index",
  components: {
    nvHead
  },
  data() {
    return {
      d:'',
      h:'',
      m:'',
      s:'',
    };
  },
  async mounted() {
    this.$Progress.start();
    try {  
      window.console &&
        window.console.log &&
        (console.log(`%c❤ Front-end ? => joinUs() %c http://www.3keji.com/recruit.html `,"color:#c30005",'font-size:15px;color:#009a61;text-shadow: 0 0 3px #009a61;'));
    } catch (e) {}

    this.timer();
    setInterval(this.timer, 1000);
    this.$Progress.finish();
  },
  methods: {
    timer(){
        var start = new Date(2018, 1, 7);// 2018.1.7
        var t = new Date() - start;
        var h = ~~(t / 1000 / 60 / 60 % 24);
        if (h < 10) {
            h = "0" + h;
        }
        var m = ~~(t / 1000 / 60 % 60);
        if (m < 10) {
            m = "0" + m;
        }

        var s = ~~(t / 1000 % 60);
        if (s < 10) {
            s = "0" + s;
        }
        this.d = ~~(t / 1000 / 60 / 60 / 24);
        this.h = h;
        this.m = m;
        this.s = s;
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/mixin";
.index {
  font-size: 0.34rem;
  text-align: center;
  p{
    line-height: 1rem;
    &.red{
      color:#c30005;
    }
  }
}
</style>
