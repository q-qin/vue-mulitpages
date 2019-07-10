<route-meta>
{
  "title": "选择城市"
}
</route-meta>
<template>
  <div class="city">
    <div class="nav ks-row-middle">
      <div class="w140 pl20">
        <i @click="goback" class="iconfont iconzuojiantou back"></i>
      </div>
      <div class="title ks-row-middle f14">
        <div class="blockf mr2"></div>
        <div class="blocks"></div>
        <div class="pl10 pr10 b500">城市</div>
        <div class="blocks mr2"></div>
        <div class="blockf"></div>
      </div>
    </div>
    <div class="tc keybord">
      <template v-for="(item,index) in cityList">
        <a
          class="keybord-i f14"
          :class="{nocity:item.groupList.length==0,citychoose:item.checked}"
          @click="chooseLetter(index)"
          :key="index"
        >{{item.groupCode}}</a>
        <br v-if="index===14">
      </template>
    </div>
    <div v-for="i in cityList" :key="i.groupCode" v-show="i.groupList.length>0" ref="city">
      <div class="city-title">{{i.groupCode}}</div>
      <div class="bgwh pl15" v-for="(item,$index) in i.groupList" :key="item.regionId">
        <div
          class="ks-row-middle"
          :class="$index==i.groupList.length-1?'':'bbe'"
          @click="goCityInfo(item.regionId,item.regionName)"
        >
          <div class="g3 f16 city-name">{{item.regionName}}</div>
          <div class="g9">（{{item.stores}}）</div>
          <div class="ks-col"></div>
          <div class="pr5">
            <i class="iconfont iconarrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { storecitys } from "@/apis/citychoose";
import { Storecitys as cityTypes } from "@/types/city";

@Component({
  components: {}
})
export default class ComponentName extends Vue {
  cityList: cityTypes[] = [];
  mounted() {
    this.getStorecitys();
  }
  async getStorecitys() {
    this.cityList = await storecitys({ cityId: 0 });
  }
  chooseLetter(index: number) {
    let data = this.cityList[index];
    if (data.checked || data.groupList.length == 0) {
      return;
    }
    this.cityList.forEach(item => {
      item.checked = false;
    });
    data.checked = true;
    this.$set(this.cityList, index, data);
    (<HTMLDivElement[]>this.$refs.city)[index].scrollIntoView();
  }
  goCityInfo(id: string, name: string) {
    console.log(typeof id);
    this.$router.push({
      path: "/replcecoper/coperlist",
      query: { id, name }
    });
  }
  goback() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
.city {
  background-color: #f5f5f5;
  padding-bottom: 140px;
  padding-top: 52px;
  .nav {
    top: 0px;
    position: fixed;
    width: 100%;
    height: 52px;
    line-height: 52px;
    background: rgba(243, 244, 251, 1);
    .back {
      color: #bcc0d2;
    }
    .title {
    }
    .blockf {
      background-color: rgba(73, 140, 234, 1);
      width: 4px;
      height: 8px;
      transform: skewX(-30deg);
      opacity: 0.5;
    }
    .blocks {
      background-color: rgba(73, 140, 234, 1);
      width: 4px;
      height: 8px;
      transform: skewX(-30deg);
    }
  }
  .keybord {
    position: fixed;
    bottom: 0;
    flex-wrap: wrap;
    justify-content: center;
    padding: 16px 40px;
    background-color: #fff;
  }
  .keybord-i {
    display: inline-block;
    width: 28px;
    margin: 4px;
    box-sizing: border-box;
    color: #fff;
    background-color: rgba(188, 192, 210, 1);
    border-radius: 6px;
    height: 28px;
    vertical-align: middle;
    padding-top: 6px;
  }
  .city-title {
    background: rgba(245, 245, 245, 1);
    color: rgba(73, 140, 234, 1);
    line-height: 20px;
    padding: 8px 0 8px 15px;
  }
  .city-name {
    margin: 12px 8px 12px 0;
  }
  .nocity {
    background: #e5e6ed;
    color: #fff;
  }
  .citychoose {
    background-color: #498cea;
  }
}
</style>