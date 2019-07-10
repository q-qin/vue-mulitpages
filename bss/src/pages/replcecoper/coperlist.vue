
<template>
  <div class="coperlist">
    <div class="nav ks-row-middle">
      <div class="w140 pl20">
        <i @click="goback" class="iconfont iconzuojiantou back"></i>
      </div>
      <div class="title ks-row-middle f14">
        <div class="blockf mr2"></div>
        <div class="blocks"></div>
        <div class="pl5 pr5 b500">合作机构</div>
        <div class="blocks mr2"></div>
        <div class="blockf"></div>
      </div>
    </div>
    <div class="body-l">
      <ul>
        <li
          @click="changeSelect(index)"
          class="city-selitem f14 ks-row-middle"
          :class="item.checked?'choosed-item':''"
          v-for="(item,index) in cityList"
          :key="item.regionId"
        >
          <div class="pr5 city-iname">{{item.regionName}}</div>
          <div class>({{item.stores}})</div>
        </li>
      </ul>
    </div>
    <div class="body-r bgwh">
      <div class="pl20 pr20 store-name">
        <div v-show="areaCity.length==0">
          <div class="tc pt60">
            <img class="w140" src="../../assets/images/nodian.png">
            <div class="g9 f14">暂无门店</div>
          </div>
        </div>
        <div
          @click="goCooperator(item)"
          class="bef g3 pt15 pb15 f16"
          v-for="item in areaCity"
          :key="item.storeId"
        >{{item.storeName}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { storecitys, areastorelist } from "@/apis/citychoose";
import { Storecitys as cityTypes, Cityschild, Areacitys } from "@/types/city";
import { session } from "@/utils/store";
import { setTitle } from "@/utils/ddTitle";
@Component({
  components: {}
})
export default class ComponentName extends Vue {
  cityList: Cityschild[] = [];
  areaCity: Areacitys[] = [];
  mounted() {
    this.getStorecitys();
    setTitle(this.$route.query.name + "");
    document.title = String(this.$route.query.name);
  }
  async getStorecitys() {
    let id = this.$route.query.id;
    let data: cityTypes[] = await storecitys({ cityId: Number(id) });
    this.cityList = data[0].groupList;
    let allCityNumber = this.cityList.reduce((amount: string, item) => {
      console.log(amount, item);
      return Number(amount) + item.stores;
    }, "0");
    let Allcity: Cityschild = {
      stores: allCityNumber,
      regionId: 0,
      regionName: "全市",
      checked: true,
      regionNamePY: "123"
    };
    this.cityList.unshift(Allcity);
    this.getStore(0);
  }
  async getStore(index: number) {
    let id = this.$route.query.id;
    this.areaCity = await areastorelist({
      cityId: Number(id),
      areaId: Number(index)
    });
  }
  changeSelect(index: number) {
    let data = this.cityList[index];
    // if (data.checked || Number(data.stores) == 0) {
    if (data.checked) {
      return;
    }
    this.cityList.forEach(item => {
      item.checked = false;
    });
    data.checked = true;
    this.$set(this.cityList, index, data);
    this.getStore(data.regionId);
  }
  goCooperator(info: {
    storeId: number;
    storeName: string;
    storeCode: string;
  }) {
    session.set("storeInfo", info);
    this.$router.push({
      path: "/cooperator"
      // query: { storeId: String(info.storeId), storeName: info.storeName }
    });
  }
  goback() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
.coperlist {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  flex: auto;
  height: 100%;
  overflow: hidden;
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
  .bef {
    border-bottom: 1px solid #efefef;
  }
  .body-l {
    position: relative;
    width: 110px;
    flex: 0 0 110px;
    overflow-y: auto;
    box-sizing: border-box;
    .city-selitem {
      color: rgba(102, 102, 102, 1);
      padding: 15px 3px 15px 8px;
      border-left: 4px solid transparent;
    }
    .city-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .choosed-item {
      color: #498cea;
      border-left: 4px solid #498cea;
      background-color: #fff;
    }
    .city-iname {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .body-r {
    display: flex;
    flex: auto;
    overflow-y: auto;
    overflow-x: hidden;
    .store-name {
      position: relative;
      width: 100%;
    }
  }
}
</style>