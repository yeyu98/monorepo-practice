/*
 * @Author: yeyu98
 * @Date: 2024-08-21 14:36:31
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-08-26 11:25:25
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

    this.initLCP()

    // 暂时先将初始化的内容都放在页面加载完成之后获取
    afterLoad(() => {
      this.initFP()
      this.initFCP()
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
        console.log('🥳🥳🥳 ~~ WebVitals ~~ onFCP ~~ entry--->>>', entry)
        if(entry.name === MetricType.FCP) {
          const metric = {
            startTime: entry.startTime,
            entry
          }
          this.metrics.set(MetricType.FCP, metric)
          console.log('initFCP', this.metrics.getValues())
        }
      }
    })
  }
  initLCP() {
    // NOTE 为何无法在界面加载完成之后直接获取呢，需要切换tab才行？
    onLCP((lcpMetric) => {
      const { entries } = lcpMetric
      console.log('🥳🥳🥳 ~~ WebVitals ~~ onLCP ~~ lcpMetric--->>>', lcpMetric)
      for(const entry of entries) {
        if(entry.entryType === MetricType.LCP) {
          const metric = {
            startTime: entry.startTime,
            entry
          }
          this.metrics.set(MetricType.LCP, metric)
          console.log('initLCP', this.metrics.getValues())
        }
      }
    })

    // observe(MetricType.LCP, (entry: any) => {
    // console.log('🥳🥳🥳 ~~ WebVitals ~~ observe ~~ entry--->>>', entry)
    // })
  }
  initCLS() {
    onCLS((clsMetric) => {
      const {} = clsMetric
      console.log('🥳🥳🥳 ~~ WebVitals ~~ onCLS ~~ clsMetric--->>>', clsMetric)
    })
  }
  initFID() {}
  initNavigationTiming() {}
  initResourceFlow() {}

  // 何时上报
  report() {}
}

export default WebVitals