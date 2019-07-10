export const getMoney = (money: number) => {
  const useNum =
    money.toString().indexOf(".") > -1
      ? money.toString().split(".")[0]
      : money.toString();
  if (
    useNum.length === 0 ||
    useNum.length === 1 ||
    useNum.length === 2 ||
    useNum.length === 3 ||
    useNum.length === 4
  ) {
    return money.toFixed(2) + "元";
  }
  return (money / 10000).toFixed(2) + "万元";
};

export const getMoneyx = (money: number) => {
  const useNum =
    money.toString().indexOf(".") > -1
      ? money.toString().split(".")[0]
      : money.toString();
  if (
    useNum.length === 0 ||
    useNum.length === 1 ||
    useNum.length === 2 ||
    useNum.length === 3 ||
    useNum.length === 4
  ) {
    return money.toFixed(1) + "";
  }
  return (money / 10000).toFixed(2) + "W";
};

export const getMoneyd = (money: number) => {
  const useNum =
    money.toString().indexOf(".") > -1
      ? money.toString().split(".")[0]
      : money.toString();
  if (
    useNum.length === 0 ||
    useNum.length === 1 ||
    useNum.length === 2 ||
    useNum.length === 3 ||
    useNum.length === 4
  ) {
    return money + "单";
  }
  return (money / 10000).toFixed(2) + "万单";
};

// 数值
export const formatterNumber = (num: any) => {
  const useNum =
    num.toString().indexOf(".") > -1
      ? num.toString().split(".")[0]
      : num.toString();
  // console.log(num+'-------'+useNum)
  if (useNum.toString().length <= 4) {
    return useNum.toString();
  } else if (useNum.toString().length > 4) {
    return (useNum / 10000).toFixed(2) + "W";
  }
};
// 数值
export const formatterUnit = (num: any, type: string) => {
  const useNum = num;
  // console.log(num+'-------'+useNum)
  if (useNum.toString().length <= 4) {
    return type === "unit" ? "元" : Number(useNum).toFixed(2);
  } else if (useNum.toString().length > 4) {
    return type === "unit" ? "元" : (useNum / 10000).toFixed(2) + "W";
  }
};

// 获取当年月份集合
export const getCurrentMonth = () => {
  let arr = [];
  const STARTYEAR = 2019;
  const STARTDATELENGTH = new Date().getFullYear() - STARTYEAR + 1;
  const startYear = STARTYEAR;
  const length = STARTDATELENGTH;
  for (var i = 0; i < length; i++) {
    for (var j = 1; j <= 12; j++) {
      let time = `${startYear + i}-${j < 10 ? "0" + j : j}-01`;
      arr.push(time);
    }
  }
  return arr;
};

// 获取当月天份集合
export const getCurrentDay = () => {
  const start = new Date(
    getCurrentMonthFirstDay()
      .substring(0, 10)
      .replace(/-/g, "/")
  ).getTime();
  const end = new Date(
    getCurrentMonthLast()
      .substring(0, 10)
      .replace(/-/g, "/")
  ).getTime();
  const currenlength = (end - start) / (86400 * 1000) + 1; // 当月有几天
  let arr = [];
  for (let i = 0; i < currenlength; i++) {
    const step = start + i * (86400 * 1000);
    arr.push(
      `${new Date(step).getFullYear()}.${new Date(step).getMonth() +
        1}.${new Date(step).getDate()}`
    );
  }
  return arr;
};

// 获取当前月第一一天
const getCurrentMonthFirstDay = () => {
  const date = new Date() as any;
  date.setDate(1);
  let month = parseInt(date.getMonth() + 1) as any;
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return date.getFullYear() + "-" + month + "-" + day;
};

// 获取当前月最后一天
const getCurrentMonthLast = () => {
  const date = new Date();
  let currentMonth = date.getMonth() as any;
  const nextMonth = ++currentMonth;
  const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1) as any;
  const oneDay = 1000 * 60 * 60 * 24;
  var lastTime = new Date(nextMonthFirstDay - oneDay) as any;
  var month = parseInt(lastTime.getMonth() + 1) as any;
  var day = lastTime.getDate() as any;
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return date.getFullYear() + "-" + month + "-" + day;
};
