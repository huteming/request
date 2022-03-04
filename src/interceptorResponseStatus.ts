import axios, { AxiosError } from 'axios'
import { createError, getErrorMessage } from './utils'

type StatusValidator = number | ((status: number, erros: AxiosError) => boolean)

interface StatusHandler {
  (error: AxiosError): void | Promise<any>
}

export interface StatusHandlerRegister {
  (status: StatusValidator, handler: StatusHandler): void
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
