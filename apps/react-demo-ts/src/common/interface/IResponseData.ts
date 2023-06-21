/*
 * @Author: xiaohu
 * @Date: 2023-01-13 10:48:37
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-01-13 10:50:03
 * @FilePath: \react-demo-ts\src\common\interface\ResponseData.ts
 * @Description: 
 */
export interface IResponseData<T = any> {
  code: number,
  result: T,
  message: string
}