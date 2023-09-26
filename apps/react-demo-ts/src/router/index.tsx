/*
 * @Author: Jerry
 * @Date: 2023-03-03 10:32:42
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-09-26 21:28:18
 * @FilePath: \Explores\apps\react-demo-ts\src\router\index.tsx
 * @Description: 
 */
import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import Demos from "@/pages/Demos"
import DanceText from "@/pages/DanceText"
import Series from "@/pages/Series"


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
])