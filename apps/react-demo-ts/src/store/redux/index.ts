/*
 * @Author: lzy-Jerry
 * @Date: 2023-10-09 23:27:16
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-10-10 23:52:52
 * @Description: 
 */
import { legacy_createStore as createStore, combineReducers, bindActionCreators } from 'redux'
import { reducers, actions } from './state/index'

/**
 * combineReducers(reducers)
 * 遍历reducers 取出合并每个reducer 将reducer合并到 newState里面 
 * 这里只是转换了一下对象变量？？？有点没看明白这么做的用意是啥对象拷贝？？
 * 再次看了一下感觉是合了个寂寞...
 */

/**
 *  createStore(combineReducers(reducers))：初始化时会默认触发一次 action.type = init 的dispatch以此让state获取到默认值
 *  getState：直接返回state没什么太大的操作；
 *  subscribe：注册listener，同时返回一个取消事件注册的方法
 *  dispatch：通过action的type匹配函数并返回最新的state 同时 执行遍历listeners（listeners作用是什么呢？）
 */
const store = createStore(combineReducers(reducers))    
console.log(store.getState())
/**
 * bindActionCreators 遍历传入的多个actions，当调用actions中的某一个函数时本质上是组合成了最新的action 之后调用dispatch 更新state
 */

/* 

    function bindActionCreator<A extends Action>(
    actionCreator: ActionCreator<A>,
    dispatch: Dispatch<A>
    ) {
    return function (this: any, ...args: any[]) {
        return dispatch(actionCreator.apply(this, args))
    }
    }

    const boundActionCreators: ActionCreatorsMapObject = {}
    for (const key in actionCreators) {
        const actionCreator = actionCreators[key]
        if (typeof actionCreator === 'function') {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
        }
    }
    return boundActionCreators
*/
const appAction = bindActionCreators(actions.AppAction, store.dispatch)

export {
    appAction
}

export default store