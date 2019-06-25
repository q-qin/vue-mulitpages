import request from '../interceptor'
export const login = params => request.post('/user/login', params) // 获取资讯列表