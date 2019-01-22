var appcall = {
    // 获取设备信息等公共参数
    getAppData: function () {
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
    getSign: function (requestParams) {
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
    getUserInfo: function () {
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
    getRequestData: function (requestParams) {
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
    // 打开内嵌H5页面 参数：title + url
    navigator: function (params={}) {
      JKEventHandler.callNativeFunction('navigator', params, '')
    },
    // 登录
    login: function () {
      JKEventHandler.callNativeFunction('login', '{}', '')
    },
    // 展示原生toast
    showToast:function(message=''){
      JKEventHandler.callNativeFunction('showToast', { message:message }, '')
    },
    // 发送短信
    sms:function(params){
      JKEventHandler.callNativeFunction('sendSms', params, '')
    },
  };
  
  export default appcall
  