/*
 * @Author: huangpeng 
 * @Date: 2019-06-21 10:49:11 
 * @Last Modified by: huangpeng
 * @Last Modified time: 2019-07-04 22:57:49
 */
<template>
  <div class="lesson-lailai">
    <EchartsComponent :option="option" class="ec-lesson" :ei.sync="ei" :theme="'vintage'"></EchartsComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// import axios from "@/plugins/axios";
import { SaleTs, SaleItemTs } from "@/types/dash";
import { pieLesson } from "@/apis/dash";
import { ECharts } from "echarts";
import { colorList } from "@/utils/course_type";
import { getMoney, formatterNumber, formatterUnit } from "@/utils/dash";
import EchartsComponent from "@/components/vue-echarts/EchartsComponent.vue";

@Component({
  components: {
    EchartsComponent
  }
})
export default class Lesson extends Vue {
  @Prop({
    type: Number,
    default: 1
  })
  type!: string;
  @Prop({
    type: Object,
    default: {}
  })
  order: any;
  private loaded = false;
  private totalCourseAmount = null as any;
  private option = {
    color: [],
    title: {},
    legend: {
      type: "plain",
      icon: "circle",
      itemWidth: 0,
      selectedMode: false, //取消图例上的点击事件
      top: "30",
      left: "150",
      padding: [24, 5],
      orient: "vertical",
      formatter: () => {},
      textStyle: {
        rich: {
          b: {
            fontSize: 12,
            width: 65,
            color: "rgba(153,153,153,1)"
          },
          c: {
            fontSize: 12,
            width: 50,
            color: "rgba(51,51,51,1)"
          },
          d: {
            fontSize: 12,
            color: "rgba(51,51,51,1)"
          }
        }
      },
      bottom: 0
    },
    series: [
      {
        type: "pie",
        avoidLabelOverlap: false,
        radius: [45, 62],
        center: [82, 83],
        seriesLayoutBy: "row",
        label: {
          show: true,
          position: "center",
          rich: {
            a: {
              fontSize: 16,
              fontWeight: "500",
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
  // private mounted() {
  //   axios.get("/data/pie2.json").then((res: any) => {
  //     this.option.series[0].data = res.data.data;
  //     // this.$set(this.option.series[1], "data", res.data.data);
  //     this.option.legend.data = res.data.data;
  //     this.loaded = true;
  //   });
  // }

  private async mounted() {
    this.loaded = true;
  }
  renderPie() {
    this.option.color = [];
    const res = this.order as any;
    let unit =
      this.type == "1" ? "单" : formatterUnit(res.totalCourseAmount, "unit");
    let amount =
      this.type == "1"
        ? res.totalCourseOrders
        : formatterUnit(res.totalCourseAmount, "amount");
    this.option.series[0].label.formatter = () => {
      return [`{a|${amount}}`, `{b|${unit}}`].join("\n");
    };
    const pieData = [] as any; // 图表数据
    res.orderAmounList.length > 0 &&
      res.orderAmounList.map((item: any, index: number) => {
        pieData.push({
          name: item.courseTypeName,
          value: this.type == "1" ? item.courseOrders : item.courseAmount
        });

        this.option.color.push(colorList[item.courseTypeId]);
      });
    if (res.orderAmounList.length == 0) {
      pieData.push({
        name: "暂无课程",
        value: 0
      });
      this.option.color.push("#D7D7D7");
    }
    this.option.series[0].data = pieData;
    this.loaded = true;
  }
  @Watch("order")
  change() {
    this.renderPie();
  }
}
</script>

<style lang="scss" scopd>
.lesson-lailai {
  width: 100%;
  .ec-lesson {
    width: 100%;
    height: 170px;
  }
}
</style>