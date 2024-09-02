/*
 * @Author: yeyu98
 * @Date: 2024-08-21 14:36:31
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-08-29 11:30:25
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

const getNavigationTiming = () => {
  if(performance.getEntriesByType('navigation')?.length > 0) {
    return performance.getEntriesByType('navigation')[0]
  }
  return performance.timing
}

const observe = (type: string, callback: any) => {
  // console.log('🥳🥳🥳 ~~ observe ~~ type--->>>', type)
  // console.log('🥳🥳🥳 ~~ observe ~~ PerformanceObserver?.supportedEntryTypes.includes(type)--->>>', PerformanceObserver?.supportedEntryTypes)

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
    this.initCLS()

    // 暂时先将初始化的内容都放在页面加载完成之后获取
    afterLoad(() => {
      this.initFP()
      this.initFCP()
      this.initFID()
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
      console.log('🥳🥳🥳 ~~ WebVitals ~~ onFCP ~~ fcpMetric--->>>', fcpMetric)
      for(const entry of entries) {
        // console.log('🥳🥳🥳 ~~ WebVitals ~~ onFCP ~~ entry--->>>', entry)
        if(entry.name === MetricType.FCP) {
          const metric = {
            startTime: entry.startTime,
            entry
          }
          this.metrics.set(MetricType.FCP, metric)
          // console.log('initFCP', this.metrics.getValues())
        }
      }
    })
  }
  initLCP() {
    // NOTE 为何无法在界面加载完成之后直接获取呢，需要切换tab才行？
    // LCP需要与界面产生交互之后才会触发，或者转入后台再激活时才会触发
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
          // console.log('initLCP', this.metrics.getValues())
        }
      }
    }, {
      reportAllChanges: true
    })
  }
  initCLS() {
    // NOTE 转入后台再激活时才会触发
    onCLS((clsMetric) => {
      const {entries} = clsMetric
      console.log('🥳🥳🥳 ~~ WebVitals ~~ onCLS ~~ clsMetric--->>>', clsMetric)
      for(const entry of entries) {
        if(entry.entryType === 'layout-shift') {
          const metric = {
            startTime: entry.value,
            entry
          }
          this.metrics.set(MetricType.CLS, metric)
        }
      }
    },
    {
      reportAllChanges: true
    })
  }
  initFID() {
    onFID((fidMetric) => {
      console.log("✨✨🥰  ~ WebVitals ~ onFID ~ fidMetric--->>>", fidMetric)
      const {entries} = fidMetric
      for(const entry of entries) {
        if(entry.entryType === 'first-input') {
          console.log("✨✨🥰  ~ WebVitals ~ onFID ~ entry--->>>", entry)
          const delay = entry.processingStart - entry.startTime
          const metric = {
            delay,
            entry
          }
          this.metrics.set(MetricType.FID, metric)
        }
      }
    })
  }
  initNavigationTiming() {
    const navigationTiming = getNavigationTiming()
    const {
      fetchStart,
      domainLookupStart,
      domainLookupEnd,
      secureConnectionStart,
      connectStart,
      connectEnd,
      requestStart,
      responseStart,
      responseEnd,
      domInteractive,
      // domContentLoadedEventStart,
      domContentLoadedEventEnd,
      // domComplete,
      loadEventStart
    } = navigationTiming
    console.log('🥳🥳🥳 ~~ WebVitals ~~ initNavigationTiming ~~ navigationTiming--->>>', navigationTiming)
    const metric = {
      // 关键时间点
      FP: responseEnd - fetchStart, // 首屏渲染时间
      TTI: domInteractive - fetchStart, // 首次可交互时间
      DomReady: domContentLoadedEventEnd - fetchStart, // Dom加载完成的时间
      Load: loadEventStart - fetchStart, // dom和资源都加载完成的时间
      FirstByte: responseStart - domainLookupStart, // 第一个字节接收时间
      // 关键时间段
      DNS: domainLookupEnd - domainLookupStart, // 域名解析时间
      TCP: connectEnd - connectStart, // 建立TCP连接耗时
      SSL: connectEnd - (secureConnectionStart > 0 ? secureConnectionStart : connectStart), // 建立SSL安全连接耗时
      TTFB: responseStart - requestStart, // 请求响应耗时
      Trans: responseEnd - responseStart, // 请求内容传输耗时
      DOM: domInteractive - responseEnd, // dom解析耗时
      Res: loadEventStart - domContentLoadedEventEnd // 资源加载耗时
    }
    console.log('🥳🥳🥳 ~~ WebVitals ~~ initNavigationTiming ~~ metric--->>>', metric)
    this.metrics.set(MetricType.NT, metric)
    console.log('🥳🥳🥳 ~~ WebVitals ~~ initNavigationTiming ~~ this.metrics--->>>', this.metrics)
  }
  initResourceFlow() {
    const result: any = []
    // resource 
    const ob = observe('resource', (entry: PerformanceResourceTiming) => {
      const {
        name,
        transferSize,
        initiatorType,
        startTime,
        domainLookupStart,
        domainLookupEnd,
        connectStart,
        secureConnectionStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd
      } = entry
      result.push({
        name, // 资源地址
        transferSize, // 资源大小
        initiatorType, // 资源类型
        startTime, // 开始时间
        responseEnd, // 请求结束时间
        dnsLookup: domainLookupEnd - domainLookupStart, // dns解析
        initialConnect: connectEnd - connectStart,
        ssl: connectEnd - secureConnectionStart,
        request: responseStart - requestStart,
        ttfb: responseStart - requestStart, // 
        contentDownload: responseEnd - responseStart
      })
    })
    // console.log('🥳🥳🥳 ~~ WebVitals ~~ ob ~~ ob--->>>', ob)

    // NOTE 触发时机需要考虑一下
    window.addEventListener('pagehide', () => {
      if(ob) {
        ob.disconnect()
      }
      const metric = {
        entry: result
      }
      this.metrics.set(MetricType.RL, metric)
    })
  }

  // 何时上报
  report() {}
}

export default WebVitals