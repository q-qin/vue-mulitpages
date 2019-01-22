var CONFIRM_TEXT = '确定';
var CANCEL_TEXT = '取消';

var defaults = {
  title: '温馨提示',
  message: '',
  type: '',
  value: false,
  showInput: false,
  showClose: true,
  modalFade: false,
  lockScroll: false,
  closeOnClickModal: true,
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: 'right',
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT,
  confirmButtonClass: '',
  cancelButtonClass: '',
  showSuccess:false,
};

import Vue from 'vue';
import msgboxVue from '@/components/msgbox.vue';

var merge = function(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i];
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};

var msgboxConstructor = Vue.extend(msgboxVue);

var currentMsg, instance;
var msgQueue = [];

const defaultCallback = action => {
  if (currentMsg) {
    var callback = currentMsg.callback;
    if (typeof callback === 'function') {
      callback(action);
    }
    if (currentMsg.resolve) {
      var $type = currentMsg.options.$type;
      if ($type === 'confirm') {
        if (action === 'confirm') {
          currentMsg.resolve(action);
        } else if (action === 'cancel' && currentMsg.reject) {
          currentMsg.reject(action);
        }
      } else {
        currentMsg.resolve(action);
      }
    }
  }
};

var initInstance = function() {
  instance = new msgboxConstructor({
    el: document.createElement('div')
  });

  instance.callback = defaultCallback;
};

var showNextMsg = function() {
  if (!instance) {
    initInstance();
  }

  if (!instance.value || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();

      var options = currentMsg.options;
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        instance.value = true;
      });
    }
  }
};

var msgbox = function(options, callback) {
  if (typeof options === 'string') {
    options = {
      title: options
    };
    if (arguments[1]) {
      options.message = arguments[1];
    }
    if (arguments[2]) {
      options.type = arguments[2];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  if (typeof Promise !== 'undefined') {
    return new Promise(function(resolve, reject) { // eslint-disable-line
      msgQueue.push({
        options: merge({}, defaults, msgbox.defaults || {}, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      });

      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: merge({}, defaults, msgbox.defaults || {}, options),
      callback: callback
    });

    showNextMsg();
  }
};

msgbox.setDefaults = function(defaults) {
  msgbox.defaults = defaults;
};

msgbox.alert = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return msgbox(merge({
    title: title,
    message: message,
    $type: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options));
};

msgbox.success = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return msgbox(merge({
    title: title,
    message: message,
    showSuccess:true,
    $type: 'success',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options));
};

msgbox.confirm = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return msgbox(merge({
    title: title,
    message: message,
    showSuccess:true,
    $type: 'confirm',
    showCancelButton: true
  }, options));
};

msgbox.close = function() {
  if (!instance) return;
  instance.value = false;
  msgQueue = [];
  currentMsg = null;
};



const ToastConstructor = Vue.extend(require('@/components/toast.vue'));
let toastPool = [];
let getAnInstance = () => {
  if (toastPool.length > 0) {
    let instance = toastPool[0];
    toastPool.splice(0, 1);
    return instance;
  }
  return new ToastConstructor({
    el: document.createElement('div')
  });
};

let returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance);
  }
};

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

ToastConstructor.prototype.close = function() {
  this.visible = false;
  this.$el.addEventListener('transitionend', removeDom);
  this.closed = true;
  returnAnInstance(this);
};

var Toast = function(options, callback) {
  let duration = options.duration || 2000;

  let instance = getAnInstance();
  instance.closed = false;
  clearTimeout(instance.timer);
  instance.message = typeof options === 'string' ? options : options.message;
  instance.position = options.position || 'bottom';
  instance.className = options.className || '';
  instance.iconClass = options.iconClass || '';

  document.body.appendChild(instance.$el);
  Vue.nextTick(function() {
    instance.visible = true;
    instance.$el.removeEventListener('transitionend', removeDom);
    ~duration && (instance.timer = setTimeout(function() {
      if (instance.closed) return;
      instance.close();
    }, duration));
  });
  return instance;
};

msgbox.toast = function(message, options) {
  return Toast(merge({message: message},options));
};



export default msgbox;
export { msgbox };
