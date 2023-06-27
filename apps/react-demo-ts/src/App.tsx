/*
 * @Author: xiaohu
 * @Date: 2022-12-07 15:34:10
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-06-27 11:48:11
 * @FilePath: \Explores\apps\react-demo-ts\src\App.tsx
 * @Description: 
 */
import { FC, useEffect, useState, Fragment } from "react"
import { useNavigate } from "react-router"
import { Button } from "antd"
import router from "./router/index"
import './App.less'
interface IProps {

}

const App: FC<IProps> = (props) => {

  const [navList, setNavList] = useState<string []>([])
  const navigate = useNavigate()

  useEffect(() => {
    console.log(router)
    const path = router.routes
    const _navList: string[] = []
    path.forEach(item => {
      if(item.path !== '/') {
        const path = item.path?.slice(1) || ''
        const _path = path.replace(/(^\w{1})|(\s+\w{1})/g, (first) => first.toUpperCase())
        _navList.push(_path)
      }
    })
    setNavList(_navList) 
  }, [])
  
  return (
    <div className="App">
      {
        navList?.map((nav, index) => {
          return <Fragment key={nav}>
            <Button 
              className={nav}
              type="primary"
              onClick={e => navigate(`/${nav}`)} 
            >{nav}</Button>
          </Fragment>
        })
      }
    </div>
  )
}

export default App
