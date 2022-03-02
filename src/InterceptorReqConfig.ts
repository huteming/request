import { Ask, AskConfig } from './createInstance'

export default class InterceptorReqConfig {
  instance: Ask

  constructor(instance: Ask) {
    this.instance = instance
  }

  mergeHeaders = (headers: Record<string, string>) => {
    if (!this.instance.defaults.headers) {
      this.instance.defaults.headers = {}
    }
    const target = this.instance.defaults.headers
    Object.entries(headers).forEach(([key, value]) => {
      target[key] = value
    })
  }

  updateConfig = (options: AskConfig = {}) => {
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'headers') {
        this.mergeHeaders(value)
      } else {
        const target: any = this.instance.defaults
        target[key] = value
      }
    })
    return this.instance.defaults
  }

  interceptor = (config: AskConfig) => {
    return config
  }
}
