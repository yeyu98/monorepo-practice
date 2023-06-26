/*
 * @Author: xiaohu
 * @Date: 2023-03-10 10:25:29
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-22 14:05:00
 * @FilePath: \Explores\apps\react-demo-ts\src\pages\NewDemoPage.tsx
 * @Description: 
 */
import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Button } from 'antd';

interface Props {}
interface ModuleInfo {
  moduleName: string;
  Component: React.LazyExoticComponent<any>;
}

function NewDemoPage(props: Props) {
  const {} = props
  const [moduleInfoList, setModuleInfoList] = useState<ModuleInfo[]>([])
  const [currentModule, setCurrentModule] = useState<string>('Animation')
  // 根据目录生成按钮以及按钮对应的模块

  const handleClick = (moduleName: string) => {
    if(moduleName === currentModule) return
    setCurrentModule(moduleName)
  }

  useEffect(() => {
    const modules = import.meta.glob('../components/**/*.tsx')
    const _moduleInfoList = []
    for(let key in modules) {
      const keys = key.split('/')
      const Component = lazy<any>(modules[key])
      console.log(typeof modules[key])
      _moduleInfoList.push({
        moduleName: keys[2],
        Component
      })
    }
    console.log(_moduleInfoList)
    setModuleInfoList(_moduleInfoList)
  }, [])

  return (
    <>
      {
        moduleInfoList.map(moduleInfo => {
          return <Button key={moduleInfo.moduleName} type="primary" onClick={() => handleClick(moduleInfo.moduleName)}>{moduleInfo.moduleName}</Button>
        })
      }
      <hr />
      <div className='flex'>
        {
          moduleInfoList.map(moduleInfo => {
            const LazyComponent = moduleInfo.Component
            return <>
              { 
                currentModule === moduleInfo.moduleName ? <>
                  <Suspense fallback={<div>loading...</div>}>
                    <LazyComponent />
                  </Suspense>
                </> : null
              }
            </>
          })
        }
      </div>
    </>
  )
}

export default NewDemoPage
