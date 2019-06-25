/**
 * 这是H5路由地址
 * basic usage：
 *    import pagers form @/assets/js/pagers ;
 *    appcall.navigator({title:${title},url:${url}});
 *    ${url} = this.$h5url+pagers[this.$currVer].modulename
 */

const base = {
  aprilFoolsDay:'/activities/aprilFoolsDay.html',
  noviceAsk:'/activities/noviceAsk.html',
  readProgress:'/activities/readProgress.html',
  sendcrash:'/activities/sendcrash.html',
  shareIncome: '/activities/shareIncome.html',
  taskcenter: '/activities/taskcenter.html', 
  articleDetail:'/main/home.html#/articleDetail/',
  articleDetailAd:'/main/home.html#/articleDetailAd/',
  articleDetailClear:'/main/home.html#/articleDetailClear/',
  clause:'/main/home.html#/clause',
  faq:'/main/home.html#/faq',
  faqVideo:'/main/home.html#/faqVideo',
  videoDetail:'/main/home.html#/videoDetail',
  videoDetailClear:'/main/home.html#/videoDetailClear',
  incomeBills:'/main/user.html#/incomeBills',
  invitecodeDetail:'/main/user.html#/invitecodeDetail',
  invitecodeExchange:'/main/user.html#/invitecodeExchange',
  invitepupil: '/main/user.html#/invitepupil', 
  invitepupilNearby: '/main/user.html#/invitepupilNearby',
  ranking: '/main/user.html#/ranking',
  redeem: '/main/user.html#/redeem', 
  redeemBills: '/main/user.html#/redeemBills',
  redeemDetail: '/main/user.html#/redeemDetail/',
};

const v118 = Object.assign({},base,{
  taskcenter: '/activities/taskcenter.html#/v118',  // [*] 1.1.8 modified
  rule: '/activities/taskcenter.html#/rule',  // [+] 1.1.8 add
  invitepupil: '/subject/invitepupil.html',  // [*] 1.1.8 modified
  redeem: '/main/user.html#/withdrawal', // [*] 1.1.8 modified
  eggFrenzy:'/activities/eggFrenzy.html', // [+] 1.1.8 add
})

const v120 = Object.assign({},v118,{
  taskcenter: '/subject/taskcenter.html',  // [*] 1.2.0 modified
  rule: '/subject/taskcenter.html#/rule',  // [+] 1.2.0 modified
  invitepupil: '/subject/invitepupil.html#/v120',  // [*] 1.2.0 modified
  dice:'/activities/dice.html', // [+] 1.2.0 add
  lottery:'/activities/lottery.html', // [+] 1.2.0 add
  meeting:'/activities/meeting.html', // [+] 1.2.0 add
  novels:'/activities/novels.html', // [+] 1.2.0 add
  incomeBroadcast:'/subject/incomeBroadcast.html', // [+] 1.2.0 add
  questionNaire:'/subject/questionNaire.html', // [+] 1.2.0 add 
  ranking: '/main/user.html#/v120/ranking', // [*] 1.2.0 modified 
  shareIncome: '/activities/shareIncome.html#/v120',// [*] 1.2.0 modified 
  incomeBills:'/main/user.html#/v120/incomeBills',// [*] 1.2.0 modified 
})
const v121 = Object.assign({},v120,{
  helpHB:'/activities/helpHB.html',// [+] 1.2.1 add
  taskcenter: '/subject/taskcenter.html#/v121',  // [+] 1.2.1 add
})
const pagers = {
  // 共通页面&老页面
  base: base,
  // 1.1.8版本页面
  v118: v118,
  // 1.2.0 版本新页面
  v120: v120,
  // 1.2.1 版本新页面
  v121: v121,
}

export default pagers;