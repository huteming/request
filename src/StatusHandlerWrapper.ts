import {
  AskError,
  Status,
  StatusHandler,
  StatusHandlerRegister,
} from './createInstance'

export default class StatusHandlerWrapper {
  handlers: Map<Status, StatusHandler[]>

  constructor() {
    this.handlers = new Map()
  }

  regist: StatusHandlerRegister = (status, handler) => {
    /* istanbul ignore next */
    if (typeof handler !== 'function') {
      return
    }
    const originHandlers = this.handlers.get(status)

    // 不存在处理器，直接新增
    if (!originHandlers || !originHandlers.length) {
      this.handlers.set(status, [handler])
      return
    }
    this.handlers.set(status, [...originHandlers, handler])
  }

  run = (error: AskError, status?: number) => {
    /* istanbul ignore if */
    if (!status) {
      return
    }
    this.handlers.forEach((handlers, validate) => {
      const equal = status === validate
      const valid = typeof validate === 'function' && validate(status, error)
      /* istanbul ignore else */
      if (equal || valid) {
        handlers.forEach((handler) => handler(error))
      }
    })
  }
}
