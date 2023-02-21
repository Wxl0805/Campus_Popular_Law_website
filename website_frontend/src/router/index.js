import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },{
    path: '/home',
    name: 'Home',
    component: Home
  },{
    path: '/product',
    name: 'Product',
    component: ()=>import('../views/product.vue')
  },{
    path: '/download',
    name: 'Download',
    component: ()=>import('../views/download.vue')
  },{
    path: '/support',
    name: 'Support',
    component: ()=>import('../views/support.vue')
  },{
    path: '/forum',
    name: 'Forum',
    component: ()=>import('../views/forum.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
