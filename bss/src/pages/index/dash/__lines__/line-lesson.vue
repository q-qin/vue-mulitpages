/*
 * @Author: huangpeng 
 * @Date: 2019-06-21 10:49:11 
 * @Last Modified by: huangpeng
 * @Last Modified time: 2019-07-02 17:45:12
 */
<template>
  <div class="line-lesson">
    <div class="loading-box" v-if="!loaded">加载中...</div>
    <div class="contract-bottom">{{lesson.time}}：{{lesson.store}}单, {{lesson.const}}</div>
    <EchartsComponent v-if="loaded" :option="option" class="ec-l" :ei.sync="ei" :theme="'vintage'"></EchartsComponent>
    <div class="contract-top">{{lessonN.time}}：{{lessonN.store}}单, {{lessonN.const}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { lineLesson } from "@/apis/dash";
import { ECharts } from "echarts";
import { getCurrentDay, getCurrentMonth, getMoney } from "@/utils/dash";
import EchartsComponent from "@/components/vue-echarts/EchartsComponent.vue";

@Component({
  components: {
    EchartsComponent
  }
})
export default class LineLesson extends Vue {
  @Prop()
  private isMonth!: boolean;
  private loaded = false;
  private lesson = {
    // time: "2019.06.19",
    // store: "3",
    // const: 48
  } as any;
  private lessonN = {};
  private optionMonth = {
    grid: {
      x: 45,
      y: 35,
      x2: 25,
      y2: 20
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "rgba(73,140,234,1)"
        }
      },
      formatter: () => {
        return null;
      },
      position: () => {}
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
      axisLine: {
        show: false //隐藏X轴轴线
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: () => {}
      },
      axisTick: {
        lineStyle: {
          color: "#ddd"
        }
      }
    },
    yAxis: {
      type: "value",
      name: "单位: 单",
      axisLine: {
        show: false //隐藏X轴轴线
      },
      axisTick: {
        show: false //隐藏X轴刻度
      },
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    },
    series: [
      {
        type: "line",
        //  smooth:true,
        symbol: "circle",
        symbolSize: (res: any, param: any) => {
          const nowdate = `${new Date().getMonth() +
            1}.${new Date().getDate()}`;
          const currentIndex = nowdate.split(".")[1] as any;
          const currentDate = new Date(res[0]).getDate() as any;
          if (currentDate > currentIndex && res[1] === 0) {
            return 0;
          }
          return 6;
        },
        itemStyle: {
          color: "rgba(250,100,0,1)"
        },
        lineStyle: {
          color: "#498cea",
          width: 2,
          shadowColor: "#498cea",
          shadowBlur: 10,
          shadowOffsetY: 7
        }
      },
      {
        type: "line",
        symbol: "circle",
        symbolSize: 0,
        lineStyle: {
          width: 0
        }
      }
    ]
  } as any;
  private optionYear = {
    grid: {
      x: 45,
      y: 35,
      x2: 25,
      y2: 20
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "rgba(73,140,234,1)"
        }
      },
      formatter: () => {
        return null;
      }
    },
    xAxis: {
      boundaryGap: false,
      axisLine: {
        show: false //隐藏X轴轴线
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        interval: 0
      },
      axisTick: {
        lineStyle: {
          color: "#ddd"
        }
      }
    },
    yAxis: {
      type: "value",
      name: "单位: 单",
      axisLine: {
        show: false //隐藏X轴轴线
      },
      axisTick: {
        show: false //隐藏X轴刻度
      },
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    },
    series: [
      {
        type: "line",
        symbol: "circle",
        symbolSize: (res: any, param: any) => {
          const nowdate = new Date().getMonth() + 1;
          const currentDate = +param.data.name.replace("月", "");
          if (currentDate > nowdate) {
            return 0;
          }
          return 6;
        },
        itemStyle: {
          color: "rgba(250,100,0,1)"
        },
        lineStyle: {
          normal: {
            color: "#498cea",
            width: 2,
            shadowColor: "#498cea",
            shadowBlur: 10,
            shadowOffsetY: 7
          }
        }
      },
      {
        type: "line",
        symbol: "circle",
        symbolSize: 0,
        lineStyle: {
          width: 0
        }
      }
    ]
  } as any;
  private option = {};
  private ei: any | ECharts = {};

  private async mounted() {
    this.changeMonth();
  }

  async changeMonth() {
    const res = (await lineLesson({ dateRegion: 3 })) as any;
    if (!res) {
      return;
    }
    let lineData = [] as any;
    res.courseList.map((item: any) => {
      lineData.push([item.saleTime, item.courseAmount, item.sales]);
    });
    let datares = [] as any;
    const nowdate = `${new Date().getMonth() + 1}.${new Date().getDate()}`;
    const currentIndex = nowdate.split(".")[1] as any;
    getCurrentDay().forEach((v: any) => {
      const d1 = lineData.find(
        (i: any) =>
          v ===
          `${new Date(i[0]).getFullYear()}.${new Date(i[0]).getMonth() +
            1}.${new Date(i[0]).getDate()}`
      );
      const d2 = lineData.find(
        (i: any) =>
          v ===
          `${new Date(i[0]).getFullYear()}.${new Date(i[0]).getMonth() +
            1}.${new Date(i[0]).getDate()}`
      );
      datares.push([
        new Date(v.replace(/\./g, "/")).getTime(),
        d1 ? d1[2] : 0,
        d2 ? d1[1] : 0
      ]);
    });
    const datares2 = datares.slice(currentIndex);
    this.optionMonth.series[0].data = datares.slice(0, currentIndex);
    this.optionMonth.series[1].data = datares2;
    this.optionMonth.xAxis.axisLabel.formatter = (value: any, idx: number) => {
      return [new Date(value).getMonth() + 1, new Date(value).getDate()].join(
        "."
      );
    };
    // 当天数据
    const current = datares.find(
      (item: any) =>
        nowdate ===
        `${new Date(item[0]).getMonth() + 1}.${new Date(item[0]).getDate()}`
    );
    this.lessonN = {
      // time: `${new Date().getFullYear()}年${new Date().getMonth() +
      //   1}月${new Date().getDate()}日`,
      time: '今日',
      store: current ? current[1] : 0,
      const: current ? getMoney(current[2]) : 0
    };
    this.lesson = this.lessonN;
    setTimeout(() => {
      this.ei.dispatchAction({
        type: "showTip",
        seriesIndex: 0, // 显示第几个series
        dataIndex: currentIndex - 1 // 显示第几个数据
      });
    });
    this.optionMonth.tooltip.position = (pos: any, params: any) => {
      this.lesson = {
        time: `${new Date(params[0].data[0]).getFullYear()}年${new Date(
          params[0].data[0]
        ).getMonth() + 1}月${new Date(params[0].data[0]).getDate()}日`,
        store: params[0].data[1],
        const: getMoney(params[0].data[2])
      };
    };
    this.option = this.optionMonth;
    this.loaded = true;
  }

  async changeYear() {
    const res = (await lineLesson({ dateRegion: 4 })) as any;
    if (!res) {
      return;
    }
    let lineData = [] as any;
    let xRes = [] as any;
    getCurrentMonth().forEach((v: any) => {
      const item = v.split("-")[1];
      const d = res.courseList.find(
        (x: any) =>
          `${
            new Date(x.saleTime).getMonth() + 1 >= 10
              ? new Date(x.saleTime).getMonth() + 1
              : "0" + (new Date(x.saleTime).getMonth() + 1)
          }` === v.split("-")[1]
      );
      xRes.push(item >= 10 ? item + "月" : item.replace("0", "") + "月");
      lineData.push({
        name: item >= 10 ? item + "月" : item.replace("0", "") + "月",
        value: d ? d.sales : 0,
        courseAmount: d ? d.courseAmount : 0
      });
    });
    this.optionYear.xAxis.type = "category";
    this.optionYear.xAxis.data = xRes;
    this.optionYear.series[0].data = lineData.slice(
      0,
      new Date().getMonth() + 1
    );
    this.optionYear.series[1].data = lineData.slice(new Date().getMonth() + 1);

    // 当天数据
    const nowdate = `${new Date().getMonth() + 1}月`;
    const current = lineData.find((item: any) => nowdate === item.name);
    this.lessonN = {
      // time: `${new Date().getFullYear()}年${new Date().getMonth() + 1}月`,
      time: '本月',
      store: current ? current.value : 0,
      const: current ? getMoney(current.courseAmount) : 0
    };
    this.lesson = this.lessonN;
    setTimeout(() => {
      this.ei.dispatchAction({
        type: "showTip",
        seriesIndex: 0, // 显示第几个series
        dataIndex: new Date().getMonth() + 1 - 1 // 显示第几个数据
      });
    });
    const currenMonth = (this.optionYear.tooltip.position = (
      pos: any,
      params: any
    ) => {
      this.lesson = {
        time: `${new Date().getFullYear()}年${params[0].data.name}`,
        store: params[0].data.value,
        const: getMoney(params[0].data.courseAmount)
      };
    });
    this.option = this.optionYear;
    this.loaded = true;
  }

  @Watch("isMonth")
  change() {
    if (this.isMonth) {
      this.loaded = false;
      this.changeYear();
    } else {
      this.loaded = false;
      this.changeMonth();
    }
  }
}
</script>

<style lang="scss" scopd>
.line-lesson {
  width: 100%;
  .loading-box {
    width: 100%;
    height: 190px;
  }
  .contract-top {
    font-size: 14px;
    font-weight: 400;
    color: rgba(73, 140, 234, 1);
    padding: 16px 0 16px 16px;
  }
  .contract-bottom {
    font-size: 12px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    padding: 10px 0 0 12px;
  }
  .ec-l {
    width: 100%;
    height: 200px;
  }
}
</style>