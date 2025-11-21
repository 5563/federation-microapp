# 后台管理系统

这是一个基于 Vue 3 + TypeScript + Element Plus 构建的现代化后台管理系统模板。

## 功能特性

- ✅ 用户登录/登出功能
- ✅ 响应式后台管理布局
- ✅ 左侧可折叠菜单
- ✅ 仪表盘数据展示
- ✅ 用户管理模块
- ✅ 路由权限控制
- ✅ 状态管理 (Pinia)
- ✅ 现代化 UI 设计

## 技术栈

- **前端框架**: Vue 3.5+
- **开发语言**: TypeScript
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **构建工具**: Vite
- **代码规范**: ESLint + Prettier

## 项目结构

```
src/
├── components/           # 公共组件
│   └── Layout/          # 布局组件
│       └── AdminLayout.vue  # 后台管理布局
├── views/               # 页面组件
│   ├── DashboardView.vue    # 仪表盘
│   ├── LoginView.vue       # 登录页面
│   ├── user/              # 用户管理
│   │   ├── UserListView.vue
│   │   └── UserRoleView.vue
│   └── system/            # 系统管理
│       ├── SystemConfigView.vue
│       └── SystemLogsView.vue
├── router/              # 路由配置
│   └── index.ts
├── stores/              # 状态管理
│   ├── counter.ts
│   └── user.ts         # 用户状态
├── App.vue             # 根组件
└── main.ts             # 应用入口
```

## 快速开始

### 环境要求

- Node.js >= 20.19.0 或 >= 22.12.0
- pnpm

### 安装依赖

```sh
pnpm install
```

### 开发模式

```sh
pnpm dev
```

应用将运行在 http://localhost:2000/

### 生产构建

```sh
pnpm build
```

### 类型检查

```sh
pnpm type-check
```

### 代码检查

```sh
pnpm lint
```

### 代码格式化

```sh
pnpm format
```

## 默认账号

- **用户名**: admin
- **密码**: 123456

## 功能说明

### 登录功能
- 简洁的登录界面
- 表单验证
- 登录状态保持 (localStorage)
- 路由权限控制

### 后台管理布局
- 左侧可折叠菜单
- 顶部用户信息显示
- 面包屑导航
- 响应式设计

### 页面功能
- **仪表盘**: 数据统计、图表占位、系统状态、最近活动
- **用户管理**: 用户列表、搜索、分页、状态切换
- **系统管理**: 配置管理、操作日志（占位页面）

## 开发说明

### 状态管理
使用 Pinia 进行状态管理，用户信息存储在 `stores/user.ts` 中。

### 路由守卫
实现了完整的路由守卫，未登录用户自动跳转到登录页，已登录用户访问登录页自动跳转到首页。

### 组件库
使用 Element Plus 作为 UI 组件库，包含丰富的组件和主题定制。

### 样式规范
- 使用 SCSS 预处理器
- 统一的颜色变量和间距规范
- 响应式设计

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
pnpm test:unit:dev # or `pnpm test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
