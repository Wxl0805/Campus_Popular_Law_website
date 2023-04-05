import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getUserRouteObj } from '@/permission/getUserRouter'
import Layout from '@/views/Layout.vue'

// 先添加一部分不要权限的公共路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/TreeTab.vue'),
        meta: {
          role: [['admin']],
          title: '首页',
          isShow: true,
          isOnRouter: true
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/Error/403.vue')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/Error/500.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/Error/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name === 'Login' && (token && token != null && token.length > 0)) {
    next({ path: '/' })
  } else if (to.name === 'Login' || (token && token != null && token.length > 0)) {
    next()
  } else next({ name: 'Login' })
})

// 权限路由，拿所有的路由去匹配当前角色有的，生成一份新的路由，在router对象里
export const getRoutes = (store) => {
  if (localStorage.getItem('token')) {
    const routerTree = getUserRouteObj(store)
    if (routerTree !== undefined) {
      routerTree.forEach(item => {
        if (item !== undefined) {
          router.addRoute('Layout', <RouteRecordRaw><unknown>item)
        }
      })
    }
  }
}

export default router
