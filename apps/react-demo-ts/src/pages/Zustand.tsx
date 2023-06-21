/*
 * @Author: xiaohu
 * @Date: 2023-06-19 11:18:21
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-19 15:44:11
 * @FilePath: \react-demo-ts\src\pages\Zustand.tsx
 * @Description: 
 */
import React from 'react'
import useStore from '@/store'

interface Props {}

// 关于Zustand
function Zustand(props: Props) {
  const {} = props
  const [store, addCount, removeAllCount, asyncAddCount] = useStore((state) => [
    state.count, state.addCount, state.removeAllCount, state.asyncAddCount
  ])
  console.log(store)

  return (
    <>
      <span>{store}</span><br />
      <button onClick={addCount}>增加</button>
      <button onClick={removeAllCount}>清空</button>
      <button onClick={asyncAddCount}>异步更新状态库</button>
    </>
  )
}

export default Zustand
