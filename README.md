<!--
 * @Author: xiaohu
 * @Date: 2023-06-21 11:24:03
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-27 14:19:48
 * @FilePath: \Explores\README.md
 * @Description: 
-->

- 整个项目包含两种内容
- 一种是test类型的，比如小属性小api的测试；
- 一种是小demo类型的，比如小功能；
- 一种是系列类型的比如关于canvas的所有知识点技巧之类的；

问题汇总
tailwind 和 antd样式冲突导致按钮出现透明色？
原因是 tailwind初始化样式normalize覆盖了antd的按钮样式导致；
解决方法
取消tailwind默认样式通过配置tailwind.config.js中的
corePlugins: {
    preflight: false
  }
