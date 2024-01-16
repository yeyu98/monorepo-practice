/*
 * @Author: yeyu98
 * @Date: 2024-01-09 21:41:08
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-16 21:43:54
 * @Description: 
 */
import {useMemo, useRef, useState, MouseEvent} from 'react'
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

    /**
     * 1. mousemove绑定到document上实现鼠标hover 卡片移动不卡顿，但是会出现位置重置到 0 0的问题
     * 因为当鼠标开始mousemove的时候 元素的默认位置在 0 0
     * 破案了是因为移动过程中 放大镜的位置计算有误出现不知名的bug（目前具体原因并没有get到）这边更建议使用clientX clientY 或 pageX pageY 以及绑定在对应元素上否则当鼠标hover的时候会优先呈现放大镜 0 0 的位置
     * 鼠标hover到放大镜div的时候 只有mousemove事件被取消了，放大镜坐标被重置
     * 2. mousemove绑定到image上能正常hover位置但是会出现卡顿问题？
     *  这里的卡顿是因为卡片阻止了鼠标move事件的触发
     * 2.1. 那为什么卡片会阻止鼠标mousemove事件的触发呢？
     *  因为 magnifier和image是同一层级的 当鼠标在magnifier内是无法触发image上的mousemove事件的（因为在同一层级无法冒泡），所以得把mousemove事件绑定到这两个元素的父元素或者祖先元素；
     * 3.div跟随鼠标移动有两种方案一种是使用 absolute 通过cpu计算渲染 另一种是使用 transform translate3d 通过gpu渲染
     *   absolute使用的坐标系是鼠标的坐标系相对于视口或文档
     *   transform translate3d使用的坐标系是相对元素本身的
     *   无论哪种方式实现都可以使用相同的方式
    */

    // transform: `translate(${magnifierPosition.y}px, ${magnifierPosition.x}px)`
    // top: `${magnifierPosition.y}px`, left: `${magnifierPosition.x}px`
    const moveStyle = useMemo(() => ({transform: `translate3d(${magnifierPosition.x}px, ${magnifierPosition.y}px, 0)`}), [magnifierPosition.x, magnifierPosition.y])

    const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        if(!isHover) {
            setIsHover(true)
        }
    }

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        // offsetX 鼠标位置相对鼠标触发事件元素的位置 如果有内外边距可能会不精准
        // clientX 鼠标位置相对视口的位置
        // pageX 鼠标位置相对整个文档的位置包括滚动距离
        // screenX 鼠标位置相对整个屏幕的位置
        // getBoundingClientRect 目标元素四周相对于视口的位置其中的x等同于left
        const { clientX, clientY } = event
        if(magnifierRef.current && containerRef.current) {
            const { left, top } = containerRef.current.getBoundingClientRect()
            // clientX - left 将坐标系移动到容器元素左上角
            // clientX - left - magnifierRef.current.offsetWidth / 2 将鼠标位置移动到容器元素中心
            const magnifierWidth = magnifierRef.current.offsetWidth
            const magnifierHeight =magnifierRef.current.offsetHeight
            let _x = clientX - left - magnifierWidth / 2
            let _y = clientY - top - magnifierHeight / 2
            const _xBoundary = containerRef.current.offsetWidth - magnifierWidth
            const _yBoundary = containerRef.current.offsetHeight - magnifierHeight
            if(_x < 0) {
                _x = 0
            }
            if(_x > _xBoundary) {
                _x = _xBoundary
            }
            if(_y < 0) {
                _y = 0
            }
            if(_y > _yBoundary) {
                _y = _yBoundary
            }
            setMagnifierPosition({
                x: _x,
                y: _y
            })
        }
    }

    const handleMouseLeave = (event:  MouseEvent<HTMLDivElement>) => {
        if(isHover) {
            setIsHover(false)
        }
    }

    return (
        <>
            <div ref={containerRef} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={styles['wrapper']}>
                <img ref={imageRef} src="https://w.wallhaven.cc/full/85/wallhaven-858lz1.png" alt="" />
                {
                    isHover && <div ref={magnifierRef} className={styles['magnifier']} style={moveStyle}></div> 
                }
            </div>
        </>
    )
}

export default Magnifier
