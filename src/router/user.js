import user from '@/views/main/user/user.vue'
import login from '@/views/main/user/login.vue'
const routers = [{
        name: 'index',
        path: '/',
        meta: {
            title: '首页'
        },
        component: user
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: login
    }
]

export default routers