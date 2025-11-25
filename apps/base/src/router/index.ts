import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
// function loadRemoteComponent(name: string) {
//   console.log('=======', name)
//   return import(`remote-business/${name}`)
// }
const tempData = 'CarManage'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      component: () => import('@/components/Layout/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/DashboardView.vue')
        },
        {
          path: '/user/list',
          name: 'UserList',
          component: () => import('@/views/user/UserListView.vue')
        },
        {
          path: '/user/role',
          name: 'UserRole',
          component: () => import('@/views/user/UserRoleView.vue')
        },
        {
          path: '/system/config',
          name: 'SystemConfig',
          component: () => import('@/views/system/SystemConfigView.vue')
        },
        {
          path: '/system/logs',
          name: 'SystemLogs',
          component: () => import('@/views/system/SystemLogsView.vue')
        },
        {
          path: '/CarManage/CarManage',
          name: 'CarManage',
          component:() => import(`remote-business/${tempData}`)
        },
        {
          path: '/CarManage/CarDetail',
          name: 'CarDetail',
          component:  () => import('remote-business/CarDetail')
        },
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 初始化用户信息
  if (!userStore.isLoggedIn) {
    userStore.initUser()
  }

  // 检查是否需要登录
  if (to.meta.requiresAuth !== false && !userStore.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && userStore.isLoggedIn) {
    // 已登录用户访问登录页面，重定向到首页
    next('/dashboard')
  } else {
    next()
  }
})

export default router
