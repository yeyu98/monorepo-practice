/*
 * @Author: xiaohu
 * @Date: 2023-03-03 10:32:42
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-07-29 21:06:43
 * @FilePath: \Explores\apps\react-demo-ts\src\router\index.tsx
 * @Description: 
 */
import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import Demos from "@/pages/Demos"
import DanceText from "@/pages/DanceText"
import Series from "@/pages/Series"
import Test from "@/pages/Test"


export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/danceText",
    element: <DanceText />
  },
  {
    path: "/demos",
    element: <Demos />
  },
  {
    path: "/series",
    element: <Series />
  },
  {
    path: "/test",
    element: <Test />
  },
])