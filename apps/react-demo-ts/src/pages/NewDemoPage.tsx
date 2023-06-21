/*
 * @Author: xiaohu
 * @Date: 2023-03-10 10:25:29
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-05-25 09:36:01
 * @FilePath: \react-demo-ts\src\pages\NewDemoPage.tsx
 * @Description: 
 */
import React from 'react'
import DarkMode from '@/components/DarkMode/DarkMode'
import TypeWritter from '@/components/TypeWritter/TypeWritter'
import MirrorButton from '@/components/MirrorButton/MirrorButton'
import Animation from '@/components/Animation/Animation'
import CanvasDemo from '@/components/CanvasDemo/CanvasDemo'
// import WaterMark from '@/components/WaterMark/WaterMark'
import Recorder from '@/components/Recorder/Recorder'

interface Props {}

function NewDemoPage(props: Props) {
  const {} = props

  return (
    <>
      {/* <DarkMode /> */}
      {/* <TypeWritter /> */}
      {/* <MirrorButton /> */}
      {/* <Animation /> */}
      {/* <CanvasDemo /> */}
      {/* <WaterMark /> */}
      <Recorder />
    </>
  )
}

export default NewDemoPage
