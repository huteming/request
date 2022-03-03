import { notification, message } from 'antd'
import { AxiosInstance, AxiosRequestConfig } from 'axios'

/**
 * 1. 开发的错误，用 notification
 * 2. 用户使用时的错误，用 message
 * 3. code 错误，是经过服务端包装的，所以可以很简单的处理：
 *      异常 code，就取 data.message 做提示，不需要客户端自定义信息
 * 4. status 错误，防止敏感信息泄漏，做自定义错误信息（可以持续完善）
 */
const statusHandlers = new Map([
  [
    400,
    function handle400({ config }: { config: AxiosRequestConfig }) {
      notification.error({
        message: '请求参数错误',
        description: config.url,
        duration: 6,
      })
    },
  ],
  [
    401,
    function handle401() {
      message.error('请重新登录')

      // 在乾坤容器内, 将容器地址重定向
      const inIframe = window.parent !== window.self
      if (inIframe) {
        const redirect = window.top!.location.href
        window.top!.location.assign(
          `${
            window.top!.location.origin
          }/data-platform/login?redirect=${redirect}`,
        )
        return
      }
      // 单独标签页打开 & 不是开发环境，直接重定向
      const validHost = window.location.hostname.includes('caocaokeji')
      if (validHost) {
        const redirect = window.location.href
        window.location.assign(
          `${window.location.origin}/data-platform/login?redirect=${redirect}`,
        )
        return
      }
    },
  ],
  [
    402,
    function handle402() {
      message.error('token已过期')
    },
  ],
  [
    403,
    function handle403() {
      message.error('无数据权限')
    },
  ],
  [
    404,
    function handle404({ config }: { config: AxiosRequestConfig }) {
      notification.error({
        message: '接口地址不存在',
        description: config.url,
        duration: 6,
      })
    },
  ],
  [
    405,
    function handle405({ config }: { config: AxiosRequestConfig }) {
      notification.error({
        message: '暂不支持该方法',
        description: config.url,
        duration: 6,
      })
    },
  ],
  [
    500,
    function handle500() {
      message.error('服务器异常，请稍后重试')
    },
  ],
])

export default function presetStandardPC(instance: AxiosInstance) {
  const successCode = [0, 200]

  instance.updateConfig({
    successCode,
  })

  statusHandlers.forEach((handler, code) => {
    instance.registStatusHandler(code, handler)
  })

  instance.registCodeHandler(
    code => {
      return !successCode.includes(code)
    },
    response => {
      const {
        data: { message: msg },
      } = response
      message.error(msg || 'code 异常, 但 message 缺失')
    },
  )

  instance.registStatusHandler(
    status => {
      return ![...statusHandlers.keys()].includes(status)
    },
    error => {
      const { response, message: msg } = error
      message.error(response?.data?.message || msg)
    },
  )
}
