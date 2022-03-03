import axios, { AxiosError } from 'axios'
import { createError } from './utils'

type StatusValidator = number | ((status: number, erros: AxiosError) => boolean)

interface StatusHandler {
  (error: AxiosError): void | Promise<any>
}

export interface StatusHandlerRegister {
  (status: StatusValidator, handler: StatusHandler): void
}

function getErrorMessage(error: AxiosError): string {
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

export default function interceptorResponseStatus() {
  const handlers = new Map<StatusValidator, StatusHandler[]>()

  const registStatusHandler = (
    validator: StatusValidator,
    handler: StatusHandler,
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

  const statusInterceptor = (error: AxiosError) => {
    let promise = Promise.resolve(error)

    if (!error?.config?.disabledStatusHandlers) {
      handlers.forEach((handlers, validator) => {
        handlers.forEach(handler => {
          promise = promise.then(() => {
            const { response } = error
            const { status } = response || { status: NaN }
            const equal = status === validator
            const valid =
              typeof validator === 'function' && validator(status, error)
            /* istanbul ignore else */
            if (equal || valid) {
              return handler(error)
            }
          })
        })
      })
    }

    promise = promise.then(() => {
      const { response, config, request } = error
      const message = getErrorMessage(error)

      const customError = createError(message, {
        config,
        request,
        response,
        isCancel: axios.isCancel(error),
      })

      return Promise.reject(customError)
    })

    return promise
  }

  return {
    registStatusHandler,
    statusInterceptor,
  }
}
