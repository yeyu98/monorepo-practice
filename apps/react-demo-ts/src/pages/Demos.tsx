/*
 * @Author: xiaohu
 * @Date: 2023-06-27 11:25:29
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-28 14:26:05
 * @FilePath: \Explores\apps\react-demo-ts\src\pages\Demos.tsx
 * @Description: 
 */
import React, { useEffect, useState, lazy, Suspense } from 'react'
import useModuleList from '@/hooks/useModuleList';
import { Button, Collapse } from 'antd';
import classnames from 'classnames'
import type { CollapseProps } from 'antd';

interface Props {}
interface ModuleInfo {
  moduleName: string;
  Component: React.LazyExoticComponent<any>;
}

function Demos(props: Props) {
  const {} = props
  const module = localStorage.getItem('module')
  const [moduleInfo, setModuleInfo] = useState<Map<string, ModuleInfo[]>>(new Map())
  const [currentModule, setCurrentModule] = useState<string>(module || 'Animation')
  const [collapseList, setCollapseList] = useState([])
  // const buttonClass = classnames()
  // 根据目录生成按钮以及按钮对应的模块

  const handleClick = (moduleName: string) => {
    if(moduleName === currentModule) return
    localStorage.setItem("module", moduleName)
    setCurrentModule(moduleName)
  }

  const renderChildren = (moduleInfoList: any) => {
    const buttonList = moduleInfoList.map(moduleInfo => {
      return <Button key={moduleInfo.moduleName} type="primary" onClick={() => handleClick(moduleInfo.moduleName)}>{moduleInfo.moduleName}</Button>
    })
    // const result = moduleInfoList.map((moduleInfo:any) => {
    //   const LazyComponent = moduleInfo.Component
    //   return <>
    //     { 
    //       currentModule === moduleInfo.moduleName ? <>
    //         <Suspense fallback={<div>loading...</div>}>
    //           <LazyComponent />
    //         </Suspense>
    //       </> : null
    //     }
    //   </>
    // })
    return buttonList
  }

  useEffect(() => {
    const modules: any = import.meta.glob('../components/AboutDemos/**/*.tsx')
    const map = new Map()
    for(let key in modules) {
      const keys = key.split('/')
      const parentKey = keys[3]
      const currentKey = keys[4]
      const Component = lazy<any>(modules[key])
      const module = {
        moduleName: currentKey,
        Component
      }
      if(map.get(parentKey)) {
        map.get(parentKey).push(module)
      } else {
        map.set(parentKey, [module])
      }
    }
    setModuleInfo(map)
  }, [])

  useEffect(() => {
    const levelOneKeys = [...moduleInfo.keys()]
    const _moduleInfo = levelOneKeys.map((_key: string, index) => {
      console.log(moduleInfo.get(_key))
      return {
        key: index,
        label: _key,
        children: renderChildren(moduleInfo.get(_key))
      }
    })
    setCollapseList(_moduleInfo)
  }, [moduleInfo])

  return (
    <>
      <div className='flex'>
        <div className='flex-1'>
          <h3>选择区</h3>
          <Collapse accordion items={collapseList} />
        </div>
        <div className='flex-1 overflow-y-auto'>
          <h3>展示区</h3>
          
        </div>
              {/* <div className='flex'>
        {
          moduleInfoList.map(moduleInfo => {
            return <Button key={moduleInfo.moduleName} type="primary" onClick={() => handleClick(moduleInfo.moduleName)}>{moduleInfo.moduleName}</Button>
          })
        }
      </div> */}

      </div>
    </>
  )
}

export default Demos
