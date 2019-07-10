<template>
  <yd-layout style="background-color:rgba(242,242,242,1)">
    <!-- <yd-navbar slot="navbar" title="NavBar">
      <router-link to="#" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>-->
    <router-view/>
    <yd-tabbar slot="tabbar" active-color="#498cea" padding=".2rem" fontsize="12px">
      <yd-tabbar-item title="首页" @click.capture.native="()=>{}">
        <span name="home" class="iconfont b iconicon_home_normal" slot="icon"></span>
      </yd-tabbar-item>
      <yd-tabbar-item title="仪表盘" link="/dash" :active="activepath=='/dash'">
        <span
          name="home"
          class="iconfont b"
          slot="icon"
          :class="activepath=='/dash'?'iconicon_dashboard_selected':'iconicon_dashboard_nomal'"
        ></span>
      </yd-tabbar-item>
      <yd-tabbar-item title="合作机构" link="/cooperator" :active="activepath=='/cooperator'">
        <span
          name="home"
          class="iconfont b"
          slot="icon"
          :class="activepath=='/cooperator'?'iconicon_partner_selected':'iconicon_partner_normal'"
        ></span>
      </yd-tabbar-item>
      <yd-tabbar-item title="我的" @click.capture.native="()=>{}">
        <span name="home" class="iconfont b iconicon_me_nomal" slot="icon"></span>
      </yd-tabbar-item>
    </yd-tabbar>
  </yd-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class ComponentName extends Vue {
  activepath: string = "";
  @Watch("$route")
  change(route: { path: string }) {
    this.activepath = route.path;
  }
  mounted() {
    this.activepath = this.$route.path;
  }
}
</script>

<style lang="scss" scoped>
.footnav {
  color: #498cea;
}
</style>