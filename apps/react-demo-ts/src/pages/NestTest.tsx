import React, { useEffect } from 'react'
import SparkMD5 from 'spark-md5'

interface Props {}

function NestTest(props: Props) {
    const {} = props
    const getFileList = (file: Blob) => {
        const fileList = []
        const baseSize = 10 * 1024 * 1024
        let currentSize = 0
        while(currentSize < file.size) {
            const fileSlice = file.slice(currentSize, currentSize + baseSize)
            currentSize += baseSize
            fileList.push(fileSlice)
        }
        console.log('🥳🥳🥳 ~~ getFileList ~~ fileList.length--->>>', fileList.length)
        return fileList
    }
    const calculateHash = (fileList: Blob[]) => {
        console.time('worker')
        return new Promise((resolve, reject) => {
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
                    console.log(count)
                       const hash =  spark.end()
                       resolve(hash)
                    }
                }
                fileReader.onerror = (e: any) => {
                    console.log('err', e)
                    reject(e)
                }
            }
            loadNext(count)
        })
    }
    const handleUpload = (e: any) => {
        const file = e.target.files[0]
        console.log('🥳🥳🥳 ~~ handleUpload ~~ file--->>>', file)
        
        const fileList = getFileList(file)
        calculateHash([fileList[0]]).then(hash => {
            console.timeEnd('worker')
            console.log('🥳🥳🥳 ~~ loadNext ~~ hash--->>>', hash)
        })
    }

    useEffect(() => {
        // const eventSource = new EventSource('http://localhost:3000/stream')
        // eventSource.addEventListener('message', ({data}: {data: string}) => {
        //     console.log(JSON.parse(data).msg)
        // })
    }, [])

    return (
        <>
            <h1>Nest SSE Test</h1>
            <input type="file" onChange={handleUpload} multiple/>
        </>
    )
}

export default NestTest
