/*
 * @Author: xiaohu
 * @Date: 2022-12-07 15:34:10
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-10-10 21:56:56
 * @FilePath: \Explores\apps\react-demo-ts\src\main.tsx
 * @Description: 
 */
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from "./router/index"
import { Provider } from 'react-redux'
import store from '@/store/redux/index'
import './index.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
