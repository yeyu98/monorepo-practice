import React, { useEffect, useRef } from 'react'
import image from "@/assets/image.jpg"

interface Props {}

function DanceText(props: Props) {
  const {} = props
  const imageRef = useRef<HTMLImageElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if(imageRef.current) {
      imageRef.current.onload = () => {
        if(imageRef.current && canvasRef.current) {
          const width = imageRef.current.offsetWidth
          const height = imageRef.current.offsetHeight
          canvasRef.current.width = width 
          canvasRef.current.height = height 
          
          const ctx = canvasRef.current.getContext('2d')!
          ctx.drawImage(imageRef.current, 0, 0, width, height)
          // NOTE Uint8ClampedArray类数组
          const imageData = ctx.getImageData(0, 0, width, height)
          const data: number[] = [...imageData.data]
          const newData: number[] = new Array(data.length)
          console.log(data)
          for(let i=0; i< data.length; i=i+4) {
            const r = data[i]
            const g = data[i]
            const b = data[i]
            const a = data[i]
            // (R*19595 + G*38469 + B*7472) >> 16
            newData.push(...[r*19595 >> 16, g*19595 >> 16, b*19595 >> 16, a])
          }
        }
      }

    }
  }, [])

  return (
    <>
        <div className='grid gap-2'>
          <img ref={imageRef} src={image} alt=""  width={200}/>
          <canvas ref={canvasRef}/>
        </div>
    </>
  )
}

export default DanceText
