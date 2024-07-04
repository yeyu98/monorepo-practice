/*
 * @Author: xiaohu
 * @Date: 2023-06-27 11:25:18
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-07-02 23:05:28
 * @FilePath: \Explores\apps\react-demo-ts\src\pages\Series.tsx
 * @Description: 
 */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Series.less'

interface Props {}

function Series(props: Props) {
  const {} = props
  // const BASE_URL = `https://www.duitang.com`;
  const [imgList, setImgList] = useState<any>([])
  const LIMIT = 100
  const MAX = 10
  const url = `api/napi/blog/list/by_tag/`;
  // const imgList = [
  //   'https://c-ssl.dtstatic.com/uploads/blog/202207/29/20220729075441_c732b.thumb.400_0.jpeg',
  //   'https://c-ssl.dtstatic.com/uploads/blog/202207/29/20220729075441_ecced.thumb.400_0.jpeg',
  //   'https://c-ssl.dtstatic.com/uploads/blog/202207/28/20220728220820_7ff79.thumb.400_0.jpg',
  //   'https://c-ssl.dtstatic.com/uploads/blog/202208/01/20220801163120_35a33.thumb.400_0.jpeg',
  //   'https://c-ssl.dtstatic.com/uploads/blog/202208/01/20220801163122_9cd41.thumb.400_0.jpeg',
  //   'https://c-ssl.dtstatic.com/uploads/blog/202204/09/20220409160343_41c2b.thumb.400_0.jpg',
  //   'https://c-ssl.dtstatic.com/uploads/blog/202207/28/20220728220820_a513a.thumb.400_0.jpeg',
  //   'https://d-ssl.dtstatic.com/uploads/blog/202206/16/20220616163840_26ae4.thumb.400_0.png_webp',
  //   'https://d-ssl.dtstatic.com/uploads/blog/202206/16/20220616163840_48288.thumb.400_0.png_webp',
  // ];

  const getQueryStr = (query: Record<string, string | number>) => {
    let result = ''
    for(let key in query) {
      result += `${key}=${query[key]}&`
    }
    return result
  }

  const genQueryStr = (start: number) => {
    const _ = Date.now()
    const query = {
      tag: "女生头像",
      include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album",
      limit: LIMIT,
      start,
      _
    }
    const queryStr = getQueryStr(query)
    return queryStr
  }


  const getRandom = (min: number = 500, max: number = 1000) => {
    const number = Math.random() * 500;
    const diff = max - min;
    return Math.round(number + diff)
  }

  const queryImgList = (queryStr: string) => {
    axios.get(`${url}?${queryStr}`).then(({data}) => {
      const _list = data.data.object_list
      console.log("✨✨🥰  ~ axios.get ~ _list--->>>", _list)
      setImgList((list) => [...list, ..._list])
    })
  }

  const sleep = (time: number = 500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('')
      }, time);
    })
  }

  const queryAll = async () => {
    
    for(let i=0; i<MAX; i++) {
      const queryStr = genQueryStr(i)
      const randomNumber = getRandom(500, 800)
      await queryImgList(queryStr)
      await sleep(randomNumber)
    }
  }

  useEffect(() => {
    queryAll()
  }, [])

  return (
    <>
      <div className="wrapper">
        {imgList.map((item: any) => (
          <img src={item.photo.path} key={item.album.id} alt={item.album.name} referrerPolicy="no-referrer"/>
        ))}
      </div>
    </>
  )
}

export default Series
