/*
 * @Author: xiaohu
 * @Date: 2022-12-07 15:34:10
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-19 11:24:19
 * @FilePath: \react-demo-ts\src\main.tsx
 * @Description: 
 */
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from "./router/index"
import './index.css'

console.log("router --->>>", router)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router}/>
)
