import React, { useState } from 'react';
import './FixedSizeList.less'

interface FixedSizeListProps {
    itemSize: number; // 单项的高度
    itemCount: number; // 总体数量
    children: any;
}

function FixedSizeList(props: FixedSizeListProps) {
    const { itemSize = 50,  itemCount = 1000, children: Child} = props
    const [scrollOffset, setScrollOffset] = useState(0)
    const clientHeight = 200 // 可视区高度
    const contentStyle = {
        height: itemCount * itemSize
    }

    const handleScroll = (e: any) => {
        const {scrollTop, scrollHeight, clientHeight} = e.target
        console.log(scrollTop, scrollHeight, clientHeight)
        setScrollOffset(scrollTop)
    }

    const getCurrentChildren = () => {
        const startIndex = Math.floor(scrollOffset / itemSize)
        // 上缓冲区
        const upperBufferIndex = Math.max(0, startIndex - 2)
        // 获取可视区最大个数
        const numVisible = Math.ceil(clientHeight / itemSize)
        // 下缓冲区
        const lowerBufferIndex = Math.min(itemCount - 1, startIndex + numVisible + 2)

        const items = []
        for(let i = upperBufferIndex; i<lowerBufferIndex; i++) {
            const style = {
                position: 'absolute',
                top: itemSize * i,
                width: '100%',
                height: itemSize
            }
            items.push(<Child key={i} index={i} style={style} />)
        }
        return items
    }

    return (
        <div className='fixed-size-list' onScroll={handleScroll}>
            <div style={contentStyle}>
                {getCurrentChildren()}
            </div>
        </div>
    );
}

export default FixedSizeList;