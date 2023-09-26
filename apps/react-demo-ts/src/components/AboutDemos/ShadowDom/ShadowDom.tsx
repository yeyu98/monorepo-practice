/*
 * @Author: lzy-Jerry
 * @Date: 2023-09-21 20:54:27
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-09-21 23:01:49
 * @Description: 
 */
import {useEffect, useRef} from 'react'
import './ShadowDom.less'
interface ShadowDomProps {

}

export default function ShadowDom(props: ShadowDomProps) {
  const shadowDomRef = useRef<HTMLDivElement>(null)
  const handleClick = () => {
    alert('shadow button')
  }

  useEffect(() => {
    if(shadowDomRef.current) {
      const shadowRoot = shadowDomRef.current.attachShadow({
        mode: 'open'
      })
      const button = document.createElement('button')
      button.className = 'wrapper'
      button.textContent = 'shadow button'
      button.addEventListener('click', handleClick)
      shadowRoot.appendChild(button)
      const wrapperNode = document.querySelectorAll('.wrapper')
      console.log("🚀🚀🚀 ~ file: ShadowDom.tsx:32 ~ useEffect ~ wrapperNode--->>>", wrapperNode)
    }
  })
  
  return (
    <>
      <div className='wrapper'>ShadowDom</div>
      <div className="shadow-dom" ref={shadowDomRef}></div>
    </>
  )
}
