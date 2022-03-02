import create from '../src'

describe('updateConfig', () => {
  it('创建实例后修改配置', async () => {
    const mockTimeout = 20
    const ins = create({
      isExtract: false,
      timeout: 10,
    })
    ins.updateConfig({
      timeout: mockTimeout,
    })
    const { config } = await ins({
      url: '/success',
    })
    expect(config.timeout).toEqual(mockTimeout)
    expect(ins.defaults.timeout).toEqual(mockTimeout)
  })

  it('创建实例后修改header配置', async () => {
    const ins = create({
      isExtract: false,
      headers: {
        a: 'a',
        b: 'b',
      },
    })
    ins.updateConfig({
      headers: {
        a: 'aa',
        c: 'c',
      },
    })
    const { config } = await ins({
      url: '/success',
    })
    expect(config.headers?.a).toEqual('aa')
    expect(config.headers?.b).toEqual('b')
    expect(config.headers?.c).toEqual('c')
    expect(ins.defaults.headers?.a).toEqual('aa')
  })
})
