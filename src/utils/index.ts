import { AxiosRequestConfig, AxiosResponse } from 'axios'

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
