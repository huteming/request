import { AxiosResponse } from 'axios'
import { createError } from './utils'
import { defaultErrorMessage } from './defaults'

type CodeValidater = number | ((code: number) => boolean)

interface CodeHandler {
  (response: AxiosResponse): void | Promise<any>
}

export interface CodeHandlerRegister {
  (code: CodeValidater, handler: CodeHandler): void
}

export default function interceptorResponseCode() {
  const handlers = new Map<CodeValidater, CodeHandler[]>()

  const registCodeHandler = (
    validator: CodeValidater,
    handler: CodeHandler,
  ) => {
    /* istanbul ignore next */
    if (typeof handler !== 'function') {
      return
    }
    const originHandlers = handlers.get(validator)

    if (!originHandlers || !originHandlers.length) {
      handlers.set(validator, [handler])
      return
    }
    handlers.set(validator, [...originHandlers, handler])
  }

  const codeInterceptor = (response: AxiosResponse) => {
    // 不能接收 handler 的返回，因为每个处理函数需要 response 来判断是否处理
    let promise = Promise.resolve(response)

    handlers.forEach((handlers, validator) => {
      handlers.forEach(handler => {
        promise = promise.then(() => {
          const {
            data: { code },
          } = response
          const equal = code === validator
          const valid = typeof validator === 'function' && validator(code)
          /* istanbul ignore else */
          if (equal || valid) {
            return handler(response)
          }
        })
      })
    })

    // 判断是否为 successCode，异常就打断 promise
    promise = promise.then(() => {
      const {
        data: { code, message },
        config,
      } = response
      const { successCode } = config
      const equalSuccessCode = successCode === code
      const containSuccessCode =
        Array.isArray(successCode) && successCode.includes(code)
      if (equalSuccessCode || containSuccessCode) {
        return response
      }

      const customError = createError(message || defaultErrorMessage, {
        config,
        response,
        isCancel: false,
      })

      return Promise.reject(customError)
    })

    return promise
  }

  return {
    registCodeHandler,
    codeInterceptor,
  }
}
