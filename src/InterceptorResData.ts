import { Ask, AskResponse } from './createInstance'

export default class InterceptorResData {
  instance: Ask

  constructor(instance: Ask) {
    this.instance = instance
  }

  interceptor = (response: AskResponse) => {
    const {
      config: { isExtract },
    } = response

    const res = isExtract ? response.data.data : response
    return Promise.resolve(res)
  }
}
