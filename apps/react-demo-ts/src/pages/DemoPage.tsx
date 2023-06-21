/*
 * @Author: xiaohu
 * @Date: 2023-03-03 09:54:27
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-03-03 11:48:02
 * @FilePath: \react-demo-ts\src\pages\DemoPage.tsx
 * @Description: 
 */
import { useEffect, useState, useReducer } from 'react'
import { Button, DatePicker } from 'antd'
import Test from "@/components/Demo/Demo"
import Connection from '@/components/Connection/Connection'
import WebSocketDemo from '@/components/WebSocketDemo/WebSocketDemo'
import reactLogo from '../assets/react.svg'

interface Props {}


interface IDataItem {
  id: number,
  name: string
}
export interface ITitleInfo {
  name: string
}

const DATABASE = ["杀死一只知更鸟", "我是一只猫酱", "七秒钟的记忆", "海里的金鱼", "哈尔的移动城堡"]


function DemoPage(props: Props) {
  const {} = props

  const [count, setCount] = useState(0)
  const [data, setData] = useState<IDataItem []>([
    {
      id: 1,
      name: "肖申克的救赎"
    },
    {
      id: 2,
      name: "我是一只猫"
    }
  ])

  const [test, setTest] = useState("121221")

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [titleInfo, setTitleInfo] = useState({name: "我是一只猫"})

  useEffect(() => {
    console.log("刷新了")
    let timer: any = null
    timer = setTimeout(() => {
      setTest("我变了~~~~~~~~~")
    }, 2000)
    console.log(test)
    return () => timer
  })

  const handleClick = () => {
    const _data = data.map(item => {
      const { id } = item
      if(id === 2) {
        item.name = DATABASE[Math.floor(Math.random() * DATABASE.length)]
      }
      return item
    })

    forceUpdate()
    // setData(_data)
  }

  const onChange = () => {
    console.log("更新了吗")
    // const _titleInfo = {...titleInfo}
    titleInfo.name = "123"
    setTitleInfo(titleInfo)
  }

  return (
    <>
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <DatePicker />
      <Test test={test} />
      <div>
        {
          data.map(item => {
            return <>
            <div>id: {item.id}</div>
            <div>name: {item.name}</div>
            </>
          })
        }
        <Button type='primary' onClick={handleClick}>换一下名字</Button>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Connection time={800}/>

      <WebSocketDemo title={titleInfo} />
      <button onClick={onChange}>{titleInfo.name}</button>
    </>
  )
}

export default DemoPage
