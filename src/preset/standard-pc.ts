import { notification, message } from 'antd'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getErrorMessage } from '../utils'

function toLogin(win: Window) {
  const local = win.location
  local.assign(`${local.origin}/data-platform/login?redirect=${local.href}`)
}

function isProduction() {
  return window.location.hostname.includes('caocaokeji')
}

// 重定向登录
// 注意, 此方法已同步到 bigdata-ui/utils 中, 修改时注意同步
function redirectToLogin() {
  // 在容器内, 将容器地址重定向
  const inIframe = window.parent !== window.self
  if (inIframe && window.top) {
    toLogin(window.top)
    return
  }
  // 单独标签页 && 线上环境，重定向
  if (isProduction()) {
    toLogin(window)
    return
  }
}

/**
 * 1. 开发的错误，用 notification
 * 2. 用户使用时的错误，用 message
 * 3. code 错误，是经过服务端包装的，所以可以很简单的处理：
 *      异常 code，就取 data.message 做提示，不需要客户端自定义信息
 * 4. status 错误，防止敏感信息泄漏，做自定义错误信息（可以持续完善）
 */
const commonHandlers = new Map([
  [
    401,
    function handle401() {
      message.error('请重新登录')
      redirectToLogin()
    },
  ],
])

const statusHandlers = new Map([
  ...commonHandlers,
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

const codeHandlers = new Map([...commonHandlers])

export default function presetStandardPC(instance: AxiosInstance) {
  const successCode = [0, 200]

  instance.updateConfig({
    successCode,
  })

  codeHandlers.forEach((handler, code) => {
    instance.registCodeHandler(code, handler)
  })

  statusHandlers.forEach((handler, status) => {
    instance.registStatusHandler(status, handler)
  })

  instance.registCodeHandler(
    (code) => {
      return ![...successCode, ...codeHandlers.keys()].includes(code)
    },
    (response) => {
      const { data } = response
      message.error(data?.message || 'code 异常')
    },
  )

  instance.registStatusHandler(
    (status) => {
      return ![...statusHandlers.keys()].includes(status)
    },
    (error) => {
      message.error(getErrorMessage(error))
    },
  )
}
