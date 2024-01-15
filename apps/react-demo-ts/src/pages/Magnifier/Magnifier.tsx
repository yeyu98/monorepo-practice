/*
 * @Author: yeyu98
 * @Date: 2024-01-09 21:41:08
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-15 22:41:22
 * @Description: 
 */
import {useEffect, useRef, useState} from 'react'
import styles from './Magnifier.module.less'

interface Props {}
interface Position {
    x: number,
    y: number
}

function Magnifier(props: Props) {
    const {} = props
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const magnifierRef = useRef<HTMLDivElement>(null)
    const [magnifierPosition, setMagnifierPosition] = useState<Position>({x: 0, y: 0})
    const [isHover, setIsHover] = useState<boolean>(false)

    useEffect(() => {
        const handleMouseEnter = (event: MouseEvent) => {
            event.preventDefault()
            if(!isHover) {
                console.log("✨✨🥰  ~ handleMouseEnter ~ isHover--->>>", isHover)
                setIsHover(true)
            }
            // const { offsetX, offsetY } = event
            // if(magnifierRef.current) {
            //     const _x = offsetX - magnifierRef.current.offsetWidth / 2
            //     const _y = offsetY - magnifierRef.current.offsetHeight / 2
            //     console.log(_x, _y)
            //     setMagnifierPosition({
            //         x: _x,
            //         y: _y
            //     })
            // }
        }

        const handleMouseMove = (event: MouseEvent) => {
            event.preventDefault()
            // 为什么移动的过程中 offsetX offsetY会被重置
            const { offsetX, offsetY } = event
            console.log("✨✨🥰  ~ handleMouseMove ~ offsetX offsetY--->>>", offsetX, offsetY)
            if(magnifierRef.current) {
                const _x = offsetX - magnifierRef.current.offsetWidth / 2
                const _y = offsetY - magnifierRef.current.offsetHeight / 2
                console.log(_x, _y)
                setMagnifierPosition({
                    x: _x,
                    y: _y
                })
            }
            
        }
        containerRef.current?.addEventListener('mouseenter', handleMouseEnter)
        /**
         * 1. mousemove绑定到document上实现鼠标hover 卡片移动不卡顿，但是会出现位置重置到 0 0的问题
         * 因为当鼠标开始mousemove的时候 元素的默认位置在 0 0
         * 2. mousemove绑定到image上能正常hover位置但是会出现卡顿问题？
         *  这里的卡顿是因为卡片阻止了鼠标move事件的触发
         * 2.1. 那为什么卡片会阻止鼠标mousemove事件的触发呢？
         *  因为 magnifier和image是同一层级的 当鼠标在magnifier内是无法触发image上的mousemove事件的（因为在同一层级无法冒泡），所以得把mousemove事件绑定到这两个元素的父元素或者祖先元素；
         * 
         * 3. 使用translate 且 绑定到image上能实现不卡顿位置不重置，但是位置要如何计算？
        */
        containerRef.current?.addEventListener('mousemove', handleMouseMove)

        return () => {
            containerRef.current?.addEventListener('mouseenter', handleMouseEnter)
            containerRef.current?.removeEventListener('mousemove', handleMouseEnter)
        }
    }, [isHover])

    return (
        <>
            <div ref={containerRef} className={styles['wrapper']}>
                <img ref={imageRef} src="https://w.wallhaven.cc/full/85/wallhaven-858lz1.png" alt="" />
                {
                    // transform: `translate(${magnifierPosition.y}px, ${magnifierPosition.x}px)`
                    // 
                    isHover && <div ref={magnifierRef} style={{top: `${magnifierPosition.y}px`, left: `${magnifierPosition.x}px`}} className={styles['magnifier']}></div> 
                }
            </div>
        </>
    )
}

export default Magnifier
