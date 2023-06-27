/*
 * @Author: xiaohu
 * @Date: 2023-05-25 09:34:55
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-05-25 15:55:39
 * @FilePath: \react-demo-ts\src\components\Recorder\Recorder.tsx
 * @Description: 
 */
import React, { useRef, useState } from 'react'
import { Button } from 'antd'

interface Props {}

// navigator.mediaDevices.getUserMedia 开启一个音频或视频流
// MediaRecorder 生成一个录制器
// mediaRecorder.ondataavailable 获取从录制开始到结束这一整段时间内的录制资源
// mediaRecorder.onStart 录制开始
// mediaRecorder.onStop 录制结束
// 默认生成的格式是wasm
function Recorder(props: Props) {
  const {} = props
  const mediaRecorder = useRef<MediaRecorder>()
  const blobRef = useRef<Blob []>([])
  const [audioUrl, setAudioUrl] = useState('')

  const transferUrl = () => {
    const blob = new Blob(blobRef.current)
    const url = URL.createObjectURL(blob)
    setAudioUrl(url)
  }
  const startRecord = async () => {
    const audioStream = await navigator.mediaDevices.getUserMedia({audio: true})
    mediaRecorder.current = new MediaRecorder(audioStream)
    mediaRecorder.current?.addEventListener("start", e => {
      console.log("开始录制")
      console.log(e)
    })
    mediaRecorder.current?.addEventListener("stop", e => {
      console.log("停止录制")
      console.log("stop", e)
    })
    mediaRecorder.current?.addEventListener("dataavailable", (e: BlobEvent) => {
      blobRef.current.push(e.data)
    })
    mediaRecorder.current.start()
  }
  const stopRecord = () => {
    transferUrl()
    mediaRecorder.current?.stop()
  }

  return (
    <>
      <h5>录音</h5>
      {
        audioUrl ? <audio src={audioUrl}></audio> : null
      }
      <Button onClick={startRecord}>开始录制</Button>
      <Button onClick={stopRecord}>停止录制</Button>
    </>
  )
}

export default Recorder
