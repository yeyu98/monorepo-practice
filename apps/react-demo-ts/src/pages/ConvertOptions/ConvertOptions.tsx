/*
 * @Author: xiaohu
 * @Date: 2024-03-06 17:14:53
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-03-06 17:30:36
 * @FilePath: \monorepo-practice\apps\react-demo-ts\src\pages\ConvertOptions\ConvertOptions.tsx
 * @Description: 
 */
import React, { useState } from 'react'
import { Input, Typography, Divider } from 'antd'

import styles from './ConvertOptions.less'

const { Title } = Typography
const { TextArea } = Input

interface Props {}
function ConvertOptions(props: Props) {
  const {} = props
  const [name, setName] = useState('')
  const [config, setConfig] = useState('')
  const handleNameChange = (event: any) => {
    const value = event.value
    setName(value)
  }

  const handleConfigChange = (event: any) => {
    const value = event.value
    setConfig(value)
  }

  return (
    <>
      <div className='flex flex-col items-start'>
   
        <Title level={5}>标题</Title>
        <Input placeholder='请输入名称' onChange={handleNameChange} />

        <Title level={5}>选项配置</Title>
        <TextArea placeholder='请输入选项配置' onChange={handleConfigChange} />

      </div>
    </>
  )
}

export default ConvertOptions
