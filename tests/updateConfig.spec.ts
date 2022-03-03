import create from '../src'

describe('updateConfig', () => {
  it('期望可以创建实例后修改配置', async () => {
    const changedTimeout = 20
    const changedHeaders = {
      a: 'changed',
      c: 'create',
    }
    const ins = create({
      responseOnlyData: false,
      timeout: 10,
      headers: {
        a: 'a',
        b: 'b',
      },
    })
    ins.updateConfig({
      timeout: changedTimeout,
      headers: changedHeaders,
    })
    const { config } = await ins.post('/success')

    expect(config.timeout).toEqual(changedTimeout)
    expect(config.headers?.a).toEqual('changed')
    expect(config.headers?.b).toEqual('b')
    expect(config.headers?.c).toEqual('create')
  })
})
