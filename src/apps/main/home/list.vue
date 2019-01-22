<template>
	<div>
		<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="true"
	            :fix-head="true"
	            :show-back="false"
	            :show-menu="true"
	            :show-act="true"
	            :page-name="$route.meta.title" v-show="!loading" >
	    </nv-head>
	    <nv-loading :loading="loading"></nv-loading>
	    <div class="main" :class="{'fix-head':true}" v-show="!loading">
	    	<ul class="posts-list" >
	    		<li v-for="item in list" :key="item._id">
	    			<router-link :to="{name:'detail',params:{id:item._id}}">
	    				<h3 v-text="item.title"
                            :class="getTabInfo(item.type, true)"
                            :title="getTabInfo(item.type, false)">
                    	</h3>
                    	<div class="content">
	                        <div class="info">
	                            <p>
	                                <span class="name">
	                                    摘要：{{item.sub_title}}
	                                </span>
	                            </p>
	                            <p>
	                            	<span class="time">发布时间：{{item.update_time | getLastTimeStr}}</span>
	                            </p>
	                        </div>
                    	</div>
	    			</router-link>
	    		</li>
	    	</ul>
	    </div>
	    <nv-top></nv-top>
	</div>
</template>

<script>
import nvHead from '@/components/header.vue';
import nvLoading from '@/components/loading.vue';
import nvTop from '@/components/backtotop.vue';
import {mapState} from 'vuex';
import ajax from '@/assets/js/ajax';
import fetch from '@/assets/js/fetch';

export default {
	name: 'a_detail',
	data(){
		return{
			loading:true,
			allLoaded:false,
			list:[],
			searchKey:{
				offset:0,
				limit:20,
				tab:'all'
			},
		}
	},
  	components: {
  		nvHead,
  		nvLoading,
  		nvTop
  	},
    created(){
        this.$Progress.start();
    },
  	computed: {
  		
  	},
    mounted(){
    	this.getlist();
    },
    methods:{
    	async getlist(){
	    	let params ={
	    		offset:0,
	    		limit:20,
	    		tab:this.searchKey.tab,
	    	}
			let rs = await fetch(this.$apiurl+'/news/list',params)
	  		if(rs && rs.code === 0 && rs.data){
				this.loading = false;
				this.list = rs.data;
	  		}else{
	  			this.$alert(rs.msg);
	  		}
			this.$Progress.finish();
    	},
    	// 获取不同tab的样式或者标题
    	getTabInfo(type, isClass){
    		let str = '';
		    let className = '';
		    switch (type) {
		        case '0':
		            str = '置顶';
		            className = 'top';
		            break;
		        case '1':
		            str = '精华';
		            className = 'good';
		            break;
		        case '2':
		            str = '分享';
		            className = 'share';
		            break;
		        case '3':
		            str = '打假';
		            className = 'ask';
		            break;
		        default:
		            str = '暂无';
		            className = 'default';
		            break;
		    }
		    return isClass ? className : str;
    	}
    },
    filters: {
    	getLastTimeStr(dateStr){
    		let date = new Date(dateStr);
    		let yyyy = date.getFullYear(),
    			MM = date.getMonth() +1,
    			dd = date.getDate(),

    			HH = date.getHours(),
    			mm = date.getMinutes(),
    			ss = date.getSeconds();
    		return yyyy+'/'+MM+'/'+dd +' '+HH+':'+mm+':'+ss;
    	}
    },
    watch: {
        // 切换页面
        '$route' (to, from) {
            // 如果是当前页面切换分类的情况
            if (to.query && to.query.tab) {
                this.searchKey.tab = to.query.tab;
                this.searchKey.offset = 0;
                this.list = [];
            }
            this.getlist();
            // 隐藏导航栏
            this.$refs.head.menuToggle = false;
        }
    },
}
</script>

<style lang="less" scoped>
	@import "../../../assets/css/colors";
	.main{
		width: 100vw;
		height: 100vh;
		&.fix-head{
			margin-top: 1.1rem;
		}
	}
	.posts-list {
	    background-color: #fff;
	    li {
	        padding: .25rem .4rem;
	        border-bottom: 1px solid @mborder;
	    }
	    h3 {
	        &:before {
	            content: attr(title);
	            margin: 0 .1rem 0 0;
	            color: #fff;
	            border-radius: .1rem;
	            font-size: .24rem;
	            padding:.08rem .1rem;
	            text-align:center;
	            vertical-align:middle;
	        }
	        &.top:before {
	            background: #E74C3C;
	        }
	        &.ask:before {
	            background: #3498DB;
	        }
	        &.good:before {
	            background: #E67E22;
	        }
	        &.job:before {
	            background: #9B59B6;
	        }
	        &.share:before {
	            background: #1ABC9C;
	        }
	    }
	    .content {
	        padding-top: .1rem;
	        display: flex;
	    }
	    .info {
	        display: block;
	        width: 100%;
	        flex: 1;
	    }
	    p {
	        padding: .05rem 0;
	        display: flex;
	        font-size: .3rem;

	        .name{
	           display: block;
	           width: 100%;
	           flex: 1;
	        }
	        .time{
	           display: block;
	           	width: 100%;
				color:#666;
				font-size: .24rem;
	        }
	        b {
	            color: #42b983;
	        }
	    }
	}
</style>
