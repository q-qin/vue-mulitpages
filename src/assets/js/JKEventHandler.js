(function(window) {
    window.JKEventHandler = {
      browser: function() {
        var u = navigator.userAgent.toLowerCase();
        var app = navigator.appVersion.toLowerCase();
        return {
          txt: u, // 浏览器版本信息
          version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本号
          msie: /msie/.test(u) && !/opera/.test(u), // IE内核
          mozilla: /mozilla/.test(u) && !/(compatible|webkit)/.test(u), // 火狐浏览器
          safari: /safari/.test(u) && !/chrome/.test(u), //是否为safair
          chrome: /chrome/.test(u), //是否为chrome
          opera: /opera/.test(u), //是否为oprea
          presto: u.indexOf('presto/') > -1, //opera内核
          webKit: u.indexOf('applewebkit/') > -1, //苹果、谷歌内核
          gecko: u.indexOf('gecko/') > -1 && u.indexOf('khtml') == -1, //火狐内核
          mobile: !!u.match(/applewebkit.*mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
          android: u.indexOf('android') > -1, //android终端
          iPhone: u.indexOf('iphone') > -1, //是否为iPhone
          iPad: u.indexOf('ipad') > -1, //是否iPad
          weixin: /micromessenger/.test(u), //微信
          QQBrowse: u.indexOf('qq') > -1, // QQ浏览器
        }
      },
      //时间戳来自客户端，精确到毫秒，但仍旧有可能在在多线程下有并发，
      //尤其hash化后，毫秒数前面的几位都不变化，导致不同日期hash化的值有可能存在相同，
      //因此使用下面的随机数函数，在时间戳上加随机数，保证hash化的结果差异会比较大
      /*
       ** randomWord 产生任意长度随机字母数字组合
       ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
       ** 用法  randomWord(false,6);规定位数 flash
       *      randomWord(true,3，6);长度不定，true
       * arr变量可以把其他字符加入，如以后需要小写字母，直接加入即可
       */
      randomWord: function(randomFlag, min, max) {
        var str = "",
          range = min,
          arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // 随机产生
        if (randomFlag) {
          range = Math.round(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < range; i++) {
          var pos = Math.round(Math.random() * (arr.length - 1));
          str += arr[pos];
        }
        return str;
      },
      //产生一个hash值，只有数字
      hashCode: function(str) {
        var h = 0;
        var len = str.length;
        var t = 2147483648;
        for (var i = 0; i < len; i++) {
          h = 31 * h + str.charCodeAt(i);
          if (h > 2147483647) h %= t; //int溢出则取模
        }
        /*var t = -2147483648 * 2;
         while (h > 2147483647) {
         h += t
         }*/
        return h;
      },
      getHashcode: function() {
        //定义一个时间戳，计算与1970年相差的毫秒数  用来获得唯一时间
        var timestamp = (new Date()).valueOf();
        var myRandom = this.randomWord(false, 6);
        var hashcode = this.hashCode(myRandom + timestamp.toString());
        return hashcode;
      },
      callNativeFunction: function(functionString, params, callBack) {
        var methodName = (functionString.replace(/function\s?/mi, "").split("("))[0];
        let randomStamp = this.getHashcode(); // 随机戳
        var callBackName = methodName + 'CallBack_' + randomStamp;
        var message;
        if (!callBack) {
          message = {
            'methodName': methodName,
            'params': params
          };
          if (this.browser().ios) {
            window.webkit.messageHandlers.JKEventHandler.postMessage(message);
          } else if (this.browser().android) {
            android.JKEventHandler(JSON.stringify(message));
          }
        } else {
          message = {
            'methodName': methodName,
            'params': params,
            'callBackName': callBackName,
          };
          if (!Event._listeners[callBackName]) {
            Event.addEvent(callBackName, function(data) {
              callBack(data);
            });
          }
          if (this.browser().ios) {
            window.webkit.messageHandlers.JKEventHandler.postMessage(message);
          } else if (this.browser().android) {
            android.JKEventHandler(JSON.stringify(message));
          }
        }
      },
      callBack: function(callBackName, data) {
        Event.fireEvent(callBackName, data);
      },
      removeAllCallBacks: function(data) {
        Event._listeners = {};
      }
    }
    var Event = {
      _listeners: {},
      addEvent: function(type, fn) {
        if (typeof this._listeners[type] === "undefined") {
          this._listeners[type] = [];
        }
        if (typeof fn === "function") {
          this._listeners[type].push(fn);
        }
        return this;
      },
      fireEvent: function(type, param) {
        var arrayEvent = this._listeners[type];
        if (arrayEvent instanceof Array) {
          for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
            if (typeof arrayEvent[i] === "function") {
              arrayEvent[i](param);
            }
          }
        }
        return this;
      },
      removeEvent: function(type, fn) {
        var arrayEvent = this._listeners[type];
        if (typeof type === "string" && arrayEvent instanceof Array) {
          if (typeof fn === "function") {
            for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
              if (arrayEvent[i] === fn) {
                this._listeners[type].splice(i, 1);
                break;
              }
            }
          } else {
            delete this._listeners[type];
          }
        }
        return this;
      }
    };
  })(window)
  
  export default window.JKEventHandler
  