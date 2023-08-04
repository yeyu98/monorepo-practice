/*
 * @Author: lzy-Jerry
 * @Date: 2023-07-29 20:54:23
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-04 00:12:38
 * @Description: 
 */
import React, { useEffect, useRef, useState } from 'react'
import image from "@/assets/image.jpg"
import videoUrl from "@/assets/video.mp4"
import "./DanceText.less"

interface Props {}


function DanceText(props: Props) {
  const {} = props
  // const charList = ['@', '%', '.', ',', '*', '+']
  // const imageRef = useRef<HTMLImageElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const divRef = useRef<HTMLDivElement | null>(null)

  const generateText = (g: number) => {
    if (g <= 30) {
        return '#';
    } else if (g > 30 && g <= 60) {
        return '&';
    } else if (g > 60 && g <= 120) {
        return '$';
    }  else if (g > 120 && g <= 150) {
        return '*';
    } else if (g > 150 && g <= 180) {
        return 'o';
    } else if (g > 180 && g <= 210) {
        return '!';
    } else if (g > 210 && g <= 240) {
        return ';';
    }  else {
        return '';
    }
}
  const paint = (width: number, height: number) => {
      if(videoRef.current && canvasRef.current && divRef.current) {
        const ctx = canvasRef.current.getContext('2d')!
        if(videoRef.current.readyState > 1) {
          ctx.drawImage(videoRef.current, 0, 0, width, height)
          // NOTE Uint8ClampedArray类数组
          const imageData = ctx.getImageData(0, 0, width, height)
          const data: Uint8ClampedArray = imageData.data
          let finallyHtml = ''

          // NOTE 为什么要使用'simsun'的字体呢？
          // 这里不一定要使用这一种字体，只需要找一个让字体符合样式所设定的宽高即可，有些字体可能本身就小
          // 同尺寸的字体在屏幕前显示出来无法符合像素与字符的正常展示；

          // NOTE 为什么一比一还原像素成字符无法对应字符容器的宽高甚至要超过呢？
          // 因为这里一个字体的宽高度是6px * 12px，但canvas里一个像素非常非常的小可以认为是1px * 1px；
          // 因此需要在遍历时使用间隔跳过对应字符的宽高间隔否则就无法将canvas里的像素与真实宽高映射；

          // NOTE 为什么6px的字体对应12的间隔才正常显示呢？
          // 这里的12如果使用的p，p本身会有默认的上下margin因此会导致计算不准确，
          // 比如间隔是12，那么p一行整体高度就可能是12 * 2 + 12 = 36换成div就不会了

          // NOTE 灰度算法的选择

          // NOTE toText对应字符的映射为什么时这样的呢？
          // 这里字符的选择针对比较白的像素使用;显示会更清晰一些
          
          // 索引：(行 * width + 列) * 4
          // h 代表行 w代表列
          for(let h=0; h<height; h+=12) {
            let p = '<div>'
            for(let w=0; w<width; w+=6) {
              // NOTE canvas 获取像素位置算法 https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
              const i = (h * width + w) * 4
              const r = data[i], g = data[i+1], b = data[i+2]
              // TODO 为什么一定是这种灰度算法才行呢
              const gray = 0.299 * r + 0.578 * g + 0.114 * b 
              p += generateText(gray)
              // data[i] = data[i+1] = data[i+2] = gray
            }
            finallyHtml += (p + '</div>')
          }
          divRef.current.innerHTML = finallyHtml
          // const newImageData = new ImageData(data, width, height)
          // ctx.putImageData(newImageData, 0, 0)
          renderFrame(width, height)
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
          <video ref={videoRef} src={videoUrl} width={600} height={480} controls autoPlay={false} loop={true}></video>
          {/* < img ref={imageRef} src={image} alt=""  width={500}/>  */}
          <canvas ref={canvasRef}/>
          <div ref={divRef} className='dance-screen'>

          </div>
        </div>
    </>
  )
}

export default DanceText
