/*
 * @Author: yeyu98
 * @Date: 2024-03-02 22:57:17
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-03-02 23:18:34
 * @Description: 
 */
import React, { useEffect } from 'react'
import styles from './ConvertVideo.module.less'
interface Props {}

function ConvertVideo(props: Props) {
    const {} = props
    const convert = () => {
        var blob = new Blob(["Hello, world!"], { type: 'text/plain' });
        var blobUrl = 'blob:https://twitter.com/6e1caa1d-8405-4ae0-84bb-1d5bbbe9c2d3'

        var xhr = new XMLHttpRequest;
        xhr.responseType = 'blob';

        xhr.onload = function() {
        var recoveredBlob = xhr.response;

        var reader = new FileReader;

        reader.onload = function() {
            var blobAsDataUrl = reader.result;
            console.log(blobAsDataUrl)
        };

        reader.readAsText(recoveredBlob);
        };

        xhr.open('GET', blobUrl);
        xhr.send();
    }
    useEffect(() => {
        convert()
    }, [])
    return (
        <>
            <div className={styles['wrapper']}>
                <video src="blob:https://twitter.com/6e1caa1d-8405-4ae0-84bb-1d5bbbe9c2d3"></video>
            </div>
        </>
    )
}

export default ConvertVideo
