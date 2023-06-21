import React, { FormEvent, useEffect, useState } from 'react'

interface Props {
  test: string
}

function Demo(props: Props) {
  const { test } = props
  const [testProps, setTestProps] = useState(test)

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setTestProps(target.value)
  }

  useEffect(() => {
    setTestProps(test)
  }, [test])

  return (
    <input type="text" value={testProps} onInput={e => handleChange(e)}/>
  )
}


export default React.memo(Demo)
