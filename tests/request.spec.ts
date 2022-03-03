import create from '../src'
import { successData } from './setupFiles/server'

describe('request', () => {
  it('期望默认只返回 response 中的 data', async () => {
    const ins = create()
    const res = await ins({
      url: '/success',
    })
    expect(res).toEqual(successData)
  })

  it('request', async () => {
    const ins = create()
    const res = await ins({
      url: '/success',
    })
    expect(res).toEqual(successData)
  })

  it('get', async () => {
    const ins = create()
    const mockData = { a: 'a' }
    const { config, data } = await ins.get('/success', mockData, {
      responseOnlyData: false,
    })
    expect(data.data).toEqual(successData)
    expect(config.params).toEqual(mockData)
  })

  it('delete', async () => {
    const mockData = { a: 'a' }
    const ins = create()
    const { config, data } = await ins.delete('/success', mockData, {
      responseOnlyData: false,
    })
    expect(data.data).toEqual(successData)
    expect(config.data).toEqual(JSON.stringify(mockData))
  })

  it('post', async () => {
    const ins = create()
    const mockData = { a: 'a' }
    const { config, data } = await ins.post('/success', mockData, {
      responseOnlyData: false,
    })
    expect(data.data).toEqual(successData)
    expect(config.data).toEqual(JSON.stringify(mockData))
  })

  it('put', async () => {
    const ins = create()
    const mockData = { a: 'a' }
    const { config, data } = await ins.put('/success', mockData, {
      responseOnlyData: false,
    })
    expect(data.data).toEqual(successData)
    expect(config.data).toEqual(JSON.stringify(mockData))
  })

  it('postFormData', async () => {
    const ins = create()
    const mockData = { a: 'a' }
    const { config, data } = await ins.postFormData('/success', mockData, {
      responseOnlyData: false,
    })
    expect(data.data).toEqual(successData)
    expect(config.method).toEqual('post')
    expect(config.data.get('a')).toEqual('a')
  })

  it('期望默认的请求体类型为 application/json', async () => {
    const ins = create()
    const { config } = await ins.post(
      '/success',
      {},
      {
        responseOnlyData: false,
      },
    )
    expect(config.headers?.['Content-Type']).toEqual('application/json')
  })
})
