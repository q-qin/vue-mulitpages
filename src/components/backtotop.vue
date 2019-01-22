<template>
    <div class="icon-top" v-show="show" @click="goTop"></div>
</template>
<script>
export default {
  replace: true,
  data() {
    return {
      show: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandle);
  },
  methods: {
    goTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.show = false;
    },
    scrollHandle() {
      // console.log(window.scrollY)
      if (window.scrollY > 100) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.icon-top {
  position: fixed;
  right: 0.32rem;
  bottom: 0.6rem;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  border: 1px solid #999;
  z-index: 99;
  color: #fea500;
  background-color: #fff;
  background-image: url(../assets/images/topback.png);
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 0 2px #999;
}
</style>