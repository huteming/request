import { IAxiosRequestConfig, IAxiosResponse, ICustomError } from '../types'

/**
 * 统一创建错误对象
 */
function createError(
  status: number | undefined,
  code: number | undefined,
  message: string | undefined,
  request?: IAxiosRequestConfig,
  response?: IAxiosResponse,
): ICustomError {
  return {
    isCustomError: true,
    name: '自定义错误',
    status,
    code,
    message,
    request,
    response,
  }
}

export default createError
