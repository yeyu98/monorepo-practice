/*
 * @Author: lzy-Jerry
 * @Date: 2023-10-09 23:34:30
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-10-10 22:03:33
 * @Description: 
 */
import { ActionTypes } from "./actionType";
interface Action {
    type: string;
    payload: any;
}
export interface AppReducerState {
    count: number;
    inputValue: string;
}
const initState = {
    count: 0,
    inputValue: ''
}
export default function reducer(state = initState, action: Action) {
    switch(action.type) {
        case ActionTypes.SET_COUNT: {
            const { count } = action.payload
            return {
                ...state,
                count
            }
        }
        case ActionTypes.SET_INPUT_VALUE: {
            const { inputValue } = action.payload
            return {
                ...state,
                inputValue
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}