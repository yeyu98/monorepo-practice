/*
 * @Author: lzy-Jerry
 * @Date: 2023-09-26 21:35:35
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-17 22:30:26
 * @Description: 
 */
import React, {useState} from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Button, Modal  } from 'antd'

interface Props {}

function PDF(props: Props) {
    const {} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [domPhoto, setDomPhoto] = useState<string>('');
    const [canvasDom, setCanvasDom] = useState<HTMLCanvasElement | null>(null);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handlePrint = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [2, 4]
        });
        console.log(domPhoto)
        doc.addImage(domPhoto, 0, 0, 30, 30)
        doc.save("a4.pdf");
        console.log('doc --->>>', doc)
    }

    const formatSize = (size: string) => parseInt(size.replace(/px/, ''))

    const handlePreview = () => {
        html2canvas(document.querySelector('#root')!).then((canvas: HTMLCanvasElement) => {
            // setCanvasDom(canvas)
            const [width, height] = [formatSize(canvas.style.width), formatSize(canvas.style.height)]
            const newCanvas = document.createElement('canvas')
            newCanvas.width = width
            newCanvas.height = height
            const ctx = newCanvas.getContext('2d')
            ctx?.drawImage(canvas, 0, 0, width, height)
            const base64 = newCanvas.toDataURL('png', 1)
            setDomPhoto(base64)
            showModal()
        })
    }
    return (
        <>
            <Button onClick={handlePrint}>生成pdf</Button>
            <Button onClick={handlePreview}>预览</Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={'100%'}>
                <img src={domPhoto} alt="" />
            </Modal>
        </>
    )
}

export default PDF
