import create from '../src'
import { defaultErrorMessage } from '@/defaults'

describe('responseErrorMessage', () => {
  it('code 异常, 期望优先显示响应中的 message', async () => {
    const ins = create()

    try {
      await ins({
        url: '/code/600',
      })
      throw new Error('期望异常')
    } catch (err: any) {
      expect(err.message).toEqual('error: code 600')
    }
  })

  it('code 异常, 响应中没有 message, 使用默认提示', async () => {
    const ins = create()

    try {
      await ins({
        url: '/error/code/noMessage',
      })
      throw new Error('期望异常')
    } catch (err: any) {
      expect(err.message).toEqual(defaultErrorMessage)
    }
  })

  it('status异常, 优先显示响应中的 message', async () => {
    const ins = create()
    try {
      await ins({
        url: '/status/400',
      })
      throw new Error('期望异常')
    } catch (err: any) {
      expect(err.message).toEqual('error: status 400')
    }
  })

  it('status 异常, 响应中没有 message, 使用 error 中的 message', async () => {
    const ins = create()

    try {
      await ins({
        url: '/error/status/noMessage',
      })
      throw new Error('期望异常')
    } catch (err: any) {
      expect(err.message).toEqual('Request failed with status code 400')
    }
  })
})
