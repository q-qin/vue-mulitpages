import axios from "./axios";
const BASEURL = "merchant/oauth/";
/**
 * 合作商课程销售饼图
 * @param storeId
 * @param dateRegion
 * @returns {*}
 */
export function coursesale(data: {
  storeId: number;
  dateRegion: number;
}): Promise<{
  orderAmounList?: {}[] | null;
  totalCourseAmount?: number | null;
  totalCourseOrders?: number | null;
}> {
  return axios.post(`${BASEURL}bossreport/coursesale`, data);
}

/**
 * 合作商课程消耗
 * @param storeId
 * @returns {*}
 */
export function courseconsume(data: { storeId: number }): Promise<[]> {
  return axios.post(`${BASEURL}bossreport/courseconsume`, data);
}

/**
 * 合作商机构课表
 * @param storeId
 * @param queryDate
 * @returns {*}
 */
export function classschedule(data: {
  storeId: number;
  queryDate: string;
}): Promise<[]> {
  return axios.post(`${BASEURL}bossreport/classschedule`, data);
}
