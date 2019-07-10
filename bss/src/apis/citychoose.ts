import axios from "./axios";
const BASEURL = "merchant/oauth/";
/**
 * 合作商筛选（查询所有市区级别下门店数）
 * @param cityId
 * @returns {*}
 */
export function storecitys(data: { cityId: number }): Promise<[]> {
  return axios.post(`${BASEURL}bossreport/storecitys`, data);
}

export function areastorelist(data: {
  cityId: number;
  areaId: number;
}): Promise<[]> {
  return axios.post(`${BASEURL}bossreport/areastorelist`, data);
}
