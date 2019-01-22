<template>
    <div>
        <!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="true"
	            :fix-head="true"
	            :show-menu="true"
	            :show-home="true"
	            :page-name="$route.meta.title" >
	    </nv-head>
        <section  class="userinfo" :class="{'fix-head':true}">
            <div class="u-img" />
            <div>
                <p class="u-name" v-text="userInfo.username"></p>
                <br/>
                <p class="u-name red" >账户余额：￥{{userInfo.balance}}</p>
            </div>
        </section>
        <section class="topics">
            <ul class="user-tabs">
                <li class="item selected" >已购信息</li>
            </ul>
            <div class="no-data" v-show="currentData.length === 0">
                暂无数据!
            </div>
        </section>
    </div>
</template>
<script>
    import nvHead from '@/components/header.vue';
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                user: {},
                currentData: [],
                selectItem: 1,
                balance: 0
            };
        },
        components: {
            nvHead
        },
        created() {
            this.$Progress.start();
            this.getUser();
        },
        computed: {
            ...mapGetters({
                userInfo: 'getUserInfo'
            })
        },
        methods: {
            getUser() {
                console.log(this.userInfo.id);
                let userInfo = this.userInfo;
                this.$Progress.finish();
                if (!userInfo.id) {
                    this.$alert('缺少用户名参数');
                    this.$router.push({
                        path: '/login'
                    });
                    return false;
                }
            }
        },
    };
</script>
<style lang="less" scoped>
	.userinfo {
  		width: 100%;
  		background-color: #e7e7e7;
  		text-align: center;
  		height: 180px; 
  	}
  	.userinfo .u-img {
    	width: 100px;
    	height: 100px;
    	border-radius: 50%;
    	margin-top: 15px;
    	display: inline-block;
    	background: url('../../../assets/images/user.png') no-repeat 50%; 
	}
  	.userinfo .u-name {
    	color: #000; 
    }
  	.userinfo .u-bottom {
    	background-color: #e7e7e7;
    	width: 100%;
    	margin-top: 20px; 
    }
    .userinfo .u-bottom .u-time {
      	width: 50%;
      	float: left;
      	padding-left: 10px; 
  	}
    .userinfo .u-bottom .u-score {
      	width: 50%;
      	float: left;
      	text-align: right;
      	padding-right: 10px;
      	color: #80bd01; 
      }

     .user-tabs {
  		width: 100%;
  		height: 41px;
  		list-style: none;
  		position: relative; 
  	}
  	.user-tabs .item {
    	width: 100%;
    	padding: 12.5px 0;
    	float: left;
    	font-size: 16;
    	text-align: center;
    	font-weight: bold; 
    }
  	.user-tabs .read {
    	font-size: 25px;
    	color: #80bd01;
    	position: absolute;
    	right: 5px;
    	top: 7.5px;
    	font-weight: bold; 
    }
  	.user-tabs .br {
    	border-right: solid 1px #d4d4d4; 
    }
  	.user-tabs .selected {
    	color: #ff5a5f;
    	border-bottom: solid 2px #ff5a5f; 
    }
    .no-data{
    	text-align: center;
    }
</style>
