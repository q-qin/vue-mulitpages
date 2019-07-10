<route-meta>
{
  "title": "合作机构"
}
</route-meta>
<template>
  <div class="cooperator">
    <div class="cooper-title f16 pl8 ks-row" @click="goCitySelect">
      <div class="iconfont iconicon_dingwei cooper-posi pr5"></div>
      <div class="ks-col bk pt5 wb">{{storeName}}</div>
    </div>
    <p class="cooper-time f12 mt5">创建时间：{{storeCreatedtime}}</p>
    <div class="ks-row-middle pl8 f16" style="vertical-align: middle;">
      <div class="notc"></div>
      <div class="ks-col module-head ks-row">
        <div class="ks-col">课程销售</div>
        <div class="sale-select ks-row">
          <div
            @click="chooseLetter(index)"
            v-for="(item,index) in typeList"
            :class="{selected:item.checked}"
            :key="index"
          >{{item.value}}</div>
        </div>
      </div>
    </div>
    <div class="module-body">
      <!-- <div v-show="courseList.orderAmounList.length==0">
        <div class="tc">
          <img class="w120" src="../../../assets/images/nodata.png">
          <div class="g9 f14">暂无数据</div>
        </div>
      </div>-->
      <div>
        <div class="ks-row">
          <div class="ks-col module-notice">销售单量</div>
          <div class="ks-col module-notice">销售金额</div>
        </div>
        <div class="ks-row">
          <div class="ks-col">
            <Lesson :order="courseList" :type="1" />
          </div>
          <div class="ks-col">
            <Lesson :order="courseList" :type="2" />
          </div>
        </div>
      </div>
      <div v-show="courseList.orderAmounList.length!=0">
        <div>
          <div class="module-title f12 ks-row lh45">
            <div class="dib w20 tc"></div>
            <div class="ks-col dib">名称</div>
            <div class="dib w80 tc">销售单量(单)</div>
            <div class="dib w100 tc">销售金额(元)</div>
          </div>
        </div>
        <div
          class="module-detail ks-row-middle f14 lh45"
          v-for="(item,index) in courseList.orderAmounList"
          :key="item.id"
        >
          <div class="dib w20 tc">
            <div class="course-bg" :style="{backgroundColor:getstyle(item.courseTypeId)}"></div>
          </div>
          <div class="ks-col dib over-sts">{{item.courseTypeName}}</div>
          <div class="dib w80 tc over-sts">{{item.courseOrders}}</div>
          <div class="dib w100 tc over-sts">{{computedData(item.courseAmount)}}</div>
        </div>
      </div>
    </div>
    <div class="ks-row-middle pl8 f16" style="vertical-align: middle;">
      <div class="notc"></div>
      <div class="ks-col module-head">课时消耗</div>
    </div>
    <div class="module-body">
      <div>
        <div>
          <p class="f16 g3 b500">总课时</p>
          <div class="ks-row-middle lh30">
            <div>
              <yd-progressbar
                type="line"
                :progress="courseConsumeData.totalUsedPercent?courseConsumeData.totalUsedPercent:0"
                trail-width="4"
                trail-color="#498CEA"
              ></yd-progressbar>
            </div>
            <div
              class="f18 b500 ml20 course-allhour w70"
            >{{(courseConsumeData.totalUsedPercent*100).toFixed(1)}}%</div>
          </div>
          <div class="ks-row f14">
            <div class="w80 course-bdr">
              <div class="b1 f12">已消耗课时</div>
              <div class="g3 mt5">{{courseConsumeData.totalUsedCourseHour}}</div>
            </div>
            <div class="ks-col ml20">
              <div class="b1 f12">剩余课时</div>
              <div class="g3 mt5">{{courseConsumeData.totalLeftCourseHour}}</div>
            </div>
          </div>
        </div>
        <div
          class="mt20"
          v-for="(item,index) in courseConsumeData.courseTypeList"
          :key="item.courseTypeId"
        >
          <p class="f14 g3 b500">{{item.courseTypeName}}</p>
          <div class="ks-row-middle lh30">
            <div>
              <yd-progressbar
                type="line"
                :progress="item.usedPercent?item.usedPercent:0"
                trail-width="3"
                :trail-color="getstyle(item.courseTypeId)"
              ></yd-progressbar>
            </div>
            <div class="f16 b500 ml20 g3 w70">{{(item.usedPercent*100).toFixed(1)}}%</div>
          </div>
          <div class="ks-row f14">
            <div class="w80 course-bdr">
              <div class="bcc f12">已消耗课时</div>
              <div class="c9 mt5">{{item.usedCourseHour}}</div>
            </div>
            <div class="ks-col ml20">
              <div class="bcc f12">剩余课时</div>
              <div class="c9 mt5">{{item.leftCourseHour}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ks-row-middle pl8 f16" style="vertical-align: middle;">
      <div class="notc"></div>
      <div class="ks-col module-head">机构课表</div>
      <div class="f14 g6 mr5">{{tableData.classRooms}}个教室</div>
    </div>
    <div class="module-body">
      <date-picker
        ref="Datepicker"
        :options.sync="tableData.dateTableList"
        v-if="isShowDatePicker"
        @change="change"
        @move="move"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { colorList } from "@/utils/course_type";
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { coursesale, courseconsume, classschedule } from "@/apis/cooperator";
import datePicker from "./__classtable__/classtable.vue";
import { session } from "@/utils/store";
import { formatterNumber } from "@/utils/dash";
// @ts-ignore
import { Loading } from "vue-ydui/dist/lib.rem/dialog";
import Lesson from "./__classtable__/lesson.vue";
import format from "@/filter/format";

@Component({
  components: {
    datePicker,
    Lesson
  }
})
export default class ComponentName extends Vue {
  // colorList: string[] = ["#f1f1f1", "#f2f2f2", "#f3f3f3", "#f4f4f4"];
  courseList: any = { orderAmounList: [] };
  typeList: any[] = [
    { checked: true, value: "日" },
    { checked: false, value: "周" },
    { checked: false, value: "月" },
    { checked: false, value: "年" }
  ];
  storeCreatedtime: string = "";
  storeId: string | (string | null)[] = "";
  storeName: string | (string | null)[] = "";
  totalCourseOrders: string = ""; //总销售单量
  totalCourseAmount: string = ""; //总销售金额
  courseConsumeData: any = [];
  tableData: any = [];
  isSelect = true;
  isShowDatePicker = true;
  isShow = false;
  options: any = {
    markList: []
  };
  loading = true;
  mounted() {
    let date = new Date();
    let info = session.get("storeInfo");
    this.storeId = info.storeId;
    this.storeName = info.storeName;
    this.storeCreatedtime =
      format(info.createdTime, "yyyy") +
      "年" +
      format(info.createdTime, "MM") +
      "月" +
      format(info.createdTime, "dd") +
      "日";
    this.getStorecitys(1);
    this.courseconsume();
  }
  getstyle(index: number) {
    // console.log(index);
    return colorList[index];
  }
  goCitySelect() {
    this.$router.push("/replcecoper");
  }
  async getStorecitys(index: number) {
    Loading.open("数据加载中");
    try {
      let data = await coursesale({
        storeId: Number(this.storeId),
        dateRegion: Number(index)
      });
      data.orderAmounList =
        data.orderAmounList == null ? [] : data.orderAmounList;
      data.totalCourseAmount =
        data.totalCourseAmount == null ? 0 : data.totalCourseAmount;
      data.totalCourseOrders =
        data.totalCourseOrders == null ? 0 : data.totalCourseOrders;
      this.courseList = data;
    } catch (error) {}

    Loading.close();
  }
  async courseconsume() {
    let data = await courseconsume({
      storeId: Number(this.storeId)
    });
    this.courseConsumeData = data;
  }
  async classschedule(selectedTime: string) {
    Loading.open("数据加载中");
    try {
      let data = await classschedule({
        storeId: Number(this.storeId),
        queryDate: selectedTime
      });
      this.tableData = data;
    } catch (error) {}

    Loading.close();
  }

  computedData(item: number) {
    return formatterNumber(item);
  }
  // 切换日期
  change(value: any) {
    // console.log("123", value);
    let selectedTime: string = value.year + "-" + value.month;
    this.classschedule(selectedTime);
    // this.courseList = this.options.markList.filter(
    //   (i: any) => i.classDate === value
    // );
  }
  // 左右滑动时隐藏课程信息
  move(flag: any) {
    // console.log(flag);
    this.isSelect = flag;
  }
  chooseLetter(index: number) {
    let data = this.typeList[index];
    if (data.checked) {
      return;
    }
    this.typeList.forEach(item => {
      item.checked = false;
    });
    data.checked = true;
    this.$set(this.typeList, index, data);
    this.getStorecitys(index + 1);
  }
}
</script>

<style lang="scss" scoped>
.cooperator {
  background: rgba(245, 245, 245, 1);
  padding: 8px;
  .wb {
    word-break: break-all;
  }
  .b1 {
    color: rgba(177, 177, 177, 1);
  }
  .bcc {
    color: rgba(188, 192, 210, 1);
  }
  .c9 {
    color: rgba(153, 153, 153, 1);
  }
  .cooper-title {
    color: #498cea;
    font-weight: 500;
  }
  .cooper-posi {
    font-size: 24px;
  }
  .cooper-time {
    color: rgba(153, 153, 153, 1);
    line-height: 16px;
    padding-left: 28px;
  }
  .notc {
    margin: 0 4px 0 8px;
    width: 4px;
    height: 12px;
    background: rgba(73, 140, 234, 1);
    border-radius: 2px;
  }
  .module-head {
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin: 14px 0 14px 0;
  }
  .module-body {
    color: rgba(102, 102, 102, 1);
    padding: 16px 16px 24px 16px;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
  }
  .module-notice {
    text-align: center;
    font-weight: 400;
    color: rgba(73, 140, 234, 1);
    line-height: 20px;
    font-size: 14px;
  }
  .module-title {
    color: rgba(177, 177, 177, 1);
  }
  .course-bg {
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }
  .over-sts {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .course-allhour {
    color: rgba(73, 140, 234, 1);
  }
  .course-bdr {
    border-right: 1px solid#D8D8D8;
  }
  .sale-select {
    border-radius: 12px;
    border: 1px solid rgba(226, 226, 226, 1);
    div {
      font-size: 12px;
      padding: 0 8px;
      border-radius: 12px;
      line-height: 24px;
      color: #333;
    }
    .selected {
      background-color: #fff;
      color: rgba(73, 140, 234, 1);
    }
  }
}
</style>