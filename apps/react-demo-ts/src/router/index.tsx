/*
 * @Author: Jerry
 * @Date: 2023-03-03 10:32:42
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-03 09:49:08
 * @FilePath: \monorepo-practice\apps\react-demo-ts\src\router\index.tsx
 * @Description: 
 */
import { lazy, Suspense } from "react"
import {Spin} from 'antd'
import { createBrowserRouter, createHashRouter } from "react-router-dom"


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


export default createHashRouter(baseRoute)