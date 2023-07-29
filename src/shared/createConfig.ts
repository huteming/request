import { IAxiosRequestConfig } from '../types'

/**
 * 合并默认配置，返回完整配置对象
 */
function createConfig(defaults: IAxiosRequestConfig, options: IAxiosRequestConfig | undefined): IAxiosRequestConfig {
  return {
    ...defaults,
    ...options,
    ...{
      headers: {
        ...defaults.headers,
        ...options?.headers,
      },
    },
  }
}

export default createConfig
