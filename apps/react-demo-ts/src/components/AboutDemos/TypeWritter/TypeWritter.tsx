/*
 * @Author: xiaohu
 * @Date: 2023-03-10 10:29:16
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-03-14 10:07:52
 * @FilePath: \react-demo-ts\src\components\TypeWritter\TypeWritter.tsx
 * @Description: 
 */
import React, { useEffect, useRef } from 'react'

interface Props {}

const CONTENT = `《刀锋》是英国作家威廉·萨默赛特·毛姆创作的长篇小说，首次出版于1944年。
小说写一个参加第一次世界大战的美国青年飞行员拉里·达雷尔。在军队中，拉里结识了一个爱尔兰好友：这人平时是那样一个生龙活虎般的置生死于度外的飞行员，但在一次遭遇战中，因为救拉里而中弹牺牲。拉里因此对人生感到迷惘，弄不懂世界上为什么有恶和不幸，拉里开始了他令人匪夷所思的转变。
《刀锋》的艺术魅力不仅在于其文学价值，还在于它是一部具有浓厚哲学意蕴的小说，一部关于终极价值的书。毛姆将自己对世界和人生的思索凝聚于这部作品中，书中有他自己的心路历程的影子。小说表达的主题是对人生意义和自我存在意义的追寻。 [1] `


function TypeWritter(props: Props) {
  const {} = props

  const inputRef = useRef<HTMLInputElement>(null)

  // NOTE setInterval
  // const autoInput = () => {
  //   let timer: number = 0
  //   let total = 0
  //   let content = ""
  //   if(inputRef.current) {
  //     const input = inputRef.current
  //     timer = setInterval(() => {
  //       content += CONTENT[total++]
  //       input.textContent = content
  //       if(total === CONTENT.length) {
  //         clearInterval(timer)
  //       }
  //     }, 1000 / 60 * 2)
  //   }
  // }

  // NOTE setTimeout
  // const autoInput = () => {
  //   let total = 0
  //   let content = ""

  //   if(inputRef.current) {
  //     const input = inputRef.current
  //     const loop = () => {
  //       content += CONTENT[total++]
  //       input.textContent = content
  //       if(total !== CONTENT.length){
  //         setTimeout(() => {
  //           loop()
  //         }, 1000 / 60 * 10);
  //       }
  //     }
  //     loop()
  //   }
  // }

  const _setInterval = (fn: Function, time: Number) => {
    let total = 0
    let last = Date.now()
    let timer = 0
    const polling = () => {
      let now = Date.now()
      const timestamp = now - last
      total += timestamp
      last = now
      if(total >= time) {
        total = 0
        window.cancelAnimationFrame(timer)
        fn()
      }
      timer = window.requestAnimationFrame(polling)
    }
    timer = window.requestAnimationFrame(polling)
  }

  // NOTE requestAnimationFrame
  const autoInput = () => {
    let total = 0
    let content = ""

    if(inputRef.current) {
      const input = inputRef.current
      const loop = () => {
        content += CONTENT[total++]
        input.textContent = content
        if(total !== CONTENT.length){
          window.requestAnimationFrame(loop)
        }
      }
      loop()
    }
  }

  useEffect(() => {
    autoInput()
  })

  return (
    <div className='wrapper'>
      <div className="input" ref={inputRef}>
      </div>
    </div>
  )
}

export default TypeWritter
