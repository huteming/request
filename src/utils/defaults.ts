import qs from 'qs'
import { AskConfig } from '../createInstance'

export const defaultRequestConfig: AskConfig = {
  timeout: 10000,
  withCredentials: false,
  dataType: 'json',
  successCode: 200,
  isExtract: true, // 返回后端 data
  paramsSerializer: (params: Object) => {
    return qs.stringify(params, { indices: false })
  },
}

export const defaultRequestHeaders = {
  // 'Content-Type': 'application/x-www-form-urlencoded',
  'X-Requested-With': 'XMLHttpRequest',
}

export const defaultErrorMessage = '自定义错误消息'
