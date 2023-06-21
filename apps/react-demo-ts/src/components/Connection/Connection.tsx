/*
 * @Author: xiaohu
 * @Date: 2023-01-13 08:45:44
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-01-13 09:19:08
 * @FilePath: \react-demo-ts\src\components\Connection\Connection.tsx
 * @Description: 
 */
import React, { useEffect, useState } from 'react'

interface Props {
  time?: number
}

function Connection(props: Props) {
  const { time = 1000 } = props
  const [ping, setPing] = useState(0)
  const [jitter, setJitter] = useState(0)
  let [count, setCount] = useState(1)
  const [list, setList] = useState<number []>([])

  useEffect(() => {
    const timer = setInterval(() => {
      const image = new Image()
      const startTime = Date.now()
      image.src = `https://github.com/favicon.ico?d=${Date.now()}`
      image.onload = () => {
        const endTime = Date.now()
        const delta = endTime - startTime
        setPing(delta)
        if(count % 5 === 0) {
          const maxPing = Math.max(...list)
          const minPing = Math.min(...list)
          const jitter = maxPing - minPing
          setJitter(jitter)
          setList([])
        }
        setList(lastList => [...lastList, delta])
        setCount(++count)
      }
    }, time)

    return () => clearInterval(timer)
  })
  return (
    <>
      <h3>网络检测</h3>
      <div>ping值：{ping}ms</div>
      <div>抖动：{jitter}ms</div>
    </>
  )
}

export default Connection
