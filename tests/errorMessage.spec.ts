import create from '../src'

describe('errorMessage', () => {
  it('code 异常, 期望显示响应中的 message', async () => {
    const ins = create({
      validateCode: (code) => code === 200,
    })

    try {
      await ins({
        url: '/code/500',
      })
      expect(false).toBeTruthy()
    } catch (err: any) {
      expect(err.message).toEqual('code is: 500')
    }
  })

  it('code 异常, 响应中没有 message, 期望不会重置为其他默认值', async () => {
    const ins = create({
      validateCode: (code) => code === 200,
    })

    try {
      await ins({
        url: '/code/400',
      })
      expect(false).toBeTruthy()
    } catch (err: any) {
      expect(err.message).toEqual(null)
    }
  })

  it('status 异常, 期望优先显示响应中的 message', async () => {
    const ins = create()
    try {
      await ins({
        url: '/status/500',
      })
      expect(false).toBeTruthy()
    } catch (err: any) {
      expect(err.message).toEqual('status is: 500')
    }
  })

  it('status 异常, 响应中没有 message, 期望使用 error 中的 message', async () => {
    const ins = create()

    try {
      await ins({
        url: '/status/400',
      })
      expect(false).toBeTruthy()
    } catch (err: any) {
      expect(err.message).toEqual('Request failed with status code 400')
    }
  })
})
