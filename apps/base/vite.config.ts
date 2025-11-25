import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation'
const isDev = process.env.NODE_ENV === 'development'
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    federation({
      remotes:{
        'remote-business': 'http://localhost:20001/assets/remoteEntry.js',
        'remote-vue': 'http://localhost:20002/assets/remoteEntry.js',
      },
      shared: ['vue', 'pinia', 'vue-router'],
    }),
    {
      name: 'vite-plugin-reload-endpoint',

      // 仅 dev 模式有 dev server
      configureServer(server) {

        // 添加一个中间件处理 HTTP 请求
        server.middlewares.use((req, res, next) => {

          // remote build 后会访问这里
          if (req.url === '/__fullReload') {

            console.log('[host] 收到 remote 通知，即将刷新页面');

            // 触发浏览器刷新
            setTimeout(() =>{
              server.hot.send({
                type: 'full-reload'
              });
            },100)

            res.end('Full reload triggered');
          } else {
            next(); // 继续下一个中间件
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 2000,
    open: true,
  },
})
