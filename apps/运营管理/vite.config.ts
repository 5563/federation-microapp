import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from "@originjs/vite-plugin-federation";
import { remoteExport } from "./src/remote-export"
// https://vite.dev/config/
export default defineConfig({
  // base: process.env.NODE_ENV === 'production' ? './' : '/federation-operation/',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    federation({
      name: 'remote-business',
      filename: 'remoteEntry.js',
      exposes: Object.fromEntries(
        Object.entries(remoteExport).map(([key, value]) => [`./${key}`, value])
      ),
      shared: ['vue', 'pinia', 'vue-router']
    }),
    {
      name: 'vite-plugin-notify-host-on-rebuild',

      // 只在 build --watch 时生效
      apply(config, { command }) {
        // 当 command = 'build' 且 build.watch = true 才启用
        return Boolean(command === 'build' && config.build?.watch);
      },

      // 每次构建结束（文件变化触发 watch）时执行
      async buildEnd(error) {
        if (!error) {
          try {
            // 通知 host 刷新
            await fetch('http://localhost:2000/__fullReload');
          } catch (e) {
            // host 没启动也不会报错
            console.log('[remote] 通知 host 刷新失败（可能 host 未启动）');
          }
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
})
