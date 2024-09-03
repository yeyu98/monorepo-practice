/*
 * @Author: yeyu98
 * @Date: 2024-09-02 15:31:51
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-09-03 11:36:47
 * @FilePath: \monorepo-practice\apps\react-demo-ts\src\utils\UserVitals.ts
 * @Description: 
 */

import {MetricsStore, UserMetricType} from './MetricsStore'
import BehaviorStore from './BehaviorStack'
import {afterLoad} from './WebVitals'

const wr = (type: string) => {
  const target = history[type]
  return function(this: unknown, ...args: any) {
    const rv = target.apply(this, args)
    const event = new Event(type)
    dispatchEvent(event)
    return rv
  }
}

const wrHistory = () => {
  history.pushState = wr('pushState')
  history.replaceState = wr('replaceState')
}

// 因为无法监听路由前进，所以需要对history.pushState/replaceState重写
// 唯一可能存在重复的情况在于老版本路由在回退的时候 hashchange和popstate 可能同时存在
// 关于hash路由
// 如果同时存在hashchange和popstate且popstate在前的则可以判定为hash路由
// 老版本
// 无论push、replace、go、back都会触发hashchange和popstate
// 新版本
// 回退、go之类的会触发popstate和hashchange
const proxyHash = (handler: any) => {
  window.addEventListener('hashchange', e => handler(e), true)
  window.addEventListener('popstate', e => handler(e), true)
}

// 关于history路由
// pushState/replaceState需要重写方法监听
// 回退、go之类的会触发popstate
// window.addEventListener('')
const proxyHistory = (handler: any) => {
  window.addEventListener('pushState', e => handler(e), true)
  window.addEventListener('replaceState', e => handler(e), true)
}


// 界面来源信息
const getOriginInfo = () => ({
  source: document.referrer,
  sourceType: performance?.navigation?.type || ''
})

export class UserVitals {
  private breadcrumb: BehaviorStore;
  private userMetric: MetricsStore;
  // 允许点击的标签比如 button、div、img等
  clickMountList: Array<string>;
  constructor(maxBehaviorRecords: number = 100, clickMountList: Array<string> = ['button']) {
    this.breadcrumb = new BehaviorStore({maxBehaviorRecords})
    this.userMetric = new MetricsStore()
    this.clickMountList = clickMountList.map(x => x.toLowerCase())
    wrHistory()
    this.initPageInfo()
    this.initRouteChangeRecord()
    this.initPV()
    this.initClickBehaviorRecord()
    this.initCustomDefineRecord()
    this.initHttpRecord()
  }
  getPageInfo() {
    // 页面信息
    // https://juejin.cn:8080/#/post/7098656658649251877?id=123
    const {
      href,
      origin,
      protocol,
      host,
      hostname,
      port,
      hash,
      pathname,
      search,
    } = window.location
    // 屏幕大小
    const {width, height} = window.screen
    // 文档标题
    const title = document.title
    // 文档大小
    const docWidth = document.body.clientWidth || document.documentElement.clientWidth
    const docHeight = document.body.clientHeight || document.documentElement.clientHeight
    // userAgent
    const userAgent = window.navigator.userAgent

    return {
      href,
      origin,
      protocol,
      host,
      hostname,
      port,
      hash,
      pathname,
      search,
      title,
      screenSize: `${width}x${height}`,
      docSize: `${docWidth}x${docHeight}`,
      userAgent
    }
  }
  getExtends() {
    const pageInfo = this.getPageInfo()
    return {
      page: pageInfo.pathname,
      timestamp: Date.now()
    }
  }
  initPageInfo() {
    const pageInfo = this.getPageInfo()
    const metric = pageInfo
    this.userMetric.set(UserMetricType.PI, metric)
  }
  initRouteChangeRecord() {
    const handler = (event: Event) => {
      const metric = {
        jumpType: event.type,
        timestamp: Date.now(),
        pageInfo: this.getPageInfo()
      } 
      this.userMetric.set(UserMetricType.RCR, metric)
      delete metric.pageInfo;
      this.breadcrumb.push({
        name: UserMetricType.RCR,
        value: metric,
        ...this.getExtends()
      })
      console.log('🥳🥳🥳 ~~ UserVitals ~~ handler ~~ this.breadcrumb--->>>', this.breadcrumb.get())
    }
    proxyHash(handler)
    proxyHistory(handler)
  }
  initPV() {
    // PV需要结合路由跳转，且需要立即上报
    const handler = () => {
      const metric = {
        timestamp: Date.now(),
        pageInfo: this.getPageInfo(),
        sourceInfo: getOriginInfo()
      }
      console.log('🥳🥳🥳 ~~ UserVitals ~~ handler ~~ metric--->>>', metric)
      // 上报...
    }
    afterLoad(() => {
      handler()
    })
    proxyHash(handler)
    proxyHistory(handler)
  }
  initClickBehaviorRecord() {
    const handler = (e: MouseEvent | any) => {
      // 需要根据标签list过滤target
      let target = e.composedPath().find((x:Element) => this.clickMountList.includes(x.tagName.toLowerCase()))
      target = target || this.clickMountList.includes(e.target?.tagName.toLowerCase()) ? e.target : undefined
      const metric = {
        tagInfo: {
          id: target.id,
          classList: target.classList,
          tagName: target.tagName.toLowerCase(),
          text: target.textContent,
        },
        timestamp: Date.now(),
        pageInfo: this.getPageInfo(),
      }
      this.userMetric.set(UserMetricType.CBR, metric)
      delete metric.pageInfo;
      this.breadcrumb.push({
        name: UserMetricType.CBR,
        value: metric,
        ...this.getExtends()
      })
    }
    window.addEventListener('click', e => handler(e), true)
  }
  initCustomDefineRecord() {}
  initHttpRecord() {}
}
