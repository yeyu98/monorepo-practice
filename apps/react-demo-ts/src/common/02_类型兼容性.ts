/*
 * @Author: xiaohu
 * @Date: 2023-01-14 11:45:26
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-03-10 10:22:27
 * @FilePath: \react-demo-ts\src\common\02_类型兼容性.ts
 * @Description: 
 */

// 变体
// 协变：在相同方向上变
// 逆变：在相反方向上变
// 双向协变：在相同方向和相反方向都变


// 1 函数

// 返回类型：协变返回类型必须包含足够的数据


interface IPoint2D { // 父集
  x: number,
  y: number
}

interface IPoint3D { // 子集
  x: number,
  y: number,
  z: number
}

let iMakePoint2D = (): IPoint2D => ({x: 0, y:0})
let iMakePoint3D = (): IPoint3D => ({x: 0, y:0, z:0})


// 为什么参数多的函数能够赋值给参数少的函数？
// 因为参数少的所需要的参数多的都有


// 子类是父类的超集合，所需要的属性大于父类
iMakePoint2D = iMakePoint3D 
// iMakePoint3D = iMakePoint2D



// 2 联合类型 和 函数传参是不一样的
// 联合类型多的无法赋值给联合类型少的因为联合类型多的同样所囊括的情况更多而此时 联合类型少的无法处理；
// 比如
// a b c  ab ac bc
// a b
// 此时son的组合
type Person = 'a' | 'b' | 'c'
type Son = 'a' | 'b'

let person: Person
let son: Son
// person = son;
// son = person













export {}