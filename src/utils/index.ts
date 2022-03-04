import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export function getErrorMessage(error: AxiosError): string {
  const { response, message } = error

  // 优先选择 response 中的消息
  if (response?.data?.message) {
    return response.data.message
  }
  /* istanbul ignore next */
  if (message.toLowerCase().includes('timeout')) {
    return '请求接口超时! '
  }
  /* istanbul ignore next */
  if (message.toLowerCase().includes('network')) {
    return '网络错误, 请稍后再试! '
  }
  return message || '网络繁忙, 请稍后再试! '
}

/**
 * 统一创建错误返回
 */
export function createError(
  message: string,
  options: {
    config: AxiosRequestConfig
    request?: any
    response?: AxiosResponse
    isCancel: boolean
  },
) {
  return {
    name: '自定义错误',
    message,
    ...options,
  }
}

/**
 * 合并默认配置，返回完整配置对象
 */
export function mergeAxiosConfig(
  defaults: AxiosRequestConfig = {},
  options: AxiosRequestConfig = {},
): AxiosRequestConfig {
  return {
    ...defaults,
    ...options,
    ...{
      headers: {
        ...defaults.headers,
        ...options.headers,
      },
    },
  }
}

const toString = Object.prototype.toString

function isFormData(data: any) {
  return toString.call(data) === '[object FormData]'
}

function isObject(data: any) {
  return data !== null && typeof data === 'object'
}

function isFile(data: any) {
  return toString.call(data) === '[object File]'
}

/**
 * 数据格式转为 formData
 */
export const toFormData = (data: any) => {
  if (isFormData(data) || !isObject(data)) {
    return data
  }
  return Object.entries<any>(data).reduce((form, [key, value]) => {
    if (isObject(value) && !isFile(value)) {
      form.append(key, JSON.stringify(value))
    } else {
      form.append(key, value)
    }
    return form
  }, new window.FormData())
}
