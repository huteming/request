import qs from 'qs'
import { toFormData } from './utils'
import { Ask, AskConfig } from './createInstance'

export default class InterceptorReqBody {
  instance: Ask

  constructor(instance: Ask) {
    this.instance = instance
  }

  interceptor = (config: AskConfig) => {
    const { dataType } = config

    /* istanbul ignore if */
    if (!config.headers) {
      config.headers = {}
    }

    if (dataType === 'json') {
      config.headers['Content-Type'] = 'application/json'
    }
    // 如果是form类型，则进行qs序列化.
    if (dataType === 'form') {
      config.data = qs.stringify(config.data)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    // 如果是上传文件，则进行FormData转换.
    if (dataType === 'formdata') {
      config.data = toFormData(config.data)
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
  }
}
