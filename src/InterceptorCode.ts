import CodeHandlerWrapper from './CodeHandlerWrapper'
import { createError } from './utils'
import { defaultErrorMessage } from './utils/defaults'
import { Ask, AskResponse } from './createInstance'

export default class InterceptorCode {
  instance: Ask
  codeHandler: CodeHandlerWrapper

  constructor(instance: Ask, codeHandler: CodeHandlerWrapper) {
    this.instance = instance
    this.codeHandler = codeHandler
  }

  interceptor = (response: AskResponse) => {
    const {
      data: { code },
      config,
    } = response
    const { successCode } = config

    // code 处理器
    this.codeHandler.run(response, code)

    // code 在正常范围内
    const equalSuccessCode = successCode === code
    const containSuccessCode =
      Array.isArray(successCode) && successCode.includes(code)
    if (equalSuccessCode || containSuccessCode) {
      return Promise.resolve(response)
    }

    const customError = createError(
      response.data.message || defaultErrorMessage,
      {
        config,
        response,
      },
    )
    return Promise.reject(customError)
  }
}
