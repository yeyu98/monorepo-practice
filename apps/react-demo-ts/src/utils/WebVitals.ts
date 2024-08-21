/*
 * @Author: yeyu98
 * @Date: 2024-08-21 14:36:31
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-08-21 16:58:16
 * @FilePath: \monorepo-practice\apps\react-demo-ts\src\utils\WebVitals.ts
 * @Description: 
 */

import {MetricsStore, MetricType} from './MetricsStore'
import {onFCP, onLCP, onCLS, onFID} from 'web-vitals'

const afterLoad = (callback: any) => {
  // pageshow 和 onload的区别
  // onload和pageshow都会在页面加载完成之后触发，不同的是onload只会在第一次加载完成后触发，有些浏览器会将页面完成加载之后缓存
  // 当发生前进或后退时会直接从缓存中获取页面，此时onload不会触发，pageshow无论页面有没有被缓存都会触发
  if(document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('pageshow', function() {
      callback()
    })
  }
}

const observe = (type: string, callback: any) => {
  if(PerformanceObserver?.supportedEntryTypes.includes(type)) {
    const performanceObserver = new PerformanceObserver((l) => l.getEntries().forEach(callback))
     performanceObserver.observe({
      type,
      buffered: true
    })
    return performanceObserver
  }
  return undefined
}



class WebVitals {
  metrics: MetricsStore = new MetricsStore()

  constructor() {
    // 暂时先将初始化的内容都放在页面加载完成之后获取
    afterLoad(() => {
      this.initFP()
      this.initFCP()
      this.initLCP()
      this.initFID()
      this.initCLS()
      this.initNavigationTiming()
      this.initResourceFlow() 
    })
  }

  initFP() {
    observe('paint', (entry: any) => {
      if(entry.name === MetricType.FP) {
        const metric = {
          startTime: entry.startTime,
          entry
        }
        this.metrics.set(MetricType.FP, metric)
        console.log('initFP', this.metrics.getValues())
      }
    })
  }
  initFCP() {
    onFCP((fcpMetric) => {
      const {entries} = fcpMetric
      for(const entry of entries) {
        if(entry.name === MetricType.FCP) {}
      }
    })
  }
  initLCP() {}
  initFID() {}
  initCLS() {}
  initNavigationTiming() {}
  initResourceFlow() {}

  // 何时上报
  report() {}
}

export default WebVitals