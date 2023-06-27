import { Button } from 'antd'
import React, { useState, useMemo, useEffect } from 'react'
import "./DarkMode.css"

interface Props {}

function DarkMode(props: Props) {
  const {} = props
  const [isDark, setIsDark] = useState<Boolean>(false)

  const toggle = () => {
    setIsDark(!isDark)
  }

  const changeMode = () => {
    const _document = document.documentElement
    if(isDark) {
      _document.classList.add("dark")
    } else {
      _document.classList.remove("dark")
    }
  }

  useEffect(() => {
    changeMode()
  }, [isDark])

  const mode = useMemo<String>(() => {
    return !isDark ?  "Dark": "Light"
  }, [isDark])

  return (
      <div className="wrapper">
        <Button className="toggle" onClick={toggle}>Toggle {mode}-Mode</Button>
        <h2>Hey there! This is just a title</h2>
        <p>I am just a boring text, existing here solely for the purpose of this demo</p>
        <p>And I am just another one like the one above me, because two is better than having only one</p>
      </div>
  )
}

export default DarkMode
