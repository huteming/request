import { AskConfig, AskError, AskResponse } from '../createInstance'
import { defaultRequestConfig, defaultRequestHeaders } from './defaults'

/**
 * 统一创建错误返回
 */
export function createError(
  message: string,
  options: {
    config: AskConfig
    request?: any
    response?: AskResponse
    isCancel?: boolean
  },
): AskError {
  return {
    name: '自定义错误',
    message,
    ...options,
  }
}

/**
 * 合并默认配置，返回完整配置对象
 */
export function mergeDefaultConfig(options: AskConfig = {}): AskConfig {
  return {
    ...defaultRequestConfig,
    ...options,
    ...{
      headers: {
        ...defaultRequestHeaders,
        ...options.headers,
      },
    },
  }
}

function isFormData(data: any) {
  return data instanceof window.FormData
}

function isObject(data: any) {
  return data === Object(data)
}

/**
 * 数据格式转为 formData
 */
export const toFormData = (data: any) => {
  if (isFormData(data) || !isObject(data)) {
    return data
  }
  return Object.entries<any>(data).reduce((form, [key, value]) => {
    if (isFormData(value)) {
      form.append(key, value)
    } else if (isObject(value)) {
      form.append(key, JSON.stringify(value))
    } else {
      form.append(key, value)
    }
    return form
  }, new window.FormData())
}
