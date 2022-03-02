import create from '../src'

describe('responseError', () => {
  it('code异常，message优先显示响应中的message', async () => {
    const ins = create()

    try {
      await ins({
        url: '/code/600',
      })
      expect(false).toBeTruthy()
    } catch (err: any) {
      expect(err.message).toEqual('error: code 600')
    }
  })

  it('status异常，message优先显示响应中的message', async () => {
    const ins = create()
    try {
      await ins({
        url: '/status/400',
      })
      expect(false).toBeTruthy()
    } catch (err: any) {
      expect(err.message).toEqual('error: status 400')
    }
  })
})
