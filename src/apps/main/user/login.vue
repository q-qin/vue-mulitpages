<template>
    <div class="login-page">
        <!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="true"
	            :fix-head="true"
	            :show-back="true"
              :show-home="true"
	            :page-name="$route.meta.title" >
	    </nv-head>
        <section class="page-body">
            <div class="label">
                <input class="txt" type="text" placeholder="帐号" v-model="username" maxlength="12">
            </div>
            <div class="label">
                <input class="txt" type="password" placeholder="密码" v-model="password" maxlength="36">
            </div>
            <div class="label">
                <a class="button" @click="login">登录</a>
            </div>
        </section>
    </div>
</template>

<script>
import nvHead from "@/components/header";
import ajax from "@/assets/js/ajax";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      if (this.username === "" || this.password === "") {
        this.$alert("用户名密码不能为空！");
        return false;
      }
      let params = {
        username: this.username,
        password: this.password
      };
      let rs = await ajax("post", this.$apiurl + "/user/login", params);
      if (rs && rs.code === 0) {
        let user = {
          id: 1,
          username: "vincent",
          avatar_url: "http://r3.3keji.com/mike.png",
          balance: 99
        };
        window.sessionStorage.user = JSON.stringify(user);
        this.$store.dispatch("saveuserinfo", user);
        this.$router.push({
          path: "/account"
        });
      } else {
        this.$alert(rs.msg);
      }
    }
  },
  components: {
    nvHead
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/colors";
.page-body {
  padding: 1rem 0.5rem;
  background-color: #fff;
  .label {
    display: inline-block;
    width: 100%;
    margin-top: 0.3rem;
    position: relative;
    left: 0;
    top: 0;
    .txt {
      padding: 0.15rem 0;
      border: none;
      border-bottom: 1px solid #4fc08d;
      background-color: transparent;
      width: 100%;
      font-size: 0.28rem;
      color: #313131;
    }
    .button {
      display: block;
      width: 99%;
      height: 0.8rem;
      line-height: 0.8rem;
      border-radius: 3px;
      color: #fff;
      font-size: 0.32rem;
      background-color: #4fc08d;
      border: none;
      border-bottom: 2px solid #3aa373;
      text-align: center;
      margin: 0.2rem auto;
    }
    .file {
      position: absolute;
      top: 0;
      left: 0;
      height: 42px;
      width: 48%;
      outline: medium none;
      opacity: 0;
    }
  }
}
</style>
