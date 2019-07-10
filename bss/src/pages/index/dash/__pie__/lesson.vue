/*
 * @Author: huangpeng 
 * @Date: 2019-06-21 10:49:11 
 * @Last Modified by: huangpeng
 * @Last Modified time: 2019-07-02 14:48:07
 */
<template>
  <div class="lesson">
    <!-- <div class="loading-box" v-if="!loaded">加载中...</div> -->

    <EchartsComponent
      v-if="isLoading"
      :option="option"
      class="ec-lesson"
      :ei.sync="ei"
      :theme="'vintage'"
    ></EchartsComponent>
    <!-- <div class="constract-content-ispiel">
      <p>
        课程费：
        <span>{{totalCourseAmount}}</span>
      </p>
    </div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// import axios from "@/plugins/axios";
import { SaleTs, SaleItemTs } from "@/types/dash";
import { pieLesson } from "@/apis/dash";
import { ECharts } from "echarts";
import { colorList } from "@/utils/course_type";
import { getMoney, formatterNumber, getMoneyd } from "@/utils/dash";
import EchartsComponent from "@/components/vue-echarts/EchartsComponent.vue";

@Component({
  components: {
    EchartsComponent
  }
})
export default class Lesson extends Vue {
  get isLoading() {
    return !this.$store.state.isLoading;
  }
  private loaded = false;
  private totalCourseAmount = null as any;
  private option = {
    color: [],
    title: {
      text: "",
      textStyle: {
        fontSize: 14,
        color: "rgba(102, 102, 102, 1)",
        fontWeight: 0
      },
      right: 5,
      bottom:15
    },
    legend: {
      type: "plain",
      icon: "circle",
      itemWidth: 10,
      selectedMode: false, //取消图例上的点击事件
      top: "30",
      right: 5,
      padding: [24, 5],
      orient: "vertical",
      formatter: () => {},
      textStyle: {
        rich: {
          b: {
            fontSize: 12,
            width: 60,
            color: "rgba(153,153,153,1)"
          },
          c: {
            fontSize: 12,
            width: 55,
            align: "right",
            color: "rgba(51,51,51,1)"
          },
          d: {
            fontSize: 12,
            color: "rgba(51,51,51,1)",
            align: "right",
            width: 50
          }
        }
      },
      bottom: 0
    },
    series: [
      {
        type: "pie",
        avoidLabelOverlap: false,
        // hoverAnimation: false,
        radius: [45, 62],
        center: [75, 123],
        seriesLayoutBy: "row",
        label: {
          show: true,
          position: "center",
          rich: {
            a: {
              fontSize: 18,
              fontWeight: "600",
              lineHeight: 30,
              padding: [0, 0, 15, 0],
              color: ["rgba(51,51,51,1)"]
            },
            b: {
              fontSize: 14,
              fontWeight: "400",
              align: "center",
              lineHeight: 30,
              color: ["rgba(51,51,51,1)"]
            }
          }
        }
      }
    ]
  } as any;
  private ei: any | ECharts = {};
  private async mounted() {
    const res = (await pieLesson({ dateRegion: 4 })) as any;
    if (!res) {
      return;
    }
    this.totalCourseAmount = getMoney(res.totalCourseAmount);
    this.option.series[0].label.formatter = () => {
      return [`{a|${formatterNumber(res.totalCourseSales)}}`, `{b|单}`].join(
        "\n"
      );
    };
    this.option.title.text = `课程费：${this.totalCourseAmount}`;
    const pieData = [] as any; // 图表数据
    const courseData = [] as any;
    res.courseOrderTypeList.length > 0 &&
      res.courseOrderTypeList.map((item: any, index: number) => {
        pieData.push({
          name: item.courseTypeName,
          value: item.courseOrders
        });
        courseData.push({
          value: item.courseOrders as any,
          name: item.courseTypeName,
          per: item.courseOrdersPercent
        });
        this.option.color.push(colorList[item.courseTypeId]);
      });
    this.option.series[0].data = pieData;
    this.option.legend.data = pieData;
    this.option.legend.formatter = (name: any) => {
      let total = 0;
      let target;
      let circle;
      let per = null as any;
      for (let i = 0, l = courseData.length; i < l; i++) {
        total += courseData[i].value;
        if (courseData[i].name == name) {
          target = courseData[i].value;
          circle = courseData[i].item;
          per = courseData[i].per;
        }
      }
      const arr = [
        "{b|" +
          name +
          "}" +
          "{c|" +
          getMoneyd(target) +
          "}" +
          "{d|" +
          (per * 100).toFixed(1) +
          "%}"
      ];
      return arr.join("\n");
    };
    this.$emit("loadOk", 1);
  }
}
</script>

<style lang="scss" scopd>
.lesson {
  width: 100%;
  position: relative;
  .loading-box {
    width: 100%;
    height: 190px;
  }
  .ec-lesson {
    width: 100%;
    height: 270px;
  }

  .constract-content-ispiel {
    position: absolute;
    bottom: 10px;
    right: 16px;
    text-align: right;
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
}
</style>