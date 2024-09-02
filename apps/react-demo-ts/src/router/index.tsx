/*
 * @Author: Jerry
 * @Date: 2023-03-03 10:32:42
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-02 17:50:24
 * @FilePath: \monorepo-practice\apps\react-demo-ts\src\router\index.tsx
 * @Description: 
 */
import { lazy, Suspense } from "react"
import {Spin} from 'antd'
import { createBrowserRouter } from "react-router-dom"
// import App from "@/App"
// import Demos from "@/pages/Demos"
// import DanceText from "@/pages/DanceText"
// import Series from "@/pages/Series"
// import NestTest from "@/pages/NestTest"
// import Magnifier from "@/pages/Magnifier/Magnifier"
// import ConvertVideo from "@/pages/ConvertVideo/ConvertVideo"
// import ConvertOptions from "@/pages/ConvertOptions/ConvertOptions"
// import Ocr from "@/pages/Ocr"
// import CanvasDemo from "@/pages/CanvasDemo"

// FIXME 路由懒加载还有些问题，需要使用Suspense包裹
const App = lazy(() => import('@/App'))
const Demos = lazy(() => import('@/pages/Demos'))
const DanceText = lazy(() => import('@/pages/DanceText'))
const Series = lazy(() => import('@/pages/Series'))
const NestTest = lazy(() => import('@/pages/NestTest'))
const Magnifier = lazy(() => import('@/pages/Magnifier/Magnifier'))
const ConvertVideo = lazy(() => import('@/pages/ConvertVideo/ConvertVideo'))
const ConvertOptions = lazy(() => import('@/pages/ConvertOptions/ConvertOptions'))
const Ocr = lazy(() => import('@/pages/Ocr'))
const CanvasDemo = lazy(() => import('@/pages/CanvasDemo'))
const SuspenseComponent = (Component: any) => {
  return <Suspense fallback={<div className="w-full h-full flex justify-center items-center"><Spin /></div>}><Component /></Suspense>
}

const baseRoute = [
  {
    path: "/",
    element: SuspenseComponent(App)
  },
  {
    path: "/danceText",
    element: SuspenseComponent(DanceText)
  },
  {
    path: "/demos",
    element: SuspenseComponent(Demos)
  },
  {
    path: "/series",
    element: SuspenseComponent(Series)
  },
  {
    path: "/nestTest",
    element: SuspenseComponent(NestTest)
  },
  {
    path: '/magnifier',
    element: SuspenseComponent(Magnifier)
  },
  {
    path: '/convertVideo',
    element: SuspenseComponent(ConvertVideo)
  },
  {
    path: '/convertOptions',
    element: SuspenseComponent(ConvertOptions)
  },
  {
    path: '/OCR',
    element: SuspenseComponent(Ocr)
  },
  {
    path: '/canvasDemo',
    element: SuspenseComponent(CanvasDemo)
  }
]


export default createBrowserRouter(baseRoute)