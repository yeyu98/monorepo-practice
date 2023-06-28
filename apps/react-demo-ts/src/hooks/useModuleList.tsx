import { lazy, useEffect, useState } from 'react'

interface ModuleInfo {
  moduleName: string;
  Component: React.LazyExoticComponent<any>;
}

const useModuleList = (path: string) => {

  const [moduleInfoList, setModuleInfoList] = useState<ModuleInfo[]>([])

  useEffect(() => {
    const modules: any = import.meta.glob('../components/**/*.tsx')
    console.log(modules)
    const _moduleInfoList = []
    for(let key in modules) {
      const keys = key.split('/')
      const Component = lazy<any>(modules[key])

      _moduleInfoList.push({
        moduleName: keys[2],
        Component
      })
    }
    setModuleInfoList(_moduleInfoList)
  }, [])

  return [moduleInfoList]
}

export default useModuleList