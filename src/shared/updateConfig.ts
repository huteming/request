import { IAxiosInstance, IAxiosRequestConfig } from '../types'

export default function updateConfig(instance: IAxiosInstance) {
  return (options: IAxiosRequestConfig) => {
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'headers') {
        Object.assign(instance.defaults.headers, value)
      } else {
        const target: any = instance.defaults
        target[key] = value
      }
    })
    return instance.defaults
  }
}
