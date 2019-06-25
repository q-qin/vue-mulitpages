import index from '@/views/main/home/index.vue'
import list from '@/views/main/home/list.vue'
import detail from '@/views/main/home/detail.vue'

const routers = [{
        name: 'index',
        path: '/',
        meta: {
            title: '首页'
        },
        component: index
    },{
        name: 'list',
        path: '/list',
        meta: {
            title: '列表'
        },
        component: list
    },
    {
        name: 'detail',
        path: '/detail/:id',
        meta: {
            title: '详情'
        },
        component: detail
    },
]

export default routers