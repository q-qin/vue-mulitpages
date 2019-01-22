<template>
    <div class="user-info">
        <!-- 未登录 -->
        <ul class="login-no" v-if="!userinfo.id">
            <li class="login" @click="goEnter"><a >登录</a></li>
        </ul>
        <!-- 已登录 -->
        <div class="login-yes" v-if="userinfo.id" @click="goUser">
            <div class="avertar"><img v-if="userinfo.avatar_url" :src="userinfo.avatar_url"></div>
            <div class="info">
                <p v-if="userinfo.id" v-text="userinfo.username"></p>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    export default {
        replace: true,
        computed: {
            ...mapGetters({
                userinfo: 'getUserInfo'
            })
        },
        methods: {
            goEnter() {
				location.href = '/apps/main/user.html#/login';
            },
            goUser() {
				location.href = '/apps/main/user.html#/account'
            }
        }
    };
</script>

<style lang="less">
	.user-info{
		padding: .3rem;
	}
	.login-no{
		overflow: hidden;
    	margin: .2rem;
	}
	.login-no > li{
		float: right;
	    height: .6rem;
	    line-height: .6rem;
	    padding-left: .8rem;
	    position: relative;
	}
	.login-no > li:before{
		width: .6rem;
		height: .6rem;
		content:'';
		position:absolute;
		top:0;
		left: 0;
	}
	.login-no .login{
		float:left;
	}
	.login-no .login:before{
		background:url('../assets/images/login_icon.png') no-repeat left center;
		background-size: 100%;
	}
	.login-yes {
  		height: 100%;
  		overflow: hidden;
  		position: relative; 
	}
  	.login-yes .avertar {
    	width: 40px;
    	height: 40px;
    	background: url('../assets/images/user.png') no-repeat center center;
    	background-size: 40px 40px;
    	border-radius: 20px;
    	overflow: hidden;
    	float: left; 
    }
    .login-yes .avertar > img {
      	width: 40px;
      	height: 40px;
      	display: block; 
  	}
  	.login-yes .info {
    	margin-left: 10px;
    	overflow: hidden;
    	float: left; }
  	.login-yes p {
    	width: 85px;
    	overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	font-size: 12px;
    	line-height: 12px;
    	line-height: 40px; 
    }
    .login-yes p.lh20 {
      	line-height: 20px; 
  	}
</style>
