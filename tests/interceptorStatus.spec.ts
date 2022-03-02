import create from '../src'

describe('interceptorStatus', () => {
  it('自定义status处理器', async () => {
    const mockFn = jest.fn()
    const ins = create()
    ins.registStatusHandler(400, mockFn)
    try {
      await ins({
        url: '/status/400',
      })
      expect(false).toBeTruthy()
    } catch {
      expect(mockFn).toBeCalledTimes(1)
    }
  })

  it('自定义status处理器验证函数', async () => {
    const mockFn = jest.fn()
    const ins = create()
    ins.registStatusHandler((status) => status === 400, mockFn)
    try {
      await ins({
        url: '/status/400',
      })
      expect(false).toBeTruthy()
    } catch {
      expect(mockFn).toBeCalledTimes(1)
    }
  })

  it('自定义多个status处理器', async () => {
    const mockFn1 = jest.fn()
    const mockFn2 = jest.fn()
    const ins = create()
    ins.registStatusHandler(400, mockFn1)
    ins.registStatusHandler(400, mockFn2)
    try {
      await ins({
        url: '/status/400',
      })
      expect(false).toBeTruthy()
    } catch {
      expect(mockFn1).toBeCalledTimes(1)
      expect(mockFn2).toBeCalledTimes(1)
    }
  })
})
