/*
 * @Author: xiaohu
 * @Date: 2023-03-14 15:20:18
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-03-14 15:33:11
 * @FilePath: \react-demo-ts\src\components\Animation\Animation.tsx
 * @Description: 
 */
import React, { useRef } from 'react'
import {Button} from "antd"
import "./Animation.less"

interface Props {}
const TARGET = 300
function Animation(props: Props) {
  const {} = props
  const divRef = useRef<HTMLDivElement>(null)
  const handleClick = () => {
    const div = divRef.current
    if(div) {
      div.style.left = `${TARGET}px`
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="boll" ref={divRef}></div>
        <Button type="primary" onClick={handleClick}>点击</Button>
      </div>
    </>
  )
}

export default Animation
