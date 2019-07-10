const u = navigator.userAgent;
// const app = navigator.appVersion;

// 浏览器
export const Safari = u.indexOf("Safari") > -1;
export const Chrome = u.indexOf("Chrome") > -1 || u.indexOf("CriOS") > -1;
export const Firefox = u.indexOf("Firefox") > -1 || u.indexOf("FxiOS") > -1;
export const QQ = u.indexOf("QQ/") > -1;
export const Wechat = u.indexOf("MicroMessenger") > -1;
export const DingTalk = u.indexOf("DingTalk") > -1;
// Wechat= true,
export const QQBrowse = u.indexOf(" QQ") > -1 || u.indexOf(" qq") > -1;
export const Taobao = u.indexOf("AliApp(TB") > -1;
export const Alipay = u.indexOf("AliApp(AP") > -1;
export const Weibo = u.indexOf("Weibo") > -1;
export const Qutoutiao = u.indexOf("qukan") > -1;
// Qutoutiao= true,
// 系统或平台
export const Android = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
export const iOS = u.indexOf("like Mac OS X") > -1;
// ios= !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), // ios终端
export const iPad = u.indexOf("ipad") > -1; // 是否iPad
export const iPhone = u.indexOf("iphone") > -1; // 是否为iPhone
export const Windows = u.indexOf("Windows") > -1;
export const Linux = u.indexOf("Linux") > -1 || u.indexOf("X11") > -1;
export const MacOS = u.indexOf("Macintosh") > -1;
export const Ubuntu = u.indexOf("Ubuntu") > -1;
export const WindowsPhone =
  u.indexOf("IEMobile") > -1 || u.indexOf("Windows Phone") > -1;
// 设备
export const Mobile =
  u.indexOf("Mobi") > -1 || u.indexOf("iPh") > -1 || u.indexOf("480") > -1;
export const Tablet =
  u.indexOf("Tablet") > -1 ||
  u.indexOf("Pad") > -1 ||
  u.indexOf("Nexus 7") > -1;
