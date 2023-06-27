/*
 * @Author: xiaohu
 * @Date: 2023-06-26 20:02:16
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-26 20:52:07
 * @FilePath: \Explores\apps\react-demo-ts\src\components\IntersectionObserve\IntersectionObserve.tsx
 * @Description: 
 */
import React, { useEffect, useRef } from 'react'
import styles from "./IntersectionObserve.module.less"

interface Props {}
type ImageRefs = HTMLImageElement[]

const realImageList = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNg95m2DOLRWT3Y9hL3MZoqGkKJWyoo-M74G7Y4FVqxQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwzjGYLlXF-blIngHn4fjrA490w_GYriwYw1RAzYo&s',
]

function TestIntersectionObserve(props: Props) {
  const {} = props
  const imgRef = useRef<ImageRefs>([])

  useEffect(() => {
    if(imgRef.current) {
      console.log(imgRef.current)
      const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
          if(entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            setTimeout(() => {
              img.src = realImageList[index]
            }, 300);
            observer.unobserve(img)
          }
        })
      })
      imgRef.current.forEach(img => {
        observer.observe(img)
      })
    }
  }, [])
  
  return (
    <>
      <div className={styles['intersection-observe']}>
        <div className={styles['block']}></div>
        <div className="imgList" >
          <img ref={el => imgRef.current[0] = el!} src="https://img.ixintu.com/download/jpg/20210209/bc95ddbc07d9b50b0911a6b3647d762c_512_512.jpg!bg" alt="" />
          <img ref={el => imgRef.current[1] = el!} src="https://img.ixintu.com/download/jpg/20210209/bc95ddbc07d9b50b0911a6b3647d762c_512_512.jpg!bg" alt="" />
        </div>
      </div>
    </>
  )
}

export default TestIntersectionObserve
