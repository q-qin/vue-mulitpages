import axios from "./axios";
const BASEURL = "merchant/oauth/";
/**
 * 签约-饼图
 * @param dateRegion
 * @param code
 * @returns {*}
 */
export function pieConstruct(param: { dateRegion: number }) {
  return axios.post(`${BASEURL}bossreport/panelpie/sign`, param);
}

/**
 * 课程销售-饼图
 * @param dateRegion
 * @param code
 * @returns {*}
 */
export function pieLesson(param: { dateRegion: number }) {
  return axios.post(`${BASEURL}bossreport/panelpie/sale`, param);
}

/**
 * 运营-折线
 * @param dateRegion
 * @param code
 * @returns {*}
 */
export function pieOperate(param: { dateRegion: number }) {
  return axios.post(`${BASEURL}bossreport/panelpie/run`, param);
}

/**
 * 课程销售-折线
 * @param dateRegion
 * @param code
 * @returns {*}
 */
export function lineLesson(param: { dateRegion: number }) {
  return axios.post(`${BASEURL}bossreport/panelline/sale`, param);
}
/**
 * 签约-折线
 * @param dateRegion
 * @param code
 * @returns {*}
 */
export function panelline(param: { dateRegion: number }) {
  return axios.post(`${BASEURL}bossreport/panelline/sign`, param);
}
