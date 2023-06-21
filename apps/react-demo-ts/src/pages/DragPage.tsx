/*
 * @Author: xiaohu
 * @Date: 2023-03-03 09:54:34
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-03-07 10:49:58
 * @FilePath: \react-demo-ts\src\pages\DragPage.tsx
 * @Description: 
 */
import Drag from '@/components/Drag/Drag'
import { Spin } from 'antd'
import { Suspense } from 'react'

interface Props {}

// 关于原生拖拽的demo

function DragPage(props: Props) {
  const {} = props

  return (
    <>
      <Suspense fallback={<Spin />}>
        <Drag />
      </Suspense>
    </>
  )
}

export default DragPage
