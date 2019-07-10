import todate from "./format";
import { VueConstructor } from "vue";

const Filter: any = {
  todate
};

export default function install(Vue: VueConstructor) {
  Object.keys(Filter).forEach(i => {
    Vue.filter(i, Filter[i]);
  });
}
