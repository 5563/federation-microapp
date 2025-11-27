import type { MenuType } from '@/mock/menuApi'
import {
  __federation_method_getRemote as getRemote,
  __federation_method_setRemote as setRemote,
  __federation_method_unwrapDefault as unwrap,
} from 'virtual:__federation__'
interface RemoteOptions {
  url: string
  moduleName: string
}
export const getRemoteComponent = async (options: RemoteOptions): Promise<any> => {
  const { url, moduleName } = options

  const remoteName = `remote_${Math.random().toString(36).slice(2)}`
  // 1. 注册 remote 信息
  setRemote(remoteName, {
    url: () => Promise.resolve(url),
    format: 'esm',
    from: 'vite',
  })

  // 2. 加载模块
  const mod = await getRemote(remoteName, moduleName)

  // 3. 解包模块
  const Comp = await unwrap(mod)

  return Comp
}
export function convertMenuToRoutes(menuList: MenuType[]) {
  const routes: MenuType[] = []

  menuList.forEach(menu => {
    if (menu.children && menu.children.length) {
      menu.children.forEach(child => {
        routes.push(child)
      })
    }
  })

  return routes
}
