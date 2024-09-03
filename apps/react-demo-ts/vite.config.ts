/*
 * @Author: xiaohu
 * @Date: 2022-12-07 15:34:10
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-03 09:18:23
 * @FilePath: \monorepo-practice\apps\react-demo-ts\vite.config.ts
 * @Description: 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
       "@": "/src"
    }
    // extensions: ["tsx", "jsx", "ts", "js"]
  },
  build: {
    minify: false
  },
  server: {
    open: true, // 是否自动打开浏览器
    proxy: {
      "/api": {
        target: "https://www.duitang.com",
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path.replace(/^\/api/, ""))
          return path.replace(/^\/api/, "")
        },
        
      }
      // '/api': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
    }
  }
  // server: {
  //   port: 80,
  //   host: "192.168.19.28", // 配置局域网访问
  //   proxy: {
  //     // "/api": {
  //     //   target: "http://examvideo.51bm.net.cn",
  //     //   changeOrigin: true,
  //     // rewrite: (path) => path.replace(/^\/api/, ""),
  //     // },
  //   },
  // },
})
