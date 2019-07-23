import request from '../interceptor'
export const list = params => request.get('/news/list.json', {params:params}) // 获取资讯列表
export const detail = params => request.get('/news/detail', {params:params}) // 获取资讯详情
