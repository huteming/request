import create from '../src'

describe('interceptorCode', () => {
  it('默认正常code为200', async () => {
    const ins = create({
      isExtract: false,
    })
    const res = await ins({
      url: '/code/200',
    })
    expect(res.data.code).toEqual(200)
  })

  it('自定义正常响应的code', async () => {
    const ins = create({
      isExtract: false,
    })
    const res = await ins({
      url: '/code/600',
      successCode: [600],
    })
    expect(res.data.code).toEqual(600)
  })

  it('自定义code处理器', async () => {
    const mockFn = jest.fn()
    const ins = create()
    ins.registCodeHandler(600, mockFn)
    try {
      await ins({
        url: '/code/600',
      })
      expect(false).toBeTruthy()
    } catch (err) {
      expect(mockFn).toBeCalledTimes(1)
    }
  })

  it('自定义code处理器的验证函数', async () => {
    const mockFn = jest.fn()
    const ins = create()
    ins.registCodeHandler((code) => {
      return code === 600
    }, mockFn)
    try {
      await ins({
        url: '/code/600',
      })
      expect(false).toBeTruthy()
    } catch (err) {
      expect(mockFn).toBeCalledTimes(1)
    }
  })

  it('自定义多个code处理器', async () => {
    const mockFn1 = jest.fn()
    const mockFn2 = jest.fn()
    const ins = create()
    ins.registCodeHandler(600, mockFn1)
    ins.registCodeHandler(600, mockFn2)

    try {
      await ins({
        url: '/code/600',
      })
      expect(false).toBeTruthy()
    } catch (err) {
      expect(mockFn1).toBeCalledTimes(1)
      expect(mockFn2).toBeCalledTimes(1)
    }
  })
})
