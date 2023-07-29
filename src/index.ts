import defaultRequestConfig from './shared/defaults'
import { IAxiosInstance, IAxiosRequestConfig } from './types'
import createConfig from './shared/createConfig'
import createInstance from './shared/createInstance'
import createCodeValidater from './response/createCodeValidater'
import createDataInterceptor from './response/createDataInterceptor'
import createErrorInterceptor from './response/createErrorInterceptor'

export default function create(options?: IAxiosRequestConfig): IAxiosInstance {
  const config = createConfig(defaultRequestConfig, options)
  const instance = createInstance(config)

  // 注意 axios request 拦截器执行顺序: 倒序执行
  instance.interceptors.response.use(createCodeValidater())
  instance.interceptors.response.use(createDataInterceptor(), createErrorInterceptor())

  return instance
}
