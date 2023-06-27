/*
 * @Author: xiaohu
 * @Date: 2023-03-03 09:44:05
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-03-09 17:10:20
 * @FilePath: \react-demo-ts\src\components\Drag\Drag.tsx
 * @Description: 
 */
import React, { useEffect, useRef, useState } from 'react'
import "./Drag.css"

interface Props {
}

function Drag(props: Props) {
  const dragRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const sourceRef = useRef<HTMLDivElement>(null)
  const [delay, setDelay] = useState<String>("delay")

  const fetchDelay = () => new Promise<String>((resolve) => {
    setTimeout(() => {
      setDelay("我变了我变了...")
      resolve("")
    }, 1000);
  })

  useEffect(() => {

    const draged = dragRef?.current
    const target = targetRef?.current
    const source = sourceRef?.current

    fetchDelay()
    if(draged && target && source) {
      draged?.addEventListener("drag", (event) => {
        console.log("dragging")
      })
      draged?.addEventListener("dragstart", () => {
        source?.classList.add("dragging")
      })
      draged?.addEventListener("dragend", () => {
        source?.classList.remove("dragging")
      })
  
      target?.addEventListener("dragover", (event: DragEvent) => {
        event.preventDefault()
      }, false)
  
      target?.addEventListener("dragenter", () => {
        target?.classList.add("dragover")
      })
  
      target?.addEventListener("dragleave", () => {
        target?.classList.remove("dragover")
      })
  
      target?.addEventListener("drop", () => {
        target?.classList.remove("dragover")
        source?.removeChild(draged)
        target.appendChild(draged)
      })
    }

  })

  return (
    <div className='wrapper'>
      <>{delay}</>
      <div className="source" ref={sourceRef}> 
        <div className="self" ref={dragRef} draggable={true}></div>
      </div>
      <div className="target" ref={targetRef}>
      </div> 
    </div>
  )
}


export default React.memo(Drag)
