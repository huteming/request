import { AxiosInstance, AxiosRequestConfig } from 'axios'

export default function updateConfig(instance: AxiosInstance) {
  return (options: AxiosRequestConfig) => {
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
