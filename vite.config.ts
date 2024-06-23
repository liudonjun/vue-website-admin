import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

console.log('NODE_ENV:', process.env.NODE_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  esbuild: {
    drop: isProd ? ['console', 'debugger'] : [],
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   },
  // },
})
