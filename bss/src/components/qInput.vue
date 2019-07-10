<template>
  <ul class="ks-row-middle f14 inputborder" :class="show?'acitveborder':'border'">
    <li class="ml10 ks-col">
      <input
        class="g3"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input',$event.target.value)"
        :maxlength="maxlength"
        @focus="$emit('focus'),show=true"
        @blur="filterinput"
        :readonly="readonly"
      >
    </li>
    <li class="pr10 pl10" v-show="!readonly">
      <yd-icon
        name="error"
        v-show="!!value&&show"
        @click.native="close"
        size="14px"
        color="#D8D8D8"
      ></yd-icon>
    </li>
    <li class="pr10">
      <slot></slot>
    </li>
  </ul>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    filterinput(event) {
      this.show = false;
      let value = event.target.value;
      let reg = /[0-9]/g;
      let arr = value.match(reg) || [];
      let str = arr.join("");
      this.$emit("input", str);
      this.$emit("blur");
    },
    close() {
      setTimeout(() => {
        this.$emit("input", "");
      });
    }
  },
  props: {
    placeholder: { type: String, default: "" },
    maxlength: { type: String, default: "100" },
    type: { type: String, default: "text" },
    value: { type: String, default: "" },
    readonly: { type: Boolean, default: false }
  }
};
</script>
<style lang="scss" scoped>
input {
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  caret-color: #0079ff;
}
.inputborder {
  height: 45px;
  border-radius: 4px;
}
.border {
  border: 1px solid rgba(216, 216, 216, 1);
}
.acitveborder {
  border: 1px solid #3087ff;
}
</style>