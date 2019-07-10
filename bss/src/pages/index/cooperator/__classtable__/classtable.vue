<!--
 * @@Description:
 * @@Author: Yu shijun
 * @@Date:
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-06-21 10:21:40
 -->
<!--<div class="date_jiantou2"></div>-->
<template>
  <section class="date_container">
    <div class="date_content_all">
      <div class="title-top">
        <div class="date_top_changge f14" id="trigger2">
          {{dateTop.year}}-{{dateTop.month}}
          <!-- <span class="month">{{dateTop.month}}</span>月 -->
          <!-- <span class="date_jiantou2"></span> -->
          <i class="iconfont iconarrow-right select-icon ml5"></i>
        </div>
        <div class="date_week">
          <div class="date_week_item" v-for="(tag, index) in textTop" :key="index">{{tag}}</div>
        </div>
      </div>
      <div class="swiper-box">
        <swiper :options="swiperOption" ref="mySwiper" @slideChangeTransitionEnd="onTouchEnd">
          <swiper-slide v-for="(itemList, index) in dataList" :key="index">
            <div class="date_content">
              <div class="date_content_item" v-for="(item,index) in itemList" :key="index">
                <div
                  class="item"
                  :class="[{'not-current-month': item.otherMonth},setClass(item), {isToday_now:item.isTodayNow},{'click-seleted': isSelect(item)}]"
                >{{item.id}}</div>
                <div class="f16 second ks-row-middle" v-show="!item.otherMonth">
                  <span class="ks-col"></span>
                  <span class="b">{{item.courseCount}}</span>
                  <span class="f12">{{item.unit}}</span>
                  <span class="ks-col"></span>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>


