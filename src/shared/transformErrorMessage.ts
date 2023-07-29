import { ICustomDataWrapper } from '../types'
import { AxiosError } from 'axios'

export default function transformErrorMessage(error: AxiosError<ICustomDataWrapper>): string {
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
