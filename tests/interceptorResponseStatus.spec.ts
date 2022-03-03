import create from '@/index'

describe('interceptorResponseStatus', () => {
  it('支持自定义 status 处理器', async () => {
    const mockFn1 = jest.fn()
    const mockFn2 = jest.fn()
    const mockFn3 = jest.fn()
    const ins = create()
    ins.registStatusHandler(400, mockFn1)
    ins.registStatusHandler(400, mockFn2)
    ins.registStatusHandler(500, mockFn3)
    try {
      await ins({
        url: '/status/400',
      })
      throw new Error('期望异常')
    } catch {
      expect(mockFn1).toHaveBeenCalledTimes(1)
      expect(mockFn2).toHaveBeenCalledTimes(1)
      expect(mockFn3).toHaveBeenCalledTimes(0)
    }
  })

  it('支持自定义 status 处理器验证函数', async () => {
    const mockFn1 = jest.fn()
    const mockFn2 = jest.fn()
    const mockFn3 = jest.fn()
    const ins = create()
    ins.registStatusHandler((status) => status === 400, mockFn1)
    ins.registStatusHandler((status) => status === 400, mockFn2)
    ins.registStatusHandler((status) => status === 500, mockFn3)
    try {
      await ins({
        url: '/status/400',
      })
      throw new Error('期望异常')
    } catch {
      expect(mockFn1).toHaveBeenCalledTimes(1)
      expect(mockFn2).toHaveBeenCalledTimes(1)
      expect(mockFn3).toHaveBeenCalledTimes(0)
    }
  })

  it('支持自定义异步 status 处理器', async () => {
    const mockFn1 = jest.fn().mockImplementation(() => Promise.resolve(1))
    const mockFn2 = jest.fn().mockImplementation(() => Promise.resolve(1))
    const mockFn3 = jest.fn().mockImplementation(() => Promise.resolve(1))
    const ins = create()
    ins.registStatusHandler(400, mockFn1)
    ins.registStatusHandler(400, mockFn2)
    ins.registStatusHandler(500, mockFn3)
    try {
      await ins({
        url: '/status/400',
      })
      throw new Error('期望异常')
    } catch {
      expect(mockFn1).toHaveBeenCalledTimes(1)
      expect(mockFn2).toHaveBeenCalledTimes(1)
      expect(mockFn3).toHaveBeenCalledTimes(0)
    }
  })

  it('支持禁用 status 处理器', async () => {
    const mockFn1 = jest.fn().mockImplementation(() => Promise.resolve(1))
    const ins = create()
    ins.registStatusHandler(400, mockFn1)
    try {
      await ins({
        url: '/status/400',
        disabledStatusHandlers: true,
      })
      throw new Error('期望异常')
    } catch {
      expect(mockFn1).toHaveBeenCalledTimes(0)
    }
  })
})
