<route-meta>
{
  "title": "登录"
}
</route-meta>
<template>
  <div class="login bgwh">
    <div class="wh pt60 pl15">
      <p class="f36">英萌XSTAEM</p>
      <p class="f18">欢迎您！</p>
    </div>
    <div class="login-box pl30 pr30">
      <div>
        <q-input
          placeholder="请输入手机号码"
          v-model="data.mobileNumber"
          type="tel"
          maxlength="11"
          @input="errorTel=''"
          @blur="checkphone"
        ></q-input>
        <p slot="bottom" class="login-warn f12">{{errorTel}}</p>
      </div>
      <div class="f14">
        <q-input
          placeholder="请输入验证码"
          v-model="data.messagecode"
          type="tel"
          maxlength="4"
          @input="errorCode=''"
          @blur="checkCode"
        >
          <a class="w100 code tc b" @click="sendCode" v-show="!mins">{{codeBtn}}</a>
          <a class="mins tc" v-show="!!mins">{{mins}}s</a>
        </q-input>
        <p slot="bottom" class="login-warn f12">{{errorCode}}</p>
      </div>
      <div class="tc mt10">
        <yd-button
          class="login-btn wh b"
          @click.native="submit"
          bgcolor="rgba(73, 140, 234, 1)"
          :disabled="!data.mobileNumber||!data.messagecode"
          :loading="loading"
        >登 录</yd-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { sendCode, login, getSystemId, checkphone } from "@/apis/login";
import { session } from "@/utils/store";
import qInput from "@/components/qInput.vue";
interface D {
  mobileNumber: string;
  messagecode: string;
  systemType: number;
}
@Component({
  components: { qInput }
})
export default class ComponentName extends Vue {
  codeBtn: string = "获取验证码";
  mins: number = 0;
  timeInterval: any = null;
  errorTel: string = "";
  errorCode: string = "";
  loading: boolean = false;
  data: D = {
    mobileNumber: "",
    messagecode: "",
    systemType: 1
  };
  setTime() {
    this.mins = 60;
    this.timeInterval = setInterval(() => {
      this.mins--;
      if (this.mins <= 0) {
        clearInterval(this.timeInterval);
        this.codeBtn = "重新获取";
      }
    }, 1000);
  }
  async submit() {
    if (this.checkphone()) {
      this.login();
    }
  }
  checkphone() {
    if (this.data.mobileNumber === "") {
      this.errorTel = "请输入手机号码";
      return false;
    }
    if (!/^1[0-9]{10}$/.test(this.data.mobileNumber)) {
      this.errorTel = "请输入11位手机号";
      return false;
    }
    return true;
  }
  checkCode() {
    if (this.data.messagecode.length < 4) {
      this.errorCode = "请输入手机验证码";
      return true;
    }
    return false;
  }
  async login() {
    if (this.checkCode()) {
      return;
    }
    this.loading = true;
    try {
      let { user_info, access_token } = await login(this.data);
      session.set("userInfo", user_info);
      session.set("access_token", access_token);
      let syslist = await getSystemId(user_info.id);
      let auth = syslist.some(({ code }) => code === "boss-admin");
      if (auth) {
        this.$dialog.toast({
          mes: "登录成功",
          timeout: 1000,
          icon: "success",
          callback: () => {
            document.body.scrollTop = 0;
            this.$router.replace("/dash");
          }
        });
      } else {
        this.$dialog.toast({
          mes: "暂无权限！",
          timeout: 1500,
          icon: "error"
        });
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }
  async sendCode() {
    // await checkphone(this.data.mobileNumber);
    if (this.checkphone()) {
      await sendCode(this.data.mobileNumber);
      this.setTime();
      this.$dialog.toast({
        mes: "短信发送成功",
        timeout: 1000,
        icon: "success"
      });
    }
  }
  beforeDestroy() {
    clearInterval(this.timeInterval);
  }
}
</script>

<style lang="scss" scoped>
.login {
  background-image: url("../assets/images/loginbg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
  position: relative;
  &-box {
    position: absolute;
    top: 270px;
    width: 100%;
  }
  &-btn {
    font-size: 16px;
    width: 184px;
    height: 44px;
    box-shadow: 0px 3px 4px 0px rgba(41, 165, 229, 0.26);
    border-radius: 4px;
  }
  &-warn {
    height: 20px;
    color: #f00;
  }
}
.code {
  color: #0079ff;
}
.mins {
  font-weight: 500;
  color: rgba(73, 140, 234, 0.5);
}
</style>