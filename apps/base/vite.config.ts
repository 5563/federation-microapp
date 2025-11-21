import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation'
import { remoteExport } from '../运营管理/src/remote-export'
// https://vite.dev/config/
const isDev = process.env.NODE_ENV === 'development'
console.log(
  'isDev===========',
  process.env
)
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    federation({
      remotes:{
        // 'remote-business': 'http://localhost:4173/assets/remoteEntry.js',
      },
      shared: ['vue', 'pinia', 'vue-router'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      ...Object.fromEntries(
        Object.entries(remoteExport).map(([key, value]) => {
          return [
            `remote-business/${key}`,
            fileURLToPath(new URL('../运营管理/' + value, import.meta.url)),
          ]
        }),
      ),
      // "remote-business/CarDetail":fileURLToPath(new URL('../运营管理/' + "src/views/CarManage/CarDetail.vue", import.meta.url))
    },
  },
  server: {
    port: 2000,
    open: true,
  },
})
