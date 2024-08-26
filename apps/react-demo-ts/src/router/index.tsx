/*
 * @Author: Jerry
 * @Date: 2023-03-03 10:32:42
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-08-26 22:36:13
 * @FilePath: \monorepo-practice\apps\react-demo-ts\src\router\index.tsx
 * @Description: 
 */
import { lazy, Suspense } from "react"
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


export default createBrowserRouter([
  {
    path: "/",
    element: <App />
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
    path: "/nestTest",
    element: <NestTest />
  },
  {
    path: '/magnifier',
    element: <Magnifier />
  },
  {
    path: '/convertVideo',
    element: <ConvertVideo />
  },
  {
    path: '/convertOptions',
    element: <ConvertOptions />
  },
  {
    path: '/OCR',
    element: <Ocr />
  },
  {
    path: '/canvasDemo',
    element: <CanvasDemo />
  }
])