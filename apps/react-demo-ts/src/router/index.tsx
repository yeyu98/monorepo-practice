/*
 * @Author: xiaohu
 * @Date: 2023-03-03 10:32:42
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-20 19:52:34
 * @FilePath: \react-demo-ts\src\router\index.tsx
 * @Description: 
 */
import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import DemoPage from "@/pages/DemoPage"
import Demo from "@/pages/Demo"
import Craft from "@/pages/Craft"
import DragPage from "@/pages/DragPage"
import DarkPage from "@/pages/DarkPage"
import NewDemoPage from "@/pages/NewDemoPage"
import Zustand from "@/pages/Zustand"

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/demoPage",
    element: <DemoPage />
  },
  {
    path: "/demo",
    element: <Demo />
  },
  {
    path: "/drag",
    element: <DragPage />
  },
  {
    path: "/darkMode",
    element: <DarkPage />
  },
  {
    path: "/craft",
    element: <Craft />
  },
  {
    path: "/record",
    element: <NewDemoPage />
  },
  {
    path: "/zustand",
    element: <Zustand />
  }
])