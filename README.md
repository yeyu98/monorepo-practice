<!--
 * @Author: xiaohu
 * @Date: 2023-06-21 11:24:03
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-07-31 22:14:39
 * @FilePath: \Explores\README.md
 * @Description: 
-->

- 整个项目包含两种内容
- 一种是test类型的，比如小属性小api的测试；
- 一种是小demo类型的，比如小功能；
- 一种是系列类型的比如关于canvas的所有知识点技巧之类的；

问题汇总
- vite项目中使用tailwind无法生效？
  原因是vite项目中配置文件没有使用ESM导致
- postcss的作用是什么呢？

- tailwind 和 antd样式冲突导致按钮出现透明色？
  原因是 tailwind初始化样式normalize覆盖了antd的按钮样式导致；
  解决方法
  取消tailwind默认样式通过配置tailwind.config.js中的
  corePlugins: {
    preflight: false
  }



- BadApple
  - 通过canvas渲染视频的每一帧画面；
  - 将每一帧画面灰度化处理，灰度化算法将r、g、b分别赋值gray；
    - gray = (r*19595 + g*38469 + b*7472) >> 16；
  - 根据灰度化之后的rgba对图片进行二值化处理；
    - 可能存在一些模糊、噪音通过高斯滤波函数将其处理；
    - 二值化和高斯滤波分别该用什么算法呢？
  - 将转换后的rgb根据255 / 0判断将其转换成字符渲染到html中；
    - 真实的canvas单个像素非常的小该如何和单个字符对应呢？