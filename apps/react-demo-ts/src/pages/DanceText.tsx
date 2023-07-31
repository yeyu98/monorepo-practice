/*
 * @Author: lzy-Jerry
 * @Date: 2023-07-29 20:54:23
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-01 00:32:58
 * @Description: 
 */
import React, { useEffect, useRef, useState } from 'react'
import image from "@/assets/image.jpg"
import videoUrl from "@/assets/video.mp4"
import "./DanceText.less"

interface Props {}


function DanceText(props: Props) {
  const {} = props
  const charList = ['@', '%', '.', ',', '*', '+']
  const imageRef = useRef<HTMLImageElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const divRef = useRef<HTMLDivElement | null>(null)



  // 高斯滤波消除模糊or二值化图片的噪音
  const gaussBlur = (data: Uint8ClampedArray, width: number, height: number) => {

  }

  const generateChar = () => charList[Math.floor(Math.random() * charList.length)]
  const paint = (width: number, height: number) => {
    if(videoRef.current && canvasRef.current && divRef.current) {
      const ctx = canvasRef.current.getContext('2d')!
      if(videoRef.current.readyState > 1) {
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        // NOTE Uint8ClampedArray类数组
        const imageData = ctx.getImageData(0, 0, width, height)
        const data: Uint8ClampedArray = imageData.data
        let finallyHtml = ''
        console.log(data)
        for(let w=0; w<width; w++) {
          let p = '<p>'
          for(let h=0; h<height; h++) {
            const i = (w * width + h) * 4
            console.log(i)
            const r = data[i], g = data[i+1], b = data[i+2]
            const gray = (r*19595 + g*38469 + b*7472) >> 16 > 127 ? 255 : 0
            data[i] = data[i+1] = data[i+2] = gray
            if(gray === 255) {
              p += '#'
            } else {
              p += generateChar()
            }
          }
          finallyHtml += (p + '</p>')
        }
        // divRef.current.innerHTML = finallyHtml
        // for(let i=0; i< data.length; i=i+4) {
        //   const r = data[i], g = data[i+1], b = data[i+2]
        //   // NOTE 灰度化处理 && 固定阀值二值化处理
        //   // gray > 127 ? 255 : 0
        //   const gray = (r*19595 + g*38469 + b*7472) >> 16 > 127 ? 255 : 0
        //   data[i] =  data[i+1] = data[i+2] = gray
        // }
        // const newImageData = new ImageData(data, width, height)
        // ctx.putImageData(newImageData, 0, 0)
        // renderFrame(width, height)
      }
    }
  }

  const renderFrame = (width: number, height: number) => {
    window.requestAnimationFrame(() => {
      paint(width, height)
    })
  }

  useEffect(() => {
    document.title = "💃"
  })

  useEffect(() => {
    videoRef.current?.addEventListener("play", () => {
      if(videoRef.current && canvasRef.current) {
        const width = videoRef.current.offsetWidth
        const height = videoRef.current.offsetHeight
        canvasRef.current.width = width 
        canvasRef.current.height = height 
        renderFrame(width, height)
      }
    })
  })

  return (
    <>
        <div className='grid gap-2'>
          <video ref={videoRef} src={videoUrl} width={500} controls autoPlay={true} loop={true}></video>
          {/* < img ref={imageRef} src={image} alt=""  width={500}/>  */}
          <canvas ref={canvasRef}/>
          <div ref={divRef} className='dance-screen'>

          </div>
        </div>
    </>
  )
}

export default DanceText
