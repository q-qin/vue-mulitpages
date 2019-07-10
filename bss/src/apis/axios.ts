import axios from "axios";
import router from "../router";
import { session } from "@/utils/store";
// @ts-ignore
import { Toast } from "vue-ydui/dist/lib.rem/dialog";
const instance = axios.create();
const Root: Host = {
  "boss.mofangge.cc": "http://dev-erp-manage.mofangge.cc", //开发
  "boss.mofangge.net": "http://erp-system.mofangge.net", //测试
  "school.yingmengai.com": "https://admin.yingmengai.com", //预发布
  "school.ymsteam.com": "https://admin.ymsteam.com" //正式
};
interface Host {
  "boss.mofangge.cc": string;
  "boss.mofangge.net": string;
  "school.yingmengai.com": string;
  "school.ymsteam.com": string;
}
const rootApi: string = Root[<keyof Host>window.location.host];
instance.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "/" : rootApi + "/api";
instance.defaults.timeout = 10000;
instance.interceptors.request.use(
  config => {
    config.headers.common["storeid"] = 0;
    if (!!session.get("access_token")) {
      config.headers.common["Authorization"] =
        "Bearer " + session.get("access_token");
      config.headers.common["token"] = session.get("access_token");
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  response => {
    if (response.data.code === 20000) {
      return response.data.data;
    } else {
      Toast({
        mes: response.data.message,
        timeout: 1500
      });
      return Promise.reject(response.data);
    }
  },
  err => {
    if (err.message && err.message.indexOf("timeout") !== -1) {
      Toast({
        mes: "连接超时,请稍后再试！",
        timeout: 1500
      });
    } else {
      if (err.response.status === 401) {
        router.push("/login");
        Toast({
          mes: "您的账号在其他地方登录，请重新登录！",
          timeout: 1500
        });
        return new Promise(() => {});
      }
      Toast({
        mes: "网络异常,请稍后再试！",
        timeout: 1500
      });
    }

    return Promise.reject(err);
  }
);

export default instance;
