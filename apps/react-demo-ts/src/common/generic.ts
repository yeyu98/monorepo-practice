
/*
 * @Author: xiaohu
 * @Date: 2023-01-13 10:30:04
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-01-14 11:45:00
 * @FilePath: \react-demo-ts\src\common\generic.ts
 * @Description: 
 */

import axios from "axios"
import { IResponseData } from './interface/IResponseData';

// 泛型的作用更多的是用于约束不确定类型的变量提供类似于传参的方式在使用的时候来指定所需要的类型；

// 泛型约束json返回值
interface LoadUserResponse {
  name: string,
  age: number
}

const getJson = <T>(url: string, headers: {[key: string]: string} = {}): Promise<T> => {
  const fethConfig = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(headers || {})
  }

  return fetch(url, fethConfig).then<T>(res => res.json())
}


getJson<LoadUserResponse>("https://examiner.com")


// 泛型约束axios

const getUser = <T>() => {
  return axios.get<IResponseData<T>>("/somepath").then(res => res.data)
}

interface IResult {
  name: string,
  age: number
}
const requestUser = async() => {
  const res = await getUser<IResult>()
}

// function getUser<T>() {
//   return axios.get<IResponseData<T>>('/somepath')
//     .then(res => res.data)
//     .catch(err => console.error(err));
// }



















export default {}