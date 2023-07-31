/*
 * @Author: lzy-Jerry
 * @Date: 2023-07-29 20:54:23
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-07-31 21:51:12
 * @Description: 
 */
import { useEffect, useRef } from 'react'
import image from "@/assets/images/relax.png"

interface Props {}

function DanceText(props: Props) {
  const {} = props
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // NOTE 灰度化处理
  const grayScale = (width: number, height: number) => {
    if(canvasRef.current && imageRef.current) {
      const ctx = canvasRef.current.getContext('2d')!
      ctx.drawImage(imageRef.current, 0, 0, width, height)
      // NOTE Uint8ClampedArray类数组但可以直接通过索引设置它的值
      const imageData = ctx.getImageData(0, 0, width, height)
      const data: Uint8ClampedArray = imageData.data
      const newImageData = new ImageData(data, width, height)
      for(let i=0; i< data.length; i=i+4) {
        // NOTE 每四个数组对应着rgba
        const r = data[i]
        const g = data[i+1]
        const b = data[i+2]
        // 灰度化处理
        // (R*19595 + G*38469 + B*7472) >> 16
        const gray = (r*19595 + g*38469 + b*7472) >> 16
        data[i] = data[i+1] = data[i+2] = gray
        data[i+3] = 255
      }
      ctx.putImageData(newImageData, 0, 0)
    }
  }

  const handleDownload = async () => {
    const imageList = ['https://dummyimage.com/200x100', 'https://dummyimage.com/200x200', 'https://dummyimage.com/200x300']
    imageList.forEach(async (image) => {
       downloadFile(image)
    })
  }

  const downloadFile = async (url: string) => {
    const name = Math.random().toString(36).substring(3)
    let response = await fetch(url) // 内容转变成blob地址
    let blob = await response.blob() // 创建隐藏的可下载链接
    const _url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href =_url
    a.download = name;
    a.target = '_blank';
    a.click();
    URL.revokeObjectURL(_url);
  };

  useEffect(() => {
    if(imageRef.current) {
      imageRef.current.onload = () => {
        if(imageRef.current && canvasRef.current) {
          const width = imageRef.current.offsetWidth
          const height = imageRef.current.offsetHeight
          canvasRef.current.width = width 
          canvasRef.current.height = height 
          // TODO 抽离成paint方法
          grayScale(width, height)
        }
      }
    }
  }, [])

  return (
    <>
        <div className='grid gap-2 grid-cols-2'>
          {/* https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo_2x.jpg!0x0.webp */}
          <img ref={imageRef} src={image} alt="" crossOrigin='anonymous' width={500}/>
          <canvas ref={canvasRef}/>
          <button onClick={handleDownload}>批量下载</button>
        </div>
    </>
  )
}

export default DanceText
