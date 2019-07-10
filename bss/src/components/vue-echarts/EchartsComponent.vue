/*
 * @Author: huangpeng 
 * @Date: 2019-06-21 10:48:39 
 * @Last Modified by: huangpeng
 * @Last Modified time: 2019-06-22 12:56:31
 */
<template>
  <div class="vue-echarts" ref="ele"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import echarts from "echarts/lib/echarts"; // 基本模板
import { ECharts, EChartOption } from "echarts";
// 按需引入组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
declare global {
  interface Window {
    attachEvent(type: string, callback: any): void;
    detachEvent(type: string, callback: any): void;
  }
}
interface EchartsInitOption {
  devicePixelRatio?: number; // 设备像素比，默认取浏览器的值window.devicePixelRatio。
  renderer?: string; // 渲染器
  width?: number | string; // 可显式指定实例宽度，单位为像素 null/undefined/'auto'
  height?: number | string; // 可显式指定实例高度，单位为像素 null/undefined/'auto'
}
@Component
export default class EchartsComponent extends Vue {
  private echartsInstance!: ECharts;
  @Prop() private ei!: ECharts; // 用于子父组件双向绑定图表实例
  @Prop() private option!: EChartOption; // 图标属性配置对象
  @Prop() private theme?: string; // 主题
  @Prop() private initOption?: EchartsInitOption; // 初始化配置
  @Watch("option", { deep: true }) // 深度监听option
  private optionChanged(v: EChartOption, oldV: EChartOption) {
    this.renderEcharts();
  } // 用于参数改变重新渲染图表。
  private resizeEventHandler(): void {
    this.echartsInstance.resize(); // 改变图表尺寸，在容器大小发生改变时需要手动调用。
  }
  private Init() {
    if (this.option) {
      this.echartsInstance = echarts.init(
        this.$refs.ele as HTMLDivElement,
        this.theme,
        this.initOption
      ); // 创建图标实例
      this.$emit("update:ei", this.echartsInstance); // 给父组件传递图表实例
      if (window.addEventListener) {
        window.addEventListener("resize", this.resizeEventHandler, false); // 图表发生变化改变尺寸
      } else if (window.attachEvent) {
        // 兼容IE
        window.attachEvent("resize", this.resizeEventHandler);
      }
    }
  }
  private renderEcharts() {
    if (this.option && this.echartsInstance) {
      this.echartsInstance.setOption(this.option);
      this.$emit("instance", this.echartsInstance);
    }
  }
  private mounted() {
    this.Init(); // 初始化实例和参数
    this.renderEcharts(); // 渲染图表
  }
  private destoryed() {
    this.$emit("instance", null); // 清空实例
    if (window.removeEventListener) {
      // 监控尺寸
      window.removeEventListener("resize", this.resizeEventHandler, false);
    } else if (window.detachEvent) {
      // 兼容IE
      window.detachEvent("resize", this.resizeEventHandler);
    }
    this.echartsInstance.dispose(); // 销毁实例，实例销毁后无法再被使用。
  }
}
</script>

<style scoped>
.vue-echarts {
  width: 100vw;
}
</style>
