/*
 * @Author: yeyu98
 * @Date: 2024-01-09 21:41:08
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-09 22:51:24
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
    const imageRef = useRef<HTMLImageElement>(null)
    const magnifierRef = useRef<HTMLDivElement>(null)
    const [magnifierPosition, setMagnifierPosition] = useState<Position>({x: 0, y: 0})
    const [isHover, setIsHover] = useState<boolean>(false)

    useEffect(() => {
        
        const handleMouseEnter = (event: MouseEvent) => {
            if(!isHover) {
                setIsHover(true)
            }
            document.addEventListener('mousemove', handleMouseMove)
        }

        const handleMouseMove = (event: MouseEvent) => {
            // 为什么移动的过程中 offsetX offsetY会被重置
            const { offsetX, offsetY } = event
            console.log("✨✨🥰  ~ handleMouseMove ~ offsetX--->>>", offsetX)
            if(magnifierRef.current) {
                const _x = offsetX - magnifierRef.current.offsetWidth / 2
                const _y = offsetY - magnifierRef.current.offsetHeight / 2
                console.log(_x, _y)
                setMagnifierPosition({
                    ...magnifierPosition,
                    x: _x,
                    y: _y
                })
            }
            
        }

        imageRef.current?.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            imageRef.current?.removeEventListener('mousemove', handleMouseEnter)
        }
    }, [])

    return (
        <>
            <div className={styles['wrapper']}>
                <img ref={imageRef}  src="https://w.wallhaven.cc/full/85/wallhaven-858lz1.png" alt="" />
                {
                    isHover ? <div ref={magnifierRef} style={{top: `${magnifierPosition.y}px`, left: `${magnifierPosition.x}px`}} className={styles['magnifier']}></div> : null
                }
            </div>
        </>
    )
}

export default Magnifier