<script>
import MobileSelect from "mobile-select";
import format from "@/filter/format";
const EVERYPAGEDATALENGTH = 42; // 每月展示42条数据
const WEEK = ["日", "一", "二", "三", "四", "五", "六"]; // 星期
const STARTYEAR = 2019; // 开始日期是从2019年开始
const STARTDATELENGTH = new Date().getFullYear() - STARTYEAR + 3; // 当前日期-2019年和后1年
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "vue-Datepicker",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {}, // swiper配置
      textTop: WEEK, // 星期
      list: [], // 日历表
      dateTop: {
        // 当前title
        year: "",
        month: ""
      },
      dataList: [], // 总的数据,
      selectedTime: "", // 存储点击的选中的时间
      swiperIndex: ""
    };
  },
  props: {
    options: {
      type: Array,
      required: false,
      twoWay: true
    }
  },
  computed: {},
  methods: {
    isSelect(item) {
      // 用于显示选中的效果
      return item.date === this.selectedTime;
    },
    // showSelectList(boolean) {
    //   this.isNeedShowSelectList = boolean;
    // },
    // 打开日期选择控件
    openDatePicker() {
      this.$refs.picker.open();
    },
    // 获取选中的那一排数据
    // getSelectList(item, itemList) {
    //   let index = itemList.findIndex(i => i.date === item.date);
    //   console.log("index", index);
    //   let arr = [];
    //   if (index < 7) {
    //     arr = itemList.slice(0, 7);
    //   } else if (index < 14) {
    //     arr = itemList.slice(7, 14);
    //   } else if (index < 21) {
    //     arr = itemList.slice(14, 21);
    //   } else if (index < 28) {
    //     arr = itemList.slice(21, 28);
    //   } else if (index < 35) {
    //     arr = itemList.slice(28, 35);
    //   } else if (index < 42) {
    //     arr = itemList.slice(35);
    //   }
    //   this.selectList = arr;
    //   console.log("arr", arr);
    // },
    // 获取课表，并增加颜色，其他月份的直接返回
    // getCourseList(item) {
    //   if (item.otherMonth) {
    //     return;
    //   }
    //   this.selectedTime = item.date;
    //   this.$emit("move", true);
    //   this.$emit("change", item.date);
    // },
    // 匹配的class设置上去
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    // 获取其他月份的日期
    getOtherMonth(date, number) {
      date = new Date(date);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year2 = year;
      let month2 = parseInt(month) + number; // 下个月或者上个月
      if (month2 === 0 || month2 === 13) {
        year2 = parseInt(year2) + number;
        month2 = month2 == 0 ? 12 : 1;
      }
      let day2 = day;
      let days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      day2 = day2 > days2 ? days2 : day2;
      month2 = month2 < 10 ? "0" + month2 : month2;
      day2 = day2 < 10 ? "0" + day2 : day2;
      let t2 = year2 + "-" + month2 + "-" + day2;
      return new Date(t2);
    },
    //当前月的天数
    getDaysInOneMonth(date) {
      let getyear = date.getFullYear();
      let getmonth = date.getMonth() + 1;
      let d = new Date(getyear, getmonth, 0);
      return d.getDate();
    },
    getMonthweek(date) {
      //向前空几个
      let getyear = date.getFullYear();
      let getmonth = date.getMonth() + 1;
      let dateOne = new Date(getyear + "/" + getmonth + "/1");
      return dateOne.getDay() == 0 ? 7 : dateOne.getDay();
    },
    // 获取当前月每一天的日期--时间戳
    getDayFormat(date, i) {
      var month = this.getCurrentMonth(date);
      var day = i >= 9 ? i + 1 : "0" + (i + 1);
      var timeList = [date.getFullYear(), month, day];
      // console.log(timeList);
      return timeList.join("-");
    },
    // 获取当前月份--时间戳
    getCurrentMonth(date) {
      return date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    },
    // 设置当前的年月
    setCurrentDate(date) {
      let mygetMonth = this.getCurrentMonth(date);
      this.dateTop = {
        // 用于显示年月
        year: date.getFullYear(),
        month: mygetMonth
      };
    },
    // 获取选择月份的数据
    getList(date) {
      // this.setCurrentDate(date); // 设置当前的年月
      let currentMonthList = []; // 当月的日期数组
      var currentMonthDays = this.getDaysInOneMonth(date); // 获取当前月份的天数
      for (let i = 0; i < currentMonthDays; i++) {
        // 获取当月每一天的时间：2019-05-01
        var nowTime = this.getDayFormat(date, i);
        let markClassName = "";
        let sameDate = this.markList.find(k => {
          return nowTime === k.classDate;
        });
        if (sameDate) {
          // 匹配到日期一样的
          markClassName = sameDate.classNames;
        }
        let listObj = {
          courseCount: 0,
          unit: "节",
          id: i + 1,
          date: nowTime,
          isTodayNow: false,
          markClassName: markClassName
        };
        if (nowTime === this.nowDate) {
          // 当天高亮显示
          listObj.isTodayNow = true;
        }
        currentMonthList.push(listObj);
      }
      let beforeMonthList = this.getBeforeMonth(date); // 上个月后几天的数据
      let beforeLength = beforeMonthList.length;
      let nextMonthList = this.getNextMonthList(date, beforeLength);
      return [...beforeMonthList, ...currentMonthList, ...nextMonthList];
    },
    // 获取其他月份的数据
    getOtherMonthList(year, month, length, num = 1) {
      // console.log(month);
      month = month.length == 1 ? "0" + month : month;
      var array = [];
      for (let i = 0; i < length; i++) {
        array.push({
          id: num + i,
          date: `${year}-${month}-${num + i}`,
          otherMonth: true
        });
      }
      return array;
    },
    // 获取上个月的数据
    getBeforeMonth(date) {
      let array = [];
      const leftNum = this.getMonthweek(date);
      const preMonthDate = this.getOtherMonth(date, -1);
      const num = this.getDaysInOneMonth(preMonthDate) - leftNum + 1;
      var year = preMonthDate.getFullYear();
      var month = preMonthDate.getMonth();
      array = this.getOtherMonthList(year, month, leftNum, num);
      return array;
    },
    // 获取下个月的几条数据
    getNextMonthList(date, beforeLength) {
      let nextMonthDaysList = [];
      var currentMonthDays = this.getDaysInOneMonth(date); // 当月的天数
      let nextMonthDays = EVERYPAGEDATALENGTH - beforeLength - currentMonthDays; // 获取当月展示下个月的天数
      var nextDate = this.getOtherMonth(date, 1);
      var year = nextDate.getFullYear();
      var month = nextDate.getMonth() + 1;
      nextMonthDaysList = this.getOtherMonthList(year, month, nextMonthDays);
      return nextMonthDaysList;
    },
    _getYearMonthList() {
      var yearList = [];
      var monthList = [];
      var length = STARTDATELENGTH; // 当前日期-2019年和后1年 3
      for (let i = 0; i < length; i++) {
        yearList.push({
          id: STARTYEAR + i,
          value: STARTYEAR + i + "年"
        });
      }
      for (let i = 1; i <= 12; i++) {
        monthList.push({
          id: i,
          value: i + "月"
        });
      }
      return {
        yearList,
        monthList
      };
    },
    // 初始化日期选择控件
    _initializeTimePicker() {
      var leftIndex = STARTDATELENGTH - 3; // 默认年的索引是倒数第3年
      var rightIndex = this.myDate.getMonth(); //
      var { yearList, monthList } = this._getYearMonthList();
      new MobileSelect({
        trigger: "#trigger2",
        title: "请选择要跳转的年月",
        triggerDisplayData: false,
        position: [leftIndex, rightIndex],
        wheels: [
          {
            data: yearList
          },
          {
            data: monthList
          }
        ],
        callback: (indexArr, data) => {
          var year = data[0].id + "";
          var month = data[1].id < 10 ? "0" + data[1].id : data[1].id;
          let time = `${year}-${month}-01`;
          let index = this.dateTimeList.findIndex(i => i === time);
          this.$refs.mySwiper.swiper.slideTo(index); // 让swiper滑动到选择的那一页
          this.swiperIndex = index;
          // this.clearStatusAndSetDate(time);
        }
      });
    },
    // 生成240条数据['2010-01-01']
    _getDateList() {
      var arr = [];
      // 2019年开始-未来一年
      // 2019-2019 + 2
      let startYear = STARTYEAR; // 从2019年开始
      var length = STARTDATELENGTH; // 从2019到明年
      for (var i = 0; i < length; i++) {
        for (var j = 1; j <= 12; j++) {
          let time = `${startYear + i}-${j < 10 ? "0" + j : j}-01`;
          arr.push(time);
          this.dataList.push(this.getList(new Date(time))); // 这边可以优化一下
        }
      }
      this.dateTimeList = arr; // 生成从2019年开始到明年的日期表
    },
    // 左右滑动
    onTouchEnd() {
      let index = this.$refs.mySwiper.swiper.activeIndex;
      this.swiperIndex = index;
      let date = this.dateTimeList[index];
      let nowTime = format(new Date(), "yyyy-MM-dd"); // 当前日期
      if (date.includes(nowTime)) {
        date = this.nowDate;
      }
      this.clearStatusAndSetDate(date);
    },
    // 清除选中并且设置当前时间
    clearStatusAndSetDate(date) {
      this.setCurrentDate(new Date(date)); // 跟显示的年月联动，设置当前年月
      let isShowCourse = date.slice(0, 7) === this.selectedTime.slice(0, 7);
      this.$emit("move", isShowCourse); // 判断是不是同一个月的，同一个月显示课表
    }
  },
  created() {
    this.myDate = new Date();
    this.markList = []; // 有课表的数组
    this.nowDate = format(this.myDate, "yyyy-MM-dd"); // 当前日期
    // this.nowDate = .format("yyyy-MM-dd"); // 当前日期
    let difference = this.myDate.getFullYear() - 2019; // 距离2019年差几年
    this.swiperOption.initialSlide = difference * 12 + this.myDate.getMonth(); // 初始化swiper activeIndex
    this.swiperIndex = difference * 12 + this.myDate.getMonth();
    window.test3 = this;
    this.selectedTime = this.nowDate;
  },
  mounted() {
    this._getDateList(); // 生成轮播数据，和2019年到现在的年月数据
    this._initializeTimePicker(); // 初始化时间选择控件
    this.setCurrentDate(this.myDate); // 设置当前的时间
  },
  watch: {
    dateTop(val) {
      this.$emit("change", val);
    },
    options(val) {
      // console.log(this.swiperIndex);
      // console.log(this.dataList[this.swiperIndex + 2]);
      let list = this.dataList[this.swiperIndex];
      list.forEach(element => {
        this.options.forEach(item => {
          // console.log(element.date, item.date);
          if (element.date == item.date) {
            element.courseCount = item.courseCount;
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.date_container {
  width: 100%;
  margin: 0;
  height: 468px;
  position: relative;
  .date_content_all {
    width: 100%;
    overflow: hidden;
    height: 84px;
    .title-top {
      // background: url("../../../../assets/images/date-bg.png") no-repeat;
      background-size: cover;
      height: 100%;
      .date_top_changge {
        color: rgba(73, 140, 234, 1);
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 16px;
        .month {
          margin-left: 22px;
          font-size: 48px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .date_jiantou2 {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-top: 2px solid #ffffff;
          border-right: 2px solid #ffffff;
          transform: rotate(45deg);
          margin-left: 16px;
        }
      }
      .date_week {
        background: rgba(246, 249, 254, 1);
        border-radius: 8px;
        display: flex;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        .date_week_item {
          color: #333;
          font-size: 14px;
          flex: 1;
          text-align: center;
        }
      }
    }

    .date_content {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px;
      transition: all 5s;
      .date_content_item {
        font-size: 14px;
        width: 14.28%;
        text-align: center;
        // display: flex;
        justify-content: center;
        margin-top: 20px;
        color: #333333;
        .item {
          margin-left: 8px;
          height: 24px;
          line-height: 21px;
          width: 24px;
          border-radius: 50%;
        }
        .second {
          line-height: 22px;
          color: rgba(73, 140, 234, 1);
          vertical-align: middle;
        }
      }
    }
  }
}

.swiper-box {
  height: 400px;
  border-radius: 12px;
  position: absolute;
  // top: 116px;
  /* z-index: 2; */
  background: #fff;
  width: 100%;
  .swiper-container {
    height: 100%;
  }
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity .05s;
// }
// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }

.not-current-month {
  color: #d8d8d8;
}

.label1 {
  background: rgba(0, 159, 232, 0.03);
  color: #7aabf8;
  position: relative;
  // background: blue;
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    width: pxtorem(4);
    height: pxtorem(4);
    border-radius: 50%;
    background: #773cff;
    bottom: pxtorem(-8);
    margin-left: pxtorem(-2);
  }
}

.label2 {
  position: relative;
  // background: blue;
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    width: pxtorem(4);
    height: pxtorem(4);
    border-radius: 50%;
    background: #773cff;
    bottom: pxtorem(-8);
    margin-left: pxtorem(-2);
  }
}
.isToday_now {
  // background: green;
  color: #32beff;
  background: none;
}
.click-seleted {
  box-shadow: 0px 1px 1px 0px rgba(251, 116, 116, 0.3);
  border: 2px solid rgba(251, 116, 116, 1);
  color: #498cea;
}
.select-icon {
  font-size: 14px;
  transform: rotate(90deg);
}
</style>
