/*
 * @Author: xiaohu
 * @Date: 2024-02-23 16:18:14
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-23 16:29:31
 * @FilePath: \monorepo-practice\apps\react-demo-ts\src\common\webworker.ts
 * @Description: 
 */

import SparkMD5 from 'spark-md5'

const calculateHash = (fileList: Blob[]) => {
  console.time('worker')
      const spark = new SparkMD5.ArrayBuffer()
      let count = 0
      const loadNext = (index: number) => {
          const fileReader = new FileReader()
          fileReader.readAsArrayBuffer(fileList[index])
          fileReader.onload = (e: any) => {
              spark.append(e.target?.result)
              count++
              if(count < fileList.length) {
                  loadNext(count)
              } else {
                 const hash =  spark.end()
                 console.timeEnd('worker')
                 self.postMessage(hash)
              }
          }
          fileReader.onerror = (e: any) => {
              console.log('err', e)
          }
      }
      loadNext(count)

}

self.onmessage = (e) => {
  console.log('🥳🥳🥳 ~~ e--->>>', e)
  
  
  calculateHash(e.data)
}