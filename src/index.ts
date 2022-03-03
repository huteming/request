import { AxiosRequestConfig } from 'axios'
import createInstance from './createInstance'
import interceptorResponseData from './interceptorResponseData'
import interceptorResponseCode from './interceptorResponseCode'
import interceptorResponseStatus from './interceptorResponseStatus'
import registerPreset from './registerPreset'
import updateConfig from './updateConfig'
import { mergeAxiosConfig } from './utils'
import { defaultRequestConfig } from './defaults'
import AxiosInstance from '../types/index'

export default function create(options?: AxiosRequestConfig): AxiosInstance {
  const config = mergeAxiosConfig(defaultRequestConfig, options)
  const instance = createInstance(config)
  const { codeInterceptor, registCodeHandler } = interceptorResponseCode()
  const { statusInterceptor, registStatusHandler } = interceptorResponseStatus()

  // 注册拦截器, 注意 axios request 拦截器执行顺序: 倒序执行
  instance.interceptors.response.use(codeInterceptor, statusInterceptor)
  instance.interceptors.response.use(interceptorResponseData())

  // 注册扩展函数
  instance.updateConfig = updateConfig(instance)
  instance.registCodeHandler = registCodeHandler
  instance.registStatusHandler = registStatusHandler

  // 注册预设值
  registerPreset(instance, config)

  return instance
}
