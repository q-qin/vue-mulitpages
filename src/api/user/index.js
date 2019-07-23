import request from '../interceptor'
// export const login = params => request.post('/user/login', params) // 登录post
export const login = params => request.get('/user/user.json', {params:params}) // 登录get