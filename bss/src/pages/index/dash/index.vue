/*
 * @Author: huangpeng 
 * @Date: 2019-06-21 10:49:11 
 * @Last Modified by: huangpeng
 * @Last Modified time: 2019-07-02 16:20:40
 */
 <route-meta>
{
  "loading": "1",
   "title": "仪表盘"
}
</route-meta>
<template>
  <div class="dash">
    <yd-cell-group class="dash-top">
      <yd-cell-item>
        <span slot="left" class="construct-title">
          <i class="II" />
          签约
        </span>
        <span slot="right" class="top-switch">
          <span
            @click="monthClick"
            v-if="isLine"
            style="font-size: 14px"
            :class="isMonth ? offMonth : onMonth"
          >月</span>
          <span
            @click="yearClick"
            v-if="isLine"
            style="font-size: 14px"
            :class="isMonth ? onMonth : offMonth"
          >年</span>
        </span>
        <span slot="right" class="top-switch">
          <span @click="pieClick" :class="isLine ? offPie : onPie" style="font-size: 22px;"></span>
          <span @click="lineClick" :class="isLine ? onLine : offLine" style="font-size: 22px"></span>
        </span>
      </yd-cell-item>
    </yd-cell-group>
    <div v-if="!isLine" class="dash-content">
      <Contract @loadOk="ContractLoaded" />
    </div>
    <div v-if="isLine" class="dash-content">
      <LineContract :isMonth="isMonth" />
    </div>
    <yd-cell-group class="dash-top">
      <yd-cell-item>
        <span slot="left" class="construct-title">
          <i class="II" />
          课程销售
        </span>
      </yd-cell-item>
    </yd-cell-group>
    <div v-if="!isLine" class="dash-content">
      <Lesson @loadOk="LessonLoaded" />
    </div>
    <div v-if="isLine" class="dash-content">
      <LineLesson :isMonth="isMonth" />
    </div>
    <yd-cell-group class="dash-top" v-if="!isLine">
      <yd-cell-item>
        <span slot="left" class="construct-title">
          <i class="II" />
          课程运营
        </span>
      </yd-cell-item>
    </yd-cell-group>
    <div v-if="!isLine" class="dash-content">
      <LessonOperate @loadOk="LessonOperateLoaded" />
      <div v-if="!isLine" class="constract-content-ispie"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";
// @ts-ignore
import { Loading } from "vue-ydui/dist/lib.rem/dialog";
@Component({
  components: {
    Contract: () => import("./__pie__/contract.vue"),
    Lesson: () => import("./__pie__/lesson.vue"),
    LessonOperate: () => import("./__pie__/lessonOperate.vue"),
    LineContract: () => import("./__lines__/line-constract.vue"),
    LineLesson: () => import("./__lines__/line-lesson.vue")
  }
})
export default class Dash extends Vue {
  private isLine = false;
  private isMonth = false;
  private onPie = "iconfont b iconicon_pie onPie";
  private offPie = "iconfont b iconicon_pie offPie";
  private onLine = "iconfont b iconicon_brokenline onLine";
  private offLine = "iconfont b iconicon_brokenline offLine";
  private onMonth = "onPie";
  private offMonth = "offPie";
  private onYear = "onLine";
  private offYear = "offLine";
  load = {
    constract: 2,
    lesson: 2,
    lessonOperate: 2
  };
  private pieClick() {
    this.isLine = false;
    this.isMonth = true;
  }

  private lineClick() {
    this.isLine = true;
    this.isMonth = false;
  }

  private monthClick() {
    this.isMonth = false;
  }

  private yearClick() {
    this.isMonth = true;
  }

  ContractLoaded(val: any) {
    this.load.constract = 1;
    if (
      this.load.constract === 1 &&
      this.load.lesson === 1 &&
      this.load.lessonOperate === 1
    ) {
      store.commit("updateLoadingStatus", false);
    }
  }
  LessonLoaded(val: any) {
    this.load.lesson = 1;
    if (
      this.load.constract === 1 &&
      this.load.lesson === 1 &&
      this.load.lessonOperate === 1
    ) {
      store.commit("updateLoadingStatus", false);
    }
  }
  LessonOperateLoaded(val: any) {
    this.load.lessonOperate = 1;
    if (
      this.load.constract === 1 &&
      this.load.lesson === 1 &&
      this.load.lessonOperate === 1
    ) {
      store.commit("updateLoadingStatus", false);
    }
  }

  private async mounted() {}
}
</script>

<style lang="scss">
.dash-content {
  background: #fff;
  margin: 0 8px;
  border-radius: 6px;
}

.II {
  width: 3px;
  height: 12px;
  display: inline-block;
  background: rgba(0, 159, 232, 1);
  border-radius: 2px;
}

.top-switch {
  display: inline-block;
  border: 1px solid rgba(225, 225, 225, 1);
  border-radius: 12px;
  margin-right: 8px;
}

.dash {
  background: #f2f2f2;
  .dash-top {
    margin-bottom: 0;
    .yd-cell-right {
      padding-right: 0
    }
    .construct-title {
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }
    .yd-cell {
      background: none;
    }
    .yd-cell:after {
      height: 0;
    }
  }
}

.constract-content {
  padding: 8px;
  p {
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
  }
  b {
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    margin-left: 8px;
  }
}

.onPie,
.onLine {
  color: #039fe8;
  display: inline-block;
  width: 38px;
  height: 22px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(177, 177, 177, 0.2);
  text-align: center;
  line-height: 22px;
  border-radius: 12px;
  padding: 0 8px;
}

.offPie,
.offLine {
  color: #333;
  display: inline-block;
  width: 38px;
  height: 22px;
  text-align: center;
  background: #f2f2f2;
  line-height: 22px;
  border-radius: 12px;
  padding: 0 8px;
}
</style>