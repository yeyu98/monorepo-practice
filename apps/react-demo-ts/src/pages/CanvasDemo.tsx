/*
 * @Author: yeyu98
 * @Date: 2024-04-30 14:38:15
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-04-30 15:02:24
 * @FilePath: \monorepo-practice\apps\react-demo-ts\src\pages\CanvasDemo.tsx
 * @Description: 
 */
import React, { useEffect, useRef } from 'react'

interface Props {}

/*
以中心为坐标放大缩小;
场景坐标系：以px为单位的正常坐标系，原点在画布的左上角，向右为x正方向，向下为y正方向;
视图坐标系：只看某个局部区域;
场景转视图距离计算 dist * zoom;
视图转场景距离计算 dist / zoom;
*/

function CanvasDemo(props: Props) {
  const {} = props
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if(canvasRef.current) { 
      const ctx = canvasRef.current.getContext('2d')!
      ctx.strokeRect(0, 0, 800, 450)
      ctx.beginPath()
      ctx.fillStyle = 'blue'
      ctx.fillRect(350,175, 100, 100)
      ctx.closePath()
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} width={800} height={450}/>
    </>
  )
}

export default CanvasDemo
