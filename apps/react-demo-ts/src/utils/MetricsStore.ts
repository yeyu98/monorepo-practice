export const enum MetricType { 
  FP = 'first-paint',
  FCP = 'first-contentful-paint',
  LCP = 'large-contentful-paint',
  FID = 'first-input-delay',
  CLS = 'cumulative-layout-shift',
  NT = 'navigation-timing',
  RL = 'resource-flow'
}
type MetricsKey = MetricType | 'string'

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
