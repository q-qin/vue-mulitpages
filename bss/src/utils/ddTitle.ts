import * as dd from "dingtalk-jsapi";
import { DingTalk } from "@/utils/browser";
export function setTitle(title: string) {
  if (DingTalk) {
    dd.ready(function() {
      // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
      dd.biz.navigation.setTitle({
        title //控制标题文本，空字符串表示显示默认文本
      });
    });
  }
}
