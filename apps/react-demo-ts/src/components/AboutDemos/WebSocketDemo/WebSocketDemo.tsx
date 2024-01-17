/*
 * @Author: xiaohu
 * @Date: 2023-01-15 19:16:30
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-17 22:33:18
 * @FilePath: \react-demo-ts\src\components\WebSocketDemo\WebSocketDemo.tsx
 * @Description: 
 */
import React, { useEffect, useState } from 'react'
interface Props {
  title: any
}
interface IUserChidlrenInfo {
  name?: string,
  age?: number,
}
interface IUserInfo {
  name?: string,
  age?: number,
  children: IUserChidlrenInfo
}

function WebSocketDemo(props: Props) {
  const { title } = props
  const [userInfo, setUserInfo] = useState<IUserInfo>({name: "张三", age: 22, children: {name: "王五"} })

  useEffect(() => {
    // const ws = new WebSocket("wss://echo.websocket.org")
    // ws.addEventListener("open", (e) => {
    //   console.log("已建立连接 --->>>", e)
    // })

    // ws.addEventListener("message", (e) => {
    //   console.log("发送消息 --->>>", e)
    // })
    // const _userInfo = {...userInfo}
    userInfo.children.name = "张三丰"
    setUserInfo(userInfo)

    console.log("webScokectDemo 刷新")
  })

  return (
   <>
    <div>{userInfo?.name}</div>
    <div>{userInfo.children.name}</div>
    <div>{userInfo?.age}</div>
    <h3>"我是一只猫"</h3>
   </> 
  )
}

export default React.memo(WebSocketDemo)

