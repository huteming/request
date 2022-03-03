import { AxiosInstance, AxiosRequestConfig } from 'axios'
import createInstance from './createInstance'
import interceptorResponseData from './interceptorResponseData'
import interceptorResponseCode, {
  CodeHandlerRegister,
} from './interceptorResponseCode'
import interceptorResponseStatus, {
  StatusHandlerRegister,
} from './interceptorResponseStatus'
import registerPreset from './registerPreset'
import updateConfig from './updateConfig'
import { mergeAxiosConfig } from './utils'
import { defaultRequestConfig } from './defaults'

interface Preset {
  (instance: AxiosInstance, config: AxiosRequestConfig): void
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    successCode?: number | number[]
    responseOnlyData?: boolean
    preset?: Preset[]
  }

  export interface AxiosInstance {
    // 类型从 post 复制而来
    get<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<R>
    delete<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<R>

    postFormData: Axios['post']
    updateConfig: (config: AxiosRequestConfig) => void
    registCodeHandler: CodeHandlerRegister
    registStatusHandler: StatusHandlerRegister
  }
}

export default function create(options?: AxiosRequestConfig) {
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
