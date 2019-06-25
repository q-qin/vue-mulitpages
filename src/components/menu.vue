<template>
    <section id="sideBar" class="nav-list" :class="{'show':menuToggle}">
    	<userInfo></userInfo>
        <section class="list-ul">
            <a class="icon-quanbu iconfont item" href="/views/main/home.html#/list?tab=all"  >全部</a>
            <a class="icon-hao iconfont item" href="/views/main/home.html#/list?tab=good" >精华</a>
            <a class="icon-fenxiang iconfont item" href="/views/main/home.html#/list?tab=share" >分享</a>
            <a class="icon-xiaoxi iconfont item " href="/views/main/home.html#/list?tab=bad" >打假</a>
            <a class="icon-about iconfont item line" href="/views/main/home.html#/about" >关于</a>
        </section>
    </section>
</template>
<script>
	import userInfo from './userinfo'
    export default {
        replace: true,
        props: ['menuToggle'],
        components: {
        	userInfo
        },
        methods:{
        	flushCom(){
        		this.$router.go(0);
        	}
        }
    };
</script>

<style lang="less" scoped>
    /*侧边栏*/
    
    .nav-list {
        position: fixed;
        top: 0;
        bottom: 0;
        left: -200px;
        width: 200px;
        background-color: #fff;
        color: #313131;
        transition: all .3s ease;
        z-index: 99;
        &.show {
            transform: translateX(200px);
        }
    }
    /*侧边栏列表*/
    
    .list-ul {
        margin: 0 24px;
        border-top: 1px solid #d4d4d4;
        overflow: hidden;
        padding-top: .3rem;
        .item {
            display: block;
            font-size: 14px;
            font-weight: 200;
            padding: .3rem 0;
            text-align: left;
            text-indent: 1px;
            line-height: 15px;
            color: #313131;
            font-weight: 700;
            &:last-child {
                margin-bottom: 50px;
            }
            &:before {
                color: #2c3e50;
            }
        }
        .line {
            border-top: 1px solid #d4d4d4;
        }
    }
</style>