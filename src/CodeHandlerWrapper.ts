import {
  AskResponse,
  Code,
  CodeHandler,
  CodeHandlerRegister,
} from './createInstance'

export default class CodeHandlerWrapper {
  handlers: Map<Code, CodeHandler[]>

  constructor() {
    this.handlers = new Map()
  }

  regist: CodeHandlerRegister = (code, handler) => {
    /* istanbul ignore next */
    if (typeof handler !== 'function') {
      return
    }
    const originHandlers = this.handlers.get(code)

    if (!originHandlers || !originHandlers.length) {
      this.handlers.set(code, [handler])
      return
    }
    this.handlers.set(code, [...originHandlers, handler])
  }

  run = (response: AskResponse, code?: number) => {
    /* istanbul ignore if */
    if (!code) {
      return
    }
    this.handlers.forEach((handlers, validate) => {
      const equal = code === validate
      const valid = typeof validate === 'function' && validate(code)
      /* istanbul ignore else */
      if (equal || valid) {
        handlers.forEach((handle) => handle(response))
      }
    })
  }
}
