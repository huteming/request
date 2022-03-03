import create from '@/index'

describe('interceptorResponseCode', () => {
  it('期望默认 successCode 为 200', async () => {
    const ins = create({
      responseOnlyData: false,
    })
    const { data } = await ins({
      url: '/code/200',
    })
    expect(data.code).toEqual(200)
  })

  it('支持自定义 successCode', async () => {
    const ins = create({
      responseOnlyData: false,
    })
    const { data } = await ins({
      url: '/code/600',
      successCode: [600],
    })
    expect(data.code).toEqual(600)
  })

  it('支持定义 code 处理器', async () => {
    const mockFn = jest.fn()
    const ins = create()
    ins.registCodeHandler(600, mockFn)
    try {
      await ins({
        url: '/code/600',
      })
      throw new Error('期望异常')
    } catch (err) {
      expect(mockFn).toHaveBeenCalledTimes(1)
    }
  })

  it('支持定义 code 处理器的验证函数', async () => {
    const mockFn = jest.fn()
    const ins = create()
    ins.registCodeHandler((code) => {
      return code === 600
    }, mockFn)
    try {
      await ins({
        url: '/code/600',
      })
      throw new Error('期望异常')
    } catch (err) {
      expect(mockFn).toHaveBeenCalledTimes(1)
    }
  })

  it('支持定义多个 code 处理器', async () => {
    const mockFn1 = jest.fn()
    const mockFn2 = jest.fn()
    const mockFn3 = jest.fn()
    const ins = create()
    ins.registCodeHandler(600, mockFn1)
    ins.registCodeHandler(600, mockFn2)
    ins.registCodeHandler(700, mockFn3)

    try {
      await ins({
        url: '/code/600',
      })
      throw new Error('期望异常')
    } catch (err) {
      expect(mockFn1).toHaveBeenCalledTimes(1)
      expect(mockFn2).toHaveBeenCalledTimes(1)
      expect(mockFn3).toHaveBeenCalledTimes(0)
    }
  })

  it('支持异步的 code 处理器', async () => {
    const mockFn1 = jest.fn().mockImplementation(() => Promise.resolve(1))
    const mockFn2 = jest.fn().mockImplementation(() => Promise.resolve(2))
    const mockFn3 = jest.fn().mockImplementation(() => Promise.resolve(3))

    const ins = create()
    ins.registCodeHandler(600, mockFn1)
    ins.registCodeHandler(600, mockFn2)
    ins.registCodeHandler(700, mockFn3)
    try {
      await ins({
        url: '/code/600',
      })
      throw new Error('期望异常')
    } catch (err) {
      expect(mockFn1).toHaveBeenCalledTimes(1)
      expect(mockFn2).toHaveBeenCalledTimes(1)
      expect(mockFn3).toHaveBeenCalledTimes(0)
    }
  })
})
