/*
 * @Author: huangpeng 
 * @Date: 2019-06-21 10:49:11 
 * @Last Modified by: huangpeng
 * @Last Modified time: 2019-07-02 14:23:59
 */
<template>
  <div class="contract">
    <!-- <div class="tc" v-if="option.series[0].data.length=0">
            <img class="w120" src="../../assets/images/nostore.png">
            <div class="g9 f14">暂无数据</div>
    </div>-->

    <EchartsComponent v-if="isLoading" :option="option" class="ec" :ei.sync="ei" :theme="'vintage'"></EchartsComponent>
    <!-- <div class="constract-content-ispiec">
      <p>
        合作费：
        <span>{{totalCourseAmount}}</span>
      </p>
    </div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { pieConstruct } from "@/apis/dash";
import { ECharts } from "echarts";
import { colorList } from "@/utils/course_type";
import { getMoney, formatterNumber } from "@/utils/dash";
import EchartsComponent from "@/components/vue-echarts/EchartsComponent.vue";

@Component({
  components: {
    EchartsComponent
  }
})
export default class Contract extends Vue {
  get isLoading() {
    return !this.$store.state.isLoading;
  }
  loaded = false;
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
      bottom: 15
    },
    legend: {
      type: "plain",
      icon: "circle",
      orient: 'vertical',
      itemWidth: 10,
      top: "55",
      right: 5,
      selectedMode: false, //取消图例上的点击事件
      formatter: () => {},
      textStyle: {
        rich: {
          aa: {
            width: 10,
            height: 10,
            backgroundColor: "#f99a3d",
            borderRadius: 10
          },
          ab: {
            width: 10,
            height: 10,
            backgroundColor: "#039fe8",
            borderRadius: 10
          },
          ac: {
            width: 10,
            height: 10,
            backgroundColor: "#ff6e72",
            borderRadius: 10
          },
          b: {
            fontSize: 12,
            width: 60,
            color: "rgba(153,153,153,1)"
          },
          c: {
            fontSize: 12,
            width: 45,
            align: "right",
            color: "rgba(51,51,51,1)"
          },
          d: {
            fontSize: 12,
            color: "rgba(51,51,51,1)",
            align: "right",
            width: 60
          }
        }
      }
    },
    series: [
      {
        type: "pie",
        // hoverAnimation: false,
        avoidLabelOverlap: false,
        radius: [45, 62],
        center: [75, 93],
        seriesLayoutBy: "row",
        data: [],
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
    const res = (await pieConstruct({ dateRegion: 4 })) as any;
    if (!res) {
      return;
    }
    this.totalCourseAmount = getMoney(res.totalAmount);
    this.option.series[0].label.formatter = () => {
      return [`{a|${formatterNumber(res.totalStores)}}`, `{b|家}`].join("\n");
    };
    this.option.title.text = `合作费：${this.totalCourseAmount}`;
    const pieData = [] as any; // 图表数据
    const courseData = [] as any;
    this.option.legend.data = res.storeTypeList;
    res.storeTypeList.length > 0 &&
      res.storeTypeList.map((item: any, index: number) => {
        pieData.push({
          name: item.storeTypeName,
          value: item.stores
        });

        courseData.push({
          value: item.stores,
          name: item.storeTypeName,
          per: item.storePercent
        });

        this.option.color = ["#ff9e40", "#019fe8", "#ff6e72"];
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
          target +
          "家" +
          "}" +
          "{d|" +
          (per * 100).toFixed(1) +
          "%}"
      ];
      return arr;
    };
    this.$emit("loadOk", 1);
  }
}
</script>

<style lang="scss" scopd>
.contract {
  width: 100%;
  position: relative;
  .loading-box {
    width: 100%;
    height: 190px;
  }
  .ec {
    width: 100%;
    height: 190px;
  }

  .constract-content-ispiec {
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