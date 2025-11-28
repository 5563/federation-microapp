import type { MenuType } from '@/mock/menuApi'
import type { RouteRecordRaw } from 'vue-router'
import {
  __federation_method_getRemote as getRemote,
  __federation_method_setRemote as setRemote,
  __federation_method_unwrapDefault as unwrap,
} from 'virtual:__federation__'

interface RemoteOptions {
  url: string
  moduleName: string,
  type?: 'ts' | 'component'
}

export const getRemoteComponent = async (options: RemoteOptions): Promise<any> => {
  try {
    const { url, moduleName, type = 'component' } = options
  const remoteName = `remote_${Math.random().toString(36).slice(2)}`
  // 1. 注册 remote 信息
  setRemote(remoteName, {
    url: () => Promise.resolve(url),
    format: 'esm',
    from: 'vite',
  })

  // 2. 加载模块
  const mod = await getRemote(remoteName, `./${moduleName}`)
  console.log('======', type)
  if(type === 'ts') return mod
  // 3. 解包模块
  const Comp = await unwrap(mod)

  return Comp
  } catch (error) {

  }
}

// 使用 import.meta.glob 预加载所有 views 组件
const modules = import.meta.glob("../views/**/*.vue")

/**
 * 动态加载组件（支持本地和远程组件）
 */
export function loadDynamicComponent(menu: MenuType) {
  if (menu.source && menu.component) {
    // 远程组件加载
    return () => getRemoteComponent({
      url: menu.source as string,
      moduleName: menu.component
    })
  } else if (menu.component) {
    // 本地组件加载 - 使用 import.meta.glob
    let componentPath: string

    if (menu.component.startsWith('/')) {
      // 如果是路径格式 (如 /user/UserList)，转换为相对路径
      componentPath = `../views${menu.component}.vue`
    } else {
      // 如果是组件名格式 (如 UserList)，添加路径前缀
      componentPath = `../views/${menu.component}.vue`
    }

    const moduleLoader = modules[componentPath]

    if (moduleLoader) {
      return moduleLoader
    } else {
      console.warn(`组件未找到: ${componentPath}，可用组件:`, Object.keys(modules))
      return () => Promise.resolve({
        template: '<div>组件未找到</div>'
      })
    }
  }
  return undefined
}

/**
 * 将菜单数据转换为 Vue Router 路由配置
 */
export function convertMenuToRoutes(menuList: MenuType[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  menuList.forEach(menu => {
    // 如果有子菜单，递归处理子菜单项
    if (menu.children && menu.children.length > 0) {
      const childRoutes = convertMenuToRoutes(menu.children)
      routes.push(...childRoutes)
    } else if (menu.path && menu.component) {
      // 只为有路径和组件的叶子节点创建路由
      const route: RouteRecordRaw = {
        path: menu.path,
        name: menu.name,
        meta: {
          title: menu.title,
          id: menu.id
        },
        children: [],
        component: loadDynamicComponent(menu)
      }
      routes.push(route)
    }
  })

  return routes
}

/**
 * 获取扁平化的路由列表（用于权限控制等）
 */
export function getFlatRoutes(menuList: MenuType[]): MenuType[] {
  const routes: MenuType[] = []

  menuList.forEach(menu => {
    if (menu.children && menu.children.length) {
      // 递归获取子路由
      routes.push(...getFlatRoutes(menu.children))
    } else if (menu.component) {
      // 只添加有组件的叶子节点
      routes.push(menu)
    }
  })

  return routes
}
