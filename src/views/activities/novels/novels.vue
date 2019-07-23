<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <!-- 全局header -->
    <nv-head ref="head" :show-head="false" :fix-head="false" page-name="小说">
    </nv-head>
    <nv-loading :loading="loading"></nv-loading>
    <div v-show="!loading" class="novels">
      <div class="novels_swiper">
        <swiper :options="swiperOption">
          <!-- slides -->
          <swiper-slide v-for="(item,$index) in types" :key="$index">
              <img v-lazy="item.img">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="novels_class clear">
        <div class="left percent">
            <div class="img">
              <img src="../../../assets/images/novels/novels_classify.png">
            </div>
            <span class="name">分类</span>
          </div>
          <div class="left percent">
            <div class="img">
              <img src="../../../assets/images/novels/novels_rank.png">
            </div>
            <span class="name">排行</span>
          </div>
          <div class="left percent">
            <div class="img">
              <img src="../../../assets/images/novels/novels_free.png">
            </div>
            <span class="name">免费</span>
          </div>
      </div>
      <div class="spacer"></div>
      <div class="list left" v-for="(item,$index) in list" :key=$index @click="alert">
        <div class="img">
          <img v-lazy="item.img">
        </div>
        <div class="name">{{item.name}}</div>
        <div class="num"><span class="scale">{{item.followNum | followNum}}人在读</span></div>
      </div>
    </div>
  </div>
</template>
<script>
require("swiper/dist/css/swiper.css");
import nvHead from "@/components/header.vue";
import nvLoading from "@/components/loading.vue";
import ajax from "@/assets/js/ajax";
import appcall from "@/assets/js/appcall";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import conf from 'conf'

export default {
  name: "novels",
  data() {
    return {
      loading: false,
      swiperOption: {
        loop: false,
        pagination: ".swiper-pagination",
        paginationClickable: false,
        lazy: true,
        touchMoveStopPropagation: false,
        autoplay: 3000
      },
      types:[{
        img:require('@/assets/images/novels/novels_1.png')
      },{
        img:require('@/assets/images/novels/novels_1.png')
      }],
      list:[{
          img:require('@/assets/images/novels/a1.png'),
          name:'妖管记事',
          followNum:'356666'
        },{
          img:require('@/assets/images/novels/b1.png'),
          name:'南荒',
          followNum:'7758'
        }
      ]
    };
  },
  components: {
    nvHead,
    nvLoading,
    swiper,
    swiperSlide
  },
  created() {
    // this.$Progress.start();
  },
  mounted() {
  },
  methods: {
    alert(){
      this.$alert('暂未开放，请期待。。。')
    }
  },
  filters:{
    followNum(value) {
      if (value) {
       value= value < 10000? value : (value/10000).toFixed(2) + '万';
      }
      return value;
    }

  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.novels {
  width: 7.5rem;
  height: 100vh;
  overflow: hidden;
  background: #f8f8f8;
  .novels_swiper {
    width: 100%;
    height: 2.6rem;
    img {
      width: 100%;
      height: 2.6rem;
    }
  }
  .novels_class {
    width: 7.5rem;
    overflow: hidden;
    background: #ffffff;
    height: 2.2rem;
    padding-top: 0.4rem;
    .percent {
      width: 20%;
      text-align: center;
      .img {
        display: inline-block;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          margin: -.05rem auto;
        }
      }
      .name {
        display: block;
        line-height: 1;
        font-size: 0.28rem;
        color: #333333;
        margin: -.15rem auto;
      }
    }
  }
  .spacer {
    width: 7.5rem;
    height: 0.1rem;
    background: #f8f8f8;
  }
    .list {
      width: 1.62rem;
      margin: 0 0 0.36rem 0.14rem;
      .img {
        height: 2.14rem;
        width: 1.62rem;
        border-radius: 0.06rem;
        overflow: hidden;
        position: relative;
        .freeIcon {
          position: absolute;
          top: 0.04rem;
          left: 0.04rem;
          display: block;
          width: 0.52rem;
          height: 0.3rem;
          .background("novels/novels_freeIcon.png");
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        margin: 0.2rem 0 0.1rem 0;
        font-size: 0.28rem;
        line-height: 1;
        font-weight: 600;
        color: #333333;
      }
      .price {
        height: 0.2rem;
        .scale {
          display: inline-block;
          transform: scale(0.5);
          transform-origin: top left;
          -webkit-transform: scale(0.5);
          -webkit-transform-origin: top left;
          width: 200%;
          line-height: 1;
          .num {
            font-size: 0.4rem;
            color: #999999;
          }
          .zero {
            font-size: 0.4rem;
            color: #ff2c2c;
            margin-left: 0.16rem;
          }
        }
      }
    }
}
</style>