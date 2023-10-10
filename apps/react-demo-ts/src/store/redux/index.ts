/*
 * @Author: lzy-Jerry
 * @Date: 2023-10-09 23:27:16
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-10-10 21:42:36
 * @Description: 
 */
import { legacy_createStore as createStore, combineReducers, bindActionCreators } from 'redux'
import { reducers, actions } from './state/index'

const store = createStore(combineReducers(reducers))    
const appAction = bindActionCreators(actions.AppAction, store.dispatch)

export {
    appAction
}

export default store