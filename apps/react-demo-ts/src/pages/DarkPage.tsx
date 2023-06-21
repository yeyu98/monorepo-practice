/*
 * @Author: xiaohu
 * @Date: 2023-03-08 11:09:15
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-03-10 17:50:43
 * @FilePath: \react-demo-ts\src\pages\DarkPage.tsx
 * @Description: 
 */
import DarkMode from '@/components/DarkMode/DarkMode'

interface Props {}

function DarkPage(props: Props) {
  const {} = props

  return (
    <>
      <DarkMode />
      <input type="file" accept="image/*" capture="user" />
    </>
  )
}

export default DarkPage
