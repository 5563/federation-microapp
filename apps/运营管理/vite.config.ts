import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from "@originjs/vite-plugin-federation";
import { remoteExport } from "./src/remote-export"
import syncReloadPlugin from 'vite-plugin-sync-reload'
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
    syncReloadPlugin({
      role: 'remote',
      host: 'http://localhost:20000'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
})
