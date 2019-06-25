/*
 * vuejs 	过滤器
 */
import Vue from 'vue';

/**
  * 保留n位小数,默认2位
*/
Vue.filter('decimal', function (value,num=2) {
  return Number(value).toFixed(num);
})

/**
  * 格式化数字，相当于vue1.0时的currency过滤器
  * @param value 		传进来的数字
  * @param icon	 	货币称号，默认为人民币
  * @param dat	 		保留的小数点位数，默认为2位
  * @param return 
*/
Vue.filter('currency', function (value,icon='¥',dat=2) {
  if(!value) return icon + '0.00';
  var intPart = Number(value).toFixed(0); //获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

  var floatPart = ".00"; //预定义小数部分
  var value2Array = value.split(".");

  //=2表示数据有小数位
  if(value2Array.length == 2) {
      floatPart = value2Array[1].toString(); //拿到小数部分

      if(floatPart.length == 1) { //补0,实际上用不着
          return icon + intPartFormat + "." + floatPart + '0';
      } else {
          return icon + intPartFormat + "." + floatPart;
      }

  } else {
      return icon + intPartFormat + floatPart;
  }
})