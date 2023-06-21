/*
 * @Author: xiaohu
 * @Date: 2023-06-21 10:51:04
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-21 11:52:25
 * @FilePath: \Explores\apps\react-demo-ts\src\pages\Craft.tsx
 * @Description: 
 */
import React from 'react'
import { createPortal } from "react-dom"

interface Props {}

const Test = () => {
  return (
    <>Test</>
  )
}


function Craft(props: Props) {
  const {} = props

  return (
    <>
      <div className='craft'>craft节点</div>
      <Test />
      {
        createPortal(<Test />, document.body)
      }
    </>
  )
}

export default Craft
