
/*
 * @Author: xiaohu
 * @Date: 2023-05-04 09:30:07
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-05-04 09:51:18
 * @FilePath: \react-demo-ts\src\components\CanvasDemo\CanvasDemo.tsx
 * @Description: 
 */
import { FC, useEffect, useRef } from "react";

const CanvasDemo: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")!
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(300, 300)
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 6
      ctx.lineCap = "round"
      ctx.stroke()
      ctx.closePath()
      const data = ctx.getImageData(0,0,800, 450)
      console.log(data)
    }
  }, [])
  return (
    <>
      <div className="wrapper">
        <canvas ref={canvasRef} width={800} height={450}></canvas>
      </div>
    </>
  )
}

export default CanvasDemo