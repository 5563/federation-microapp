import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMenuList, type MenuType } from '@/mock/menuApi'
import { convertMenuToRoutes } from '@/utils'
import router from '@/router'

export interface UserInfo {
  username: string
  token: string
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = ref(false)
  const menuList = ref<MenuType[]>([])
  const routesAdded = ref(false)

  const login = async (username: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // 模拟登录请求
      setTimeout(async () => {
        if (username === 'admin' && password === '123456') {
          userInfo.value = {
            username: 'admin',
            token: 'mock-token-' + Date.now()
          }
          isLoggedIn.value = true
          localStorage.setItem('userInfo', JSON.stringify(userInfo.value))

          // 登录成功后加载菜单和动态路由
          await loadMenuAndRoutes()
          resolve(true)
        } else {
          resolve(false)
        }
      }, 1000)
    })
  }

  const logout = () => {
    userInfo.value = null
    isLoggedIn.value = false
    menuList.value = []
    routesAdded.value = false
    localStorage.removeItem('userInfo')
    localStorage.removeItem('menuList')
  }

  const initUser = async () => {
    const stored = localStorage.getItem('userInfo')
    if (stored) {
      try {
        userInfo.value = JSON.parse(stored)
        isLoggedIn.value = true

        // 初始化时也需要加载菜单和路由
        await loadMenuAndRoutes()
      } catch {
        localStorage.removeItem('userInfo')
      }
    }
  }

  /**
   * 加载菜单并添加动态路由
   */
  const loadMenuAndRoutes = async () => {
    try {
      // 先尝试从缓存获取菜单
      // const cachedMenu = localStorage.getItem('menuList')
      // if (cachedMenu && !routesAdded.value) {
      //   menuList.value = JSON.parse(cachedMenu)
      //   addDynamicRoutes(menuList.value)
      //   return
      // }

      // 获取菜单数据
      const menus = await getMenuList() as MenuType[]
      menuList.value = menus
      // debugger
      // 缓存菜单数据
      localStorage.setItem('menuList', JSON.stringify(menus))

      // 添加动态路由
      addDynamicRoutes(menus)
    } catch (error) {
      console.error('加载菜单失败:', error)
    }
  }

  /**
   * 添加动态路由
   */
  const addDynamicRoutes = (menus: MenuType[]) => {
    if (routesAdded.value) return

    const dynamicRoutes = convertMenuToRoutes(menus)

    // 将动态路由添加到主布局的子路由中
    dynamicRoutes.forEach(route => {
      router.addRoute('MainLayout', route) // 'MainLayout' 是主布局路由的 name
    })

    routesAdded.value = true
    console.log('动态路由添加完成:', dynamicRoutes)
  }

  return {
    userInfo,
    isLoggedIn,
    menuList,
    routesAdded,
    login,
    logout,
    initUser,
    loadMenuAndRoutes
  }
})
