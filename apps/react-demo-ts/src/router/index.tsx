/*
 * @Author: xiaohu
 * @Date: 2023-03-03 10:32:42
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-27 11:35:01
 * @FilePath: \Explores\apps\react-demo-ts\src\router\index.tsx
 * @Description: 
 */
import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import Demos from "@/pages/Demos"
import Series from "@/pages/Series"


export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/demos",
    element: <Demos />
  },
  {
    path: "/series",
    element: <Series />
  },
])