/*
 * @Author: yeyu98
 * @Date: 2024-01-09 21:41:08
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-09 22:01:23
 * @Description: 
 */
import React from 'react'
import styles from './Magnifier.module.less'

interface Props {}

function Magnifier(props: Props) {
    const {} = props

    return (
        <>
            <div className={styles['wrapper']}>
                <img src="https://w.wallhaven.cc/full/85/wallhaven-858lz1.png" alt="" />
            </div>
        </>
    )
}

export default Magnifier
