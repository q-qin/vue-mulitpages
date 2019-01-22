<template>
	<div>
	  <div class="msg-wrapper" style="position: absolute; z-index: 2001;" @touchmove.prevent>
	    <transition name="msgbox-bounce">
	      <div class="msgbox" v-show="value">
	        <div v-if="title !== ''" class="msgbox-header">
	          <!-- <div class="star" :class=""></div> -->
            <div class="msgbox-title" >{{ title }}</div>
	        </div>
	        <div class="msgbox-content" v-if="message !== ''">
	          <div class="msgbox-message" v-html="message"></div>
	        </div>
	        <div class="msgbox-btns">
	          <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }} </button>
	          <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
	        </div>
	      </div>
	    </transition>
	  </div>
	  <div class="v-modal" style="z-index: 2000;" v-show="value" @touchmove.prevent></div>
  </div>
</template>

<script type="text/babel">
let CONFIRM_TEXT = "确定";
let CANCEL_TEXT = "取消";

export default {
  props: {
    modal: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    inputType: {
      type: String,
      default: "text"
    },
    showSuccess: {
      default: false
    }
  },

  computed: {
    confirmButtonClasses() {
      let classes = "msgbox-btn msgbox-confirm " + this.confirmButtonClass;
      if (this.confirmButtonHighlight) {
        classes += " msgbox-confirm-highlight";
      }
      if(this.showCancelButton){
        classes += " btn_red ";
      }
      return classes;
    },
    cancelButtonClasses() {
      let classes = "msgbox-btn msgbox-cancel " + this.cancelButtonClass;
      if (this.cancelButtonHighlight) {
        classes += " msgbox-cancel-highlight";
      }
      return classes;
    }
  },

  methods: {
    doClose() {
      this.value = false;
      this._closing = true;

      this.onClose && this.onClose();

      setTimeout(() => {
        if (this.modal && this.bodyOverflow !== "hidden") {
          document.body.style.overflow = this.bodyOverflow;
          document.body.style.paddingRight = this.bodyPaddingRight;
        }
        this.bodyOverflow = null;
        this.bodyPaddingRight = null;
      }, 200);
      this.opened = false;

      if (!this.transition) {
        this.doAfterClose();
      }
    },

    handleAction(action) {
      var callback = this.callback;
      this.value = false;
      callback(action);
    }
  },

  watch: {},

  data() {
    return {
      title: "",
      message: "",
      type: "",
      value: "",
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: CONFIRM_TEXT,
      cancelButtonText: CANCEL_TEXT,
      confirmButtonClass: "",
      confirmButtonDisabled: false,
      cancelButtonClass: "",
      callback: null
    };
  }
};
</script>


<style lang="less" scoped>
.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}
.msgbox {
  position: fixed;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 0.2rem;
  user-select: none;
  -webkit-user-select: none;
  overflow: hidden;
  backface-visibility: hidden;
  transition: 0.2s;
}

.msgbox-header {
  width: 5.8rem;
  margin: auto;
  position: relative;
}

.msgbox-content {
  padding: 0 0.4rem;
  min-height: 1.1rem;
  position: relative;
}

.msgbox-title {
  text-align: center;
  padding-left: 0;
  padding: .2rem 0;
  font-size: 0.4rem;
}

.msgbox-message {
  color: #666;
  margin: 0;
  text-align: center;
  font-size: 0.32rem;
  line-height: 0.58rem;
}

.msgbox-btns {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 1.08rem;
}

.msgbox-btn {
  display: block;
  background-color: #fff;
  flex: 1;
  margin: 0;
  border: 0;
  border-top: 1px solid #e9e9e6;
  color: #282a2f;
  font-size: 0.32rem;
  text-align: center;
  &:focus {
    outline: none;
  }

  &:active {
    background-color: #fff;
  }
}
.btn_red{
  color:#fa2927;
}
.msgbox-cancel,.msgbox-confirm  {
  width: 50%;
}
.msgbox-cancel{
  border-right:  1px solid #e9e9e6;
}
.msgbox-bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.msgbox-bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>
