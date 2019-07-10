/*
 * @Author: huangpeng 
 * @Date: 2019-06-21 10:49:11 
 * @Last Modified by: huangpeng
 * @Last Modified time: 2019-07-02 16:57:28
 */
<template>
  <div class="lesson-operate">
    <!-- <div class="loading-box" v-if="!loaded">加载中...</div> -->

    <EchartsComponent
      v-if="isLoading"
      :option="option"
      class="ec-o"
      :ei.sync="ei"
      :theme="'vintage'"
    ></EchartsComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { pieOperate } from "@/apis/dash";
import { ECharts } from "echarts";
import { colorList } from "@/utils/course_type";
import { getMoney, formatterNumber, getMoneyx } from "@/utils/dash";
import EchartsComponent from "@/components/vue-echarts/EchartsComponent.vue";

@Component({
  components: {
    EchartsComponent
  }
})
export default class LessonOperate extends Vue {
  get isLoading() {
    return !this.$store.state.isLoading;
  }
  private loaded = false;
  private totalCourseAmount = null as any;
  private option = {
    color: ["#a288ff", "#498cea"],
    legend: {
      type: "plain",
      icon: "circle",
      itemWidth: 10,
      orient: 'vertical',
      selectedMode: false, //取消图例上的点击事件
      top: "68",
      right: 5,
      formatter: () => {},
      textStyle: {
        rich: {
          aa: {
            width: 10,
            height: 10,
            backgroundColor: "#a288ff",
            borderRadius: 10,
            lineHeight: 25
          },
          ab: {
            width: 10,
            height: 10,
            backgroundColor: "#498cea",
            borderRadius: 10,
            lineHeight: 25
          },
          b: {
            fontSize: 12,
            color: "rgba(153,153,153,1)"
          },
          c: {
            fontSize: 12,
            width: 65,
            align: "right",
            color: "rgba(51,51,51,1)"
          },
          d: {
            fontSize: 12,
            width: 45,
            color: "rgba(51,51,51,1)",
            align: "right"
          }
        }
      }
    },
    series: [
      {
        type: "pie",
        avoidLabelOverlap: false,
        // hoverAnimation: false,
        radius: [45, 62],
        center: [75, 93],
        seriesLayoutBy: "row",
        label: {
          show: true,
          position: "center",
          lineHeight: 30,
          rich: {
            a: {
              fontSize: 18,
              fontWeight: "600",
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
    const res = (await pieOperate({ dateRegion: 4 })) as any;
    if (!res) {
      return;
    }
    if (res.courseHours > 99999999) {
      this.option.series[0].label.rich.a.fontSize = 13;
    }
    this.option.series[0].label.formatter = () => {
      return [`{a|${formatterNumber(+res.courseHours)}}`, `{b|课时}`].join(
        "\n"
      );
    };
    const datares = [
      {
        value: res.usedCourseHour,
        name: "已使用课时"
      },
      {
        value: res.leftCourseHour,
        name: "剩余课时　"
      }
    ];

    const legenddata = [
      {
        value: res.usedCourseHour,
        name: "已使用课时",
        item: "aa",
        per: res.usedCourseHourPercent
      },
      {
        value: res.leftCourseHour,
        name: "剩余课时　",
        item: "ab",
        per: res.leftCourseHourPercent
      }
    ];
    this.option.legend.data = legenddata;
    this.option.series[0].data = datares;
    this.option.legend.formatter = (name: any) => {
      const data = legenddata;
      let total = 0 as any;
      let target = null as any;
      let circle;
      let per = null as any;
      for (let i = 0, l = data.length; i < l; i++) {
        total += data[i].value;
        if (data[i].name == name) {
          target = data[i].value;
          circle = data[i].item;
          per = data[i].per;
        }
      }
      const arr = [
        "{b|" +
          name +
          "}" +
          "{c|" +
          `${getMoneyx(target)}` +
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
.lesson-operate {
  width: 100%;
  .loading-box {
    width: 100%;
    height: 190px;
  }
  .ec-o {
    width: 100%;
    height: 190px;
  }
}
</style>