import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
// function loadRemoteComponent(name: string) {
//   console.log('=======', name)
//   return import(`remote-business/${name}`)
// }
const tempData = 'CarManage'
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
      component: () => import('@/components/Layout/AdminLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/dashboard'
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
  if (to.path !== '/login' && !userStore.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && userStore.isLoggedIn) {
    // 已登录用户访问登录页面，重定向到首页
    next('/dashboard')
  } else {
    next()
  }
})

export default router
