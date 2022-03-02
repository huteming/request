import createInstance from './createInstance'
import type { AskConfig } from './createInstance'
import registerPreset from './registerPreset'
import InterceptorReqConfig from './InterceptorReqConfig'
import InterceptorResData from './InterceptorResData'
import InterceptorCode from './InterceptorCode'
import InterceptorStatus from './InterceptorStatus'
import InterceptorReqBody from './InterceptorReqBody'
import { mergeDefaultConfig } from './utils'
import CodeHandlerWrapper from './CodeHandlerWrapper'
import StatusHandlerWrapper from './StatusHandlerWrapper'

export default function create(options?: AskConfig) {
  const config = mergeDefaultConfig(options)
  const instance = createInstance(config)
  const codeHandler = new CodeHandlerWrapper()
  const statusHandler = new StatusHandlerWrapper()

  // 用于动态修改配置
  const interceptorReqConfig = new InterceptorReqConfig(instance)
  const interceptorReqBody = new InterceptorReqBody(instance)
  const interceptorResData = new InterceptorResData(instance)
  const interceptorCode = new InterceptorCode(instance, codeHandler)
  const interceptorStatus = new InterceptorStatus(instance, statusHandler)

  // 注册拦截器
  // 注意 axios request 拦截器执行顺序: 倒序执行
  instance.interceptors.request.use(interceptorReqBody.interceptor)
  instance.interceptors.request.use(interceptorReqConfig.interceptor)

  instance.interceptors.response.use(
    interceptorCode.interceptor,
    interceptorStatus.interceptor,
  )
  instance.interceptors.response.use(interceptorResData.interceptor)

  // 注册扩展函数
  instance.updateConfig = interceptorReqConfig.updateConfig
  instance.registCodeHandler = codeHandler.regist
  instance.registStatusHandler = statusHandler.regist

  // 注册预设值
  registerPreset(instance, config)

  return instance
}
