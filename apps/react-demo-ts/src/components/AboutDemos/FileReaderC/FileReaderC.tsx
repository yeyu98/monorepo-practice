/*
 * @Author: xiaohu
 * @Date: 2023-06-27 11:31:53
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-27 11:33:18
 * @FilePath: \Explores\apps\react-demo-ts\src\components\FileReaderC\FileReaderC.tsx
 * @Description: 
 */
import React, { useState } from 'react'


interface Props {}

// 关于FileReader的使用 -- 前端读取文件

function FileReaderC(props: Props) {
  const {} = props
  const [url, setUrl] = useState<string>('')

  const handleChange = (e: any) => {
    console.log("e --->>>", e.target.files[0])
    const file = e.target.files[0]
    const blob = new Blob([file])
    const url = URL.createObjectURL(blob)
    setUrl(url)
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      console.log(e.target?.result)
    }
    fileReader.onerror = (err) => {
      console.log("err", err)
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <>
      <input type="file" onChange={handleChange}/><br />
      {
        url && <img src={url} alt="" width={300} height={100} />
      }
    </>
  )
}

export default FileReaderC
