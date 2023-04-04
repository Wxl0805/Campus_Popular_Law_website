import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index';
import storage from '../utils/storage'
import { ElNotification } from 'element-plus' // 提示信息

const routes = [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue')
    }, {
        path: '/news',
        name: 'News',
        component: () =>
            import ('../views/News.vue')
    }, {
        path: '/videozone',
        name: 'VideoZone',
        component: () =>
            import ('../views/VideoZone.vue')
    }, {
        path: '/feedbackmessage',
        name: 'FeedbackMessage',
        component: () =>
            import ('../views/FeedbackMessage.vue'),
        // 某些页面规定必须登录后才能查看 ，可以在router中配置meta，将需要登录的requireAuth设为true，
        meta: {
            // requireAuth: true,
            keepAlive: true,
        }
    }, {
        path: '/messageinfo',
        name: 'MessageInfo',
        component: () =>
            import ('../views/MessageInfo.vue'),
    }, {
        path: '/userinfo',
        name: 'UserInfo',
        component: () =>
            import ('../views/UserInfo.vue'),
        // 某些页面规定必须登录后才能查看 ，可以在router中配置meta，将需要登录的requireAuth设为true，
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 设置路由守卫，在进页面之前，判断有token，才进入页面，否则返回登录页面
if (storage.get("token")) {
    store.commit("setToken", storage.get("token"));
}
// 路由前置守卫
router.beforeEach((to, from, next) => {
    // 修改页面名称
    document.title = `大学校园普法网站`;
    // 判断要去的路由有没有requiresAuth
    // to.matched.some(r => r.meta.requireAuth) or to.meta.requiresAuth
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next(); //有token,进行request请求，后台还会验证token
        } else {
            ElNotification({
                message: '未登录，请先登录',
                duration: 2000,
                type: 'error',
                title: 'Error',
            });
            next({
                path: "/login",
                // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next(); //如果无需token,那么随它去吧
    }
});

export default router