import React, { useEffect, useState } from 'react'
import { Upload, Image, Button } from 'antd';
import type { UploadProps } from 'antd';
import { createWorker } from 'tesseract.js';


interface Props {}

function Ocr(props: Props) {
    const {} = props
    const [imageUrl, setImageUrl] = useState('')
    const [text, setText] = useState('')

    const handleChange:UploadProps['onChange'] = (info) => {
        if(info.file) {
            const url = URL.createObjectURL(info.file)
            setImageUrl(url)
            startRecognize(url)
        }
    }

    const startRecognize = async(url: string) => {
        const worker = await createWorker(['eng', 'chi_sim', 'chi_tra'], 1, {
            // logger: m => console.log(m), // Add logger here
        })
        const task = (await worker).recognize(url)
        const {data: {text, lines}, data} = await task
        setText(text)
        console.log("✨✨🥰  ~ startRecognize ~ text--->>>", text, data)
    }

    const renderPreviewImage = () => (
        <>
        <Image
            width={200}
            src={imageUrl}
        />
    </>
    )


    // useEffect(() => {
    //     startRecognize()
    // }, [])

    return (
        <>  
            <div className='flex flex-col'>
                {
                    text ? <p>{text}</p> : null
                }
                <div className='grid grid-cols-2 items-center'>
                    <Upload
                        name="avatar"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleChange}
                    >
                        <Button>上传</Button>
                    </Upload>
                    {imageUrl ?  renderPreviewImage() : ""}
                </div>
            </div>
        </>
    )
}

export default Ocr
