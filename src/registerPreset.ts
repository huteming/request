import { AxiosInstance, AxiosRequestConfig } from 'axios'

export default (instance: AxiosInstance, config: AxiosRequestConfig) => {
  const { preset } = config

  if (!preset) {
    return
  }

  preset.forEach((register) => {
    register(instance, config)
  })
}
