import axios from 'axios'
import { createError } from './utils'
import StatusHandlerWrapper from './StatusHandlerWrapper'
import { Ask, AskError } from './createInstance'

function getErrorMessage(error: AskError<any>): string {
  const { response, message } = error

  // 优先选择 response 中的消息
  if (response?.data?.message) {
    return response.data.message as string
  }
  /* istanbul ignore next */
  if (!message) {
    return '网络繁忙，请稍后再试！'
  }
  /* istanbul ignore next */
  if (message.includes('timeout')) {
    return '请求接口超时！'
  }
  /* istanbul ignore next */
  if (message.includes('Network')) {
    return '网络错误，请稍后再试！'
  }
  return message
}

export default class InterceptorStatus {
  instance: Ask
  statusHandler: StatusHandlerWrapper

  constructor(instance: Ask, statusHandler: StatusHandlerWrapper) {
    this.instance = instance
    this.statusHandler = statusHandler
  }

  interceptor = (error: AskError) => {
    const { response, config } = error
    const message = getErrorMessage(error)

    const customError = createError(message, {
      config,
      response,
      isCancel: axios.isCancel(error),
    })

    // status 处理器
    this.statusHandler.run(customError, response?.status)

    return Promise.reject(customError)
  }
}
