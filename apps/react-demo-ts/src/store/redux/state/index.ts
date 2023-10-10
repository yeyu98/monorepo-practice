import AppReducer from './app/reducer'
import AppAction from './app/action'

// 单个reducer函数 (state, action) => ({newState})
// 返回的newState需要保持数据不可变性因此需要提供一个新的对象
// action可以传递type 以及 其他的一些数据
export const reducers = {
    AppReducer 
}

// action 是一个函数对象 {setCount: (count) => ({type: 'SET_COUNT', payload: {count}})}
export const actions = {
    AppAction
}