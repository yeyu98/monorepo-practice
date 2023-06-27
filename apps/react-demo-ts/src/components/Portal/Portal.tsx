
import React from 'react'
import { createPortal } from "react-dom"

interface Props {}

const Test = () => {
  return (
    <>Test</>
  )
}

function Portal(props: Props) {
  const {} = props

  return (
    <>
      <div className='craft'>craft节点</div>
      <Test />
      {
        createPortal(<Test />, document.body)
      }
    </>
  )
}

export default Portal
