import { AxiosResponse } from 'axios'
import { createError } from './utils'

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

    if (!response?.config?.disabledCodeHandlers) {
      handlers.forEach((handlers, validator) => {
        handlers.forEach((handler) => {
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
    }

    // 判断是否为 successCode，异常就打断 promise
    promise = promise.then(() => {
      const { data, config } = response
      const { successCode } = config
      const equalSuccessCode = successCode === data?.code
      const containSuccessCode =
        Array.isArray(successCode) && successCode.includes(data?.code)
      if (equalSuccessCode || containSuccessCode) {
        return response
      }

      // 这里 Error 的 message 异常信息一般用作控制台查看
      // 真正会弹窗提示的是 response 里的 message
      const customError = createError(
        data?.message || 'code 异常. 但 message 缺失',
        {
          config,
          response,
          isCancel: false,
        },
      )

      return Promise.reject(customError)
    })

    return promise
  }

  return {
    registCodeHandler,
    codeInterceptor,
  }
}
