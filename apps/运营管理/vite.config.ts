import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from "@originjs/vite-plugin-federation";
import { remoteExport } from "./src/remote-export"
// https://vite.dev/config/
export default defineConfig({
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
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 2001
  }
})
