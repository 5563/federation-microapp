import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'MainLayout', // 添加 name 用于动态路由添加
      component: () => import('@/components/Layout/AdminLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: { title: '仪表盘' }
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 初始化用户信息
  if (!userStore.isLoggedIn) {
    await userStore.initUser()
  }

  // 检查是否需要登录
  if (to.path !== '/login' && !userStore.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && userStore.isLoggedIn) {
    // 已登录用户访问登录页面，重定向到首页
    next('/dashboard')
  } else {
    // 如果用户已登录但动态路由还没加载完成，等待加载
    if (userStore.isLoggedIn && !userStore.routesAdded) {
      try {
        await userStore.loadMenuAndRoutes()
        // 动态路由加载完成后，重新导航到目标路由
        next({ ...to, replace: true })
      } catch (error) {
        console.error('加载动态路由失败:', error)
        next()
      }
    } else {
      next()
    }
  }
})

export default router
