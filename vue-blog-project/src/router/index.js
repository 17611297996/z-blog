import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/pcWeb/home.vue';
import MobileHomeView from '../views/mobileWeb/home/index.vue'; // 移动端首页组件
import Detail from "../views/Detail/index.vue"
import { isMobile } from '@/utils/index.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home',
      name: 'mobileHome',
      component: MobileHomeView,
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    },
    // 其他路由...
  ],
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/' && isMobile()) {
    next('/home'); // 如果是移动端，重定向到移动端首页
  } else {
    next(); // 否则继续导航
  }
});

export default router;