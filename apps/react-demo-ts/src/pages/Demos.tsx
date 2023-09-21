/*
 * @Author: xiaohu
 * @Date: 2023-06-27 11:25:29
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-09-21 22:27:11
 * @FilePath: \Explores\apps\react-demo-ts\src\pages\Demos.tsx
 * @Description: 
 */
import React, { useEffect, useState, lazy, Suspense, useRef } from 'react'
import { Button, Collapse } from 'antd';

interface Props {}
interface ModuleInfo {
  moduleName: string;
  Component: React.LazyExoticComponent<any>;
}

type ModuleInfoMap = Map<string, ModuleInfo[]>

interface ModuleItem {
  key: number;
  label: string;
  children: any
}

/**
 * FIXME 尚存在的问题
 * 点击模块对应的按钮时有时候无法点击生效，即使已经有对应的数据了
 * 点击模块按钮无法加载对应的组件
 */

function Demos(props: Props) {
  // NOTE 根据目录生成按钮以及按钮对应的模块
  // 现在的结构是一个modules map下有对应一个modules list
  const {} = props
  const modulesKey = localStorage.getItem('modulesKey')
  const moduleInfoMapRef = useRef<ModuleInfoMap>(new Map())
  const [moduleList, setModuleList] = useState<ModuleItem[]>([])
  const [currentModulesKey, setCurrentModulesKey] = useState<string>(modulesKey || 'Animation')
  const [CurrentComponent, setCurrentComponents] = useState<any>()

  const setLocalStorage = (modulesKey: string) => {
    localStorage.setItem("modulesKey", modulesKey)
    setCurrentModulesKey(modulesKey)
  }

  const handleClick = (modulesKey: string, moduleName: string) => {
    if(modulesKey === currentModulesKey) return
    setLocalStorage(modulesKey)
    const modules = moduleInfoMapRef.current.get(modulesKey)
    console.log("🚀🚀🚀 ~ file: Demos.tsx:46 ~ handleClick ~ moduleInfoMapRef.current--->>>", moduleInfoMapRef.current)
    const currentModule = modules?.find(module => module.moduleName === moduleName)
    console.log("🚀🚀🚀 ~ file: Demos.tsx:47 ~ handleClick ~ currentModule--->>>", currentModule?.Component)
    // setCurrentComponents(currentModule?.Component)
  }

  /**
   * NOTE 渲染模块对应的子节点，将moduleInfoList ===>>> buttonList
   * @param moduleInfoList 
   * @returns 
   */
  const renderChildren = (modulesKey: string, moduleInfoList: ModuleInfo[]) => {
    const buttonList = moduleInfoList.map((moduleInfo: ModuleInfo) => 
      <Button key={moduleInfo.moduleName} type="primary" onClick={() => handleClick(modulesKey, moduleInfo.moduleName)}>
        {moduleInfo.moduleName}
      </Button>
    )
    return buttonList
  }

  /**
   * NOTE 获取AboutDemos下的组件集合，组件集合的key为modulesKey，一个modulesKey下可能会存在很多个组件
   * @returns moduleMap
   */
  const getModuleMap = () => {
    const modules: any = import.meta.glob('../components/AboutDemos/**/*.tsx')
    const moduleMap: ModuleInfoMap = new Map()
    for(let key in modules) {
      const [_1, _2, _3, parentKey, currentKey] = key.split('/')
      const Component = lazy<any>(modules[key])
      const module = {
        moduleName: currentKey,
        Component
      }
      moduleMap.get(parentKey) ? moduleMap.get(parentKey)!.push(module) : moduleMap.set(parentKey, [module])
    }
    return moduleMap
  }

  const transferCollapse = () => {
    const moduleKeys = [...moduleInfoMapRef.current.keys()]
    const moduleList = moduleKeys.map((_key: string, index) => ({
      key: index,
      label: _key,
      children: renderChildren(_key, moduleInfoMapRef.current.get(_key)!)
    }))
    setModuleList(moduleList)
  }

  useEffect(() => {
    const moduleMap = getModuleMap()
    moduleInfoMapRef.current = moduleMap
    transferCollapse()
  }, [])
  return (
    <>
      <div className='flex'>
        <div className='flex-1'>
          <h3>模块区</h3>
          <Collapse accordion items={moduleList} />
        </div>
        <div className='flex-1 overflow-y-auto'>
          <h3>展示区</h3>
          <Suspense fallback={'loading...'}>
            {/* <CurrentComponent /> */}
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Demos
