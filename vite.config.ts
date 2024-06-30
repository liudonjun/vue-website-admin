import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

console.log('NODE_ENV:', process.env.NODE_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 配置SVG图标插件
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  // build: {
  //   chunkSizeWarningLimit: 1000,
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           // 根据库的路径或名称将它们分割到不同的chunk
  //           const name = id.split('node_modules/')[1].split('/')[0];
  //           return name;
  //         }
  //       }
  //     }
  //   }
  // },
  // server: {
  //   port: 5173,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:9000',
  //       secure: false,
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/dev-api/, ''),
  //     },
  //   },
  // },
  esbuild: {
    drop: isProd ? ['console', 'debugger'] : [],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
