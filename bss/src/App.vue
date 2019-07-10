<template>
  <div id="app">
    <div class="apploading" v-if="isLoading"></div>
    <router-view v-wechat-title="$route.meta.title" v-show="!isLoading"/>
  </div>
</template>
<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style  lang="scss">
@import "./assets/styles/index.scss";
.apploading {
  width: 100%;
  height: 100%;
  background-image: url("./assets/images/loading.gif");
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: 50% 50%;
}
</style>

