export interface MenuType {
  id: number;
  title: string;
  name: string;
  path: string;
  component: string;
  source?: string;
  children?: MenuType[];
}
export const getMenuList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title:'运营管理',
          children:[
            {
              id: 11,
              title:'车辆管理',
              name: 'CarManage',
              path: '/business/CarManage',
              component: 'CarManage',
              source: 'http://localhost:20001/assets/remoteEntry.js'
            },
            {
              id: 12,
              title:'车辆详情',
              name: 'CarDetail',
              path: '/business/CarDetail',
              component: 'CarDetail',
              source: 'http://localhost:20001/assets/remoteEntry.js'
            }
          ]
        },
        {
          id: 2,
          title:'用户管理',
          children:[
            {
              id: 21,
              title:'用户列表',
              name: 'UserList',
              path: '/user/UserList',
              component: '/user/UserList',
            },
            {
              id: 22,
              title:'用户角色',
              name: 'UserRole',
              path: '/user/UserRole',
              component: '/user/UserListView',
            }
          ]
        }
      ])
    }, 1000)
  })
}
