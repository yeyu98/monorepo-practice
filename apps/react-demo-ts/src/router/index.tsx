/*
 * @Author: Jerry
 * @Date: 2023-03-03 10:32:42
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-06-01 11:24:42
 * @FilePath: \Explores\apps\react-demo-ts\src\router\index.tsx
 * @Description: 
 */
import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import Demos from "@/pages/Demos"
import DanceText from "@/pages/DanceText"
import Series from "@/pages/Series"
import NestTest from "@/pages/NestTest"
import Magnifier from "@/pages/Magnifier/Magnifier"
import ConvertVideo from "@/pages/ConvertVideo/ConvertVideo"
import ConvertOptions from "@/pages/ConvertOptions/ConvertOptions"
import Ocr from "@/pages/Ocr"

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
  }
])