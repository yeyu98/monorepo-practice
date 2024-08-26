/*
 * @Author: xiaohu
 * @Date: 2022-12-07 15:34:10
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-08-26 15:44:43
 * @FilePath: \monorepo-practice\apps\react-demo-ts\src\main.tsx
 * @Description: 
 */
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from "./router/index"
import { Provider } from 'react-redux'
import store from '@/store/redux/index'
import './index.less'
import WebVitals from './utils/WebVitals'
import VConsole from 'vconsole'

new VConsole()

new WebVitals()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
