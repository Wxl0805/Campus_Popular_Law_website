import { createRouter, createWebHashHistory } from 'vue-router'

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
        import ('../views/FeedbackMessage.vue')
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
    // 修改页面名称
    document.title = `大学校园普法网站`;
    next();
});

export default router