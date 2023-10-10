/*
 * @Author: lzy-Jerry
 * @Date: 2023-10-10 21:38:46
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-10-10 22:21:20
 * @Description: 
 */
import React, { useEffect } from 'react'
import store from '@/store/redux/index'
import { appAction } from '@/store/redux/index'
import { connect } from 'react-redux'
import type { AppReducerState } from '@/store/redux/state/app/reducer'
import { Button, Input } from 'antd'

type Props = {
    setInputValue: any,
    setCount: any
} & AppReducerState
function ReduxDemo(props: Props) {
    const {count, inputValue, setInputValue, setCount} = props
    const handleClick = () => {
        const _count = count + 1
        setCount(_count)
    }

    useEffect(() => {
        console.log(store.getState(), count)
    })

    return (
        <>
            <h3>About Redux & React-Redux</h3>
            <div className='flex flex-col flex-grow-0 items-center'>
                <Button className='w-1/5' type={'primary'} onClick={handleClick}>setCount {count}</Button><br/> 
                <div className='w-1/5 flex items-center'>
                    <span>setInputValue：</span>
                    <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ AppReducer }: { AppReducer: AppReducerState }) => {
    // 将store下的state注入到props中
    const { count, inputValue } = AppReducer
    return {
        count,
        inputValue
    }
}
const mapDispatchToProps = () => {
    const { setCount, setInputValue } = appAction
    return {
        setCount,
        setInputValue
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReduxDemo) 
