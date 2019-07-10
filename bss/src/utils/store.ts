// @ts-ignore
import store from "store2";
class Cookie {
  get(cookie_name: string): [] | string {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("=");
      if (cookie_name == arr[0]) {
        return arr[1];
      }
    }
    return "";
  }
  set(cname: string, cvalue: string, exdays: number): void {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
}

export const cookie = new Cookie();

export const local = store.local;

export const session = store.session;
