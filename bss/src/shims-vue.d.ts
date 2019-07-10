import Vue from "vue";

declare module "*.vue" {
  export default Vue;
}

interface Options {
  mes?: string;
  icon?: string;
  timeout?: number;
  callback?: () => void;
}

declare module "vue/types/vue" {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $dialog: {
      confirm: (opt: Options) => void;
      alert: (opt: Options) => void;
      toast: (opt: Options) => void;
      notify: (opt: Options) => void;
      loading: {
        (opt: Options): void;
        open: (opt: string) => void;
        close: () => void;
      };
    };
  }
}
