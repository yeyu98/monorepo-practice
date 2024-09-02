// 以用户体验为中心的指标：首屏渲染、首屏有意义内容渲染、最大有意义内容渲染、累积布局偏移、首次输入延迟
// 以技术为中心的指标
// 资源加载耗时
export const enum WebMetricType { 
  FP = 'first-paint',
  FCP = 'first-contentful-paint',
  LCP = 'largest-contentful-paint',
  CLS = 'cumulative-layout-shift',
  FID = 'first-input-delay',
  NT = 'navigation-timing',
  RL = 'resource-flow'
}

// 页面信息
// 路由跳转
// PV UV统计 PV当页面加载之后立即上报无需存储
// 点击事件
// 自定义事件
// HTTP请求
export const enum UserMetricType { 
  PI = 'page-information',
  RCR ='route-change-record',
  CBR = 'click-behavior-record',
  CDR = 'custom-define-record',
  HR = 'http-record'
}

// 用户访问来路
// 页面停留时间
// UserAgent解析
// IP解析


export const enum UserMetricType {}
type MetricsKey = WebMetricType | UserMetricType | 'string'

export class MetricsStore {
  state = new Map<MetricsKey, any>()
  get(key: MetricsKey) {
    return this.state.get(key)
  }
  set(key: MetricsKey, value: any) { 
    this.state.set(key, value)
  }
  add(key: MetricsKey, value: any) {
    const currentValue = this.get(key)
    this.set(key, {
      ...currentValue,
      ...value
    })
  }
  remove(key: MetricsKey) {
    this.state.delete(key)
  }
  getValues() {
    return Object.fromEntries(this.state)
  }
  clear() {
    this.state.clear()
  }
}
