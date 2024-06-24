/*
 * @Author: yeyu98
 * @Date: 2024-04-30 14:38:15
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-06-24 16:20:44
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
// 水印
/*
  绘制水印最终生成图片插入到指定元素背景中
  使用MutationObserver监测元素节点的增减、属性的变动、文本内容的变动
*/ 

function CanvasDemo(props: Props) {
  const {} = props
  const watermarkRef = useRef<HTMLDivElement | null>(null)

  const watermark = ({
    content = 'hello',
    width = '200px',
    height = '150px',
    textAlign = 'center',
    textBaseline = 'middle',
    font = '20px microsoft yahei',
    rotate = 30,
  }: any) => {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, 800, 450)
    ctx.textAlign = textAlign
    ctx.textBaseline = textBaseline
    ctx.font = font
    ctx.rotate(Math.PI / 180 * rotate)
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
    const base64 = canvas.toDataURL('image/png')
    return base64
  }

  const generate = () => {
    const base64 = watermark({})
    const container = watermarkRef.current
    if(container) {
      const watermarkContent = document.createElement('div')
      watermarkContent?.setAttribute('style', `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: repeat;
        background-image: url('${base64}');
      `)
      watermarkRef.current?.appendChild(watermarkContent)
      const callback = (mutationsList: any) => {
        mutationsList.forEach((mutation: any) => {
          switch (mutation.type) {
            case 'attributes': 
              // 重新赋值样式即可
              // 也可以移除掉再重新生成
              observer.disconnect();
              generate()
            break;
            case 'childList': 
              // 重新生成
              observer.disconnect();
              generate()
            break;
          }
        })
      }
      const observer = new MutationObserver(callback)
      observer.observe(container, {
        childList: true, // 子节点新增或删除
        attributes: true, // 属性发生变动,
        subtree: true // 后代节点发生childList或attributes变动或其他的变动
      })
    }
  }

  useEffect(() => {
    generate()
  }, [])

  return (
    <>
      {/* <canvas ref={canvasRef} width={800} height={450}/> */}
      <div ref={watermarkRef}></div>
    </>
  )
}

export default CanvasDemo
