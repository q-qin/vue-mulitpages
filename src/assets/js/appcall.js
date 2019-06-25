var appcall = {
    // 获取设备信息等公共参数
    getAppData () {
      return new Promise((resolve, reject) => {
        try {
          //resolve({uid:1,token:2})
          JKEventHandler.callNativeFunction('getAppData', '{}', data => {
            let rs = JSON.parse(data);
            resolve(rs);
          });
        } catch (e) {
          resolve({})
        }
      })
    },
    // 获取签名
    getSign (requestParams) {
      return new Promise((resolve, reject) => {
        try {
          //resolve({sign:this.i++})
          JKEventHandler.callNativeFunction('getSign', requestParams, data => {
            let rs = JSON.parse(data);
            resolve(rs);
          });
        } catch (e) {
          resolve({})
        }
      })
    },
    // 获取用户信息
    getUserInfo () {
      return new Promise((resolve, reject) => {
        try {
          JKEventHandler.callNativeFunction('getUserInfo', '{}', data => {
            let rs = JSON.parse(data);
            resolve(rs);
          });
        } catch (e) {
          resolve({})
        }
      })
    },
    // 获取带签名的公共参数
    getRequestData (requestParams) {
      return new Promise(async(resolve, reject) => {
        try {
          let params = {};
          let appdata = await this.getAppData();
          // app参数 => params
          Object.assign(params, appdata, {});
          // app参数+业务参数 => sign
          let signParams = Object.assign({}, appdata, requestParams);
          let sign = await this.getSign(signParams);
          // params+sign => params;
          Object.assign(params, sign, params);
          resolve(params);
        } catch (e) {
          resolve({})
        }
      })
    },
    // 获取字体大小 默认中号字体2
    getFontSize () {
      return new Promise((resolve, reject) => {
        try {
          JKEventHandler.callNativeFunction('getFontSize', '{}', data => {
            let rs = JSON.parse(data);
            resolve(rs);
          });
        } catch (e) {
          resolve({
            type: 2
          })
        }
      })
    },
    // 获取ios提审状态
    getReviewStatus () {
      return new Promise(async(resolve, reject) => {
        if (JKEventHandler.browser().ios) {
          let appdata = await this.getAppData();
          // 低版本默认审核通过(无reviewstatus字段)
          if (appdata && appdata.reviewstatus == 1) {
            resolve(true);
          } else {
            resolve(false)
          }
        } else {
          resolve(false)
        }
      })
    },
  
    // 跳转资讯列表.sc_catid栏目分类id
    articles (params={}) {
      JKEventHandler.callNativeFunction('task_complete', params, '')
    },
    // 跳转视频列表.sc_catid栏目分类id
    videos (params={}) {
      JKEventHandler.callNativeFunction('task_spgk', params, '')
    },
    // 打开内嵌H5页面 参数：title + url
    navigator (params={}) {
      JKEventHandler.callNativeFunction('navigator', params, '')
    },
    // 没导航栏跳转
    navigator_no_header(params={}){
      JKEventHandler.callNativeFunction('navigator_no_header', params, '')
    },
    // 广告页面跳转
    navigator_ad(params={}){
      JKEventHandler.callNativeFunction('openNativeAd', params, '')
    },
    // 打开小说。类似navigator
    openNovel(params={}){
      JKEventHandler.callNativeFunction('openNovel', params, '')
    },
    // 登录
    login () {
      JKEventHandler.callNativeFunction('login', '{}', '')
    },
    /* 分享
    ** type:
        1微信朋友
        2朋友圈
        3晒海报
        4晒百宝箱
        5qq好友
        6微信纯文字
        7qq纯文字 
        9android微信好友链接形式
        10android朋友圈链接形式
        11androidQQ链接形式
        12androidQQ空间链接形式
      文字：title  标题：desc 图片：images 链接：url
    */
    invite (params) {
      JKEventHandler.callNativeFunction('my_invite', params, '')
    },
    /**
     * ios分享到QQ
     * type:
     *    1分享单图
     *    2分享网页链接
     * 文字：title  标题：desc 图片：imageUrl 链接：url
     */
    invite_iosqq(params){
      JKEventHandler.callNativeFunction('my_sharetoqq', params, '')
    },
    // 文章分享
    // type:1微信朋友2微信朋友圈3qq好友4qq空间
    shareArticle (params,callback) {
      JKEventHandler.callNativeFunction('shareArticle', params, data => {
        callback(data);
      })
    },
    // 打开某条特定资讯 参数：资讯id
    gotoarticle (params) {
      JKEventHandler.callNativeFunction('gotoarticle', params, '')
    },
    // 打开其他资讯 type:1文章2视频,id:资讯id
    openother (params) {
      JKEventHandler.callNativeFunction('openother', params, '')
    },
    // 评论 type:1文章2视频
    comment (params) {
      JKEventHandler.callNativeFunction('comment', params, '')
    },
    // 查看更多评论type:1文章2视频
    morecomment (params) {
      JKEventHandler.callNativeFunction('morecomment', params, '')
    },
    // 在线客服
    onlinekf () {
      JKEventHandler.callNativeFunction('onlinekf', '{}', '')
    },
    // 邀请码设置成功
    user_binding () {
      JKEventHandler.callNativeFunction('user_binding', '{}', '')
    },
    // 复制 code:1111
    invite_copy (params) {
      JKEventHandler.callNativeFunction('invite_copy', params, '')
    },
    //打开微信添加好友
    openWechat (params) {
      JKEventHandler.callNativeFunction('openWechat', params, '')
    },
    // 跳转来源主页
    regionHomepage (params) {
      JKEventHandler.callNativeFunction('regionHomepage', params, '')
    },
    // 绑定支付宝
    bindzfb () {
      JKEventHandler.callNativeFunction('bindzfb', '{}', '')
    },
    // 展示原生toast
    showToast(message){
      JKEventHandler.callNativeFunction('showToast', { message:message }, '')
    },
    // 发送短信
    sms(params){
      JKEventHandler.callNativeFunction('sendSms', params, '')
    },
    // 隐藏头部
    hideNavBar(){
      JKEventHandler.callNativeFunction('hideNavBar', '{}', '')
    },
    // 返回
    goBack(){
      JKEventHandler.callNativeFunction('goBack', '{}', '')
    },
    // 播放金币音频
    playGoldAudio(){
      JKEventHandler.callNativeFunction('playGoldAudio', '{}', '')
    },
    // 展开阅读全文
    showfull(){
      JKEventHandler.callNativeFunction('showfull', '{}', '')
    },
    // 完全加载
    pageLoaded(){
      JKEventHandler.callNativeFunction('pageLoaded', '{}', '')
    },
    // 文章详情原生分享
    articleDetailShare(){
      JKEventHandler.callNativeFunction('articleDetailShare', '{}', '')
    },
    // 任务中心签到弹窗
    nativeSign(params){
      JKEventHandler.callNativeFunction('nativeSign', params, '')
    },
  };
  
  export default appcall
  