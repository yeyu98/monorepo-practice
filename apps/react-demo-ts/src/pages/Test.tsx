/*
 * @Author: xiaohu
 * @Date: 2023-06-27 11:40:55
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-30 22:44:44
 * @FilePath: \Explores\apps\react-demo-ts\src\pages\Test.tsx
 * @Description: 
 */
import  { useRef } from 'react'
import { Button } from 'antd'

interface Props {}

/**
 * 因为浏览器的限制navigator.mediaDevices只在以下三种环境下可以获取到值
 * localhost
 * https
 * files://
*/

function Test(props: Props) {
  const {} = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoPlayRef = useRef<HTMLVideoElement>(null)
  const videoStream = useRef<MediaStream | null>(null)
  const videoRecorder = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const urlRef = useRef<string>('')

  const openCamera = () => {
    if(navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then(stream => {
          videoStream.current = stream
          if(videoRef.current && videoStream.current) {
            videoRef.current.srcObject = videoStream.current
            videoRef.current.onloadedmetadata = function() {
              videoRef.current?.play()
            }
            videoRecorder.current = new MediaRecorder(videoStream.current!)
          }
      })
    }
  }

  const startRecord = () => {
   if(videoRecorder.current) {
      videoRecorder.current?.start()
      console.log(videoRecorder.current)
      videoRecorder.current.ondataavailable = (e: BlobEvent) => {
        chunksRef.current.push(e.data)
      }
      videoRecorder.current.onstop  = () => {
        generateUrl()
      }
   }
  }

  const stopRecord = () => {
    videoRecorder.current?.stop()
    if(videoRef.current) {
      videoRef.current.pause()
      videoRef.current.srcObject = null
    }
    videoStream.current?.getTracks().forEach(track => {
      track.stop()
    })
    
  }

  const play = () => {
    if(urlRef.current && videoPlayRef.current) {
      videoPlayRef.current.src = urlRef.current
      console.log(urlRef.current)
    }
  }

  const generateUrl = () => {
    const blob = new Blob(chunksRef.current, {
      type: 'video/mp4'
    });
    const url = URL.createObjectURL(blob);
    urlRef.current = url
  }

  const download = () => {
    if(urlRef.current) {
      const a = document.createElement('a');
      a.href = urlRef.current;
      a.download = `record_${Date.now()}.mp4`
      a.click();
      URL.revokeObjectURL(urlRef.current);
    }
  }



  return (
    <>
      <div className={'w-full h-full flex justify-center items-center'}>
        <div className={'flex flex-col'}>
          <video className={'max-w-full bg-black'} ref={videoRef}></video>
          <div className={'flex justify-center m-16'}   >
            <Button type={'primary'} onClick={openCamera}>启动摄像头</Button>
            <Button type={'primary'} onClick={startRecord}>开始录制</Button>
            <Button type={'primary'} onClick={stopRecord}>停止录制</Button>
            <Button type={'primary'} onClick={play}>播放</Button>
            <Button type={'primary'} onClick={download}>下载</Button>
          </div>
          <video className={'max-w-full bg-black'} ref={videoPlayRef}></video>
        </div>
      </div>
    </>
  )
}

export default Test
