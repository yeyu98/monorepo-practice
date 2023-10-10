/*
 * @Author: lzy-Jerry
 * @Date: 2023-10-09 23:34:34
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-10-09 23:52:41
 * @Description: 
 */
import { ActionTypes } from './actionType'

export default {
    setCount: (count: number) => ({type: ActionTypes.SET_COUNT, payload: { count }}),
    setInputValue: (inputValue: string) => ({type: ActionTypes.SET_INPUT_VALUE, payload: { inputValue }})
}