import { defineStore } from 'pinia'
import { ref } from 'vue'
export interface UserInfo {
  username: string
  token: string
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = ref(false)

  const login = (username: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // 模拟登录请求
      setTimeout(() => {
        if (username === 'admin' && password === '123456') {
          userInfo.value = {
            username: 'admin',
            token: 'mock-token-' + Date.now()
          }
          isLoggedIn.value = true
          localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
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
    localStorage.removeItem('userInfo')
  }

  const initUser = () => {
    const stored = localStorage.getItem('userInfo')
    if (stored) {
      try {
        userInfo.value = JSON.parse(stored)
        isLoggedIn.value = true
      } catch {
        localStorage.removeItem('userInfo')
      }
    }
  }

  return {
    userInfo,
    isLoggedIn,
    login,
    logout,
    initUser
  }
})
