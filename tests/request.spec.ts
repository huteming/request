import create from '../src'
import { successData } from './server'
import qs from 'qs'

describe('request', () => {
  it('默认返回data', async () => {
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
    expect(res).toStrictEqual(successData)
  })

  it('get', async () => {
    const ins = create()
    const mockData = { a: 'a' }
    const { config, data } = await ins.get('/success', mockData, {
      isExtract: false,
    })
    expect(data.data).toStrictEqual(successData)
    expect(config.params).toStrictEqual(mockData)
  })

  it('delete', async () => {
    const mockData = { a: 'a' }
    const ins = create()
    const { config, data } = await ins.delete('/success', mockData, {
      isExtract: false,
    })
    expect(data.data).toStrictEqual(successData)
    expect(config.data).toEqual(JSON.stringify(mockData))
  })

  it('post', async () => {
    const ins = create()
    const res = await ins.post('/success')
    expect(res).toStrictEqual(successData)
  })

  it('put', async () => {
    const ins = create()
    const data = await ins.put('/success')
    expect(data).toStrictEqual(successData)
  })

  it('请求类型为json，自动添加headers', async () => {
    const ins = create()
    const { config } = await ins.post(
      '/success',
      {},
      {
        dataType: 'json',
        isExtract: false,
      },
    )
    expect(config.headers['Content-Type']).toEqual('application/json')
  })

  it('请求类型为form，自动添加headers和格式化数据', async () => {
    const ins = create()
    const mockBody = {
      a: {
        b: 'b',
      },
    }
    const { config } = await ins.post('/success', mockBody, {
      dataType: 'form',
      isExtract: false,
    })
    expect(config.headers['Content-Type']).toEqual(
      'application/x-www-form-urlencoded',
    )
    expect(config.data).toEqual(qs.stringify(mockBody))
  })

  it('请求类型为formdata，自动添加headers和格式化数据', async () => {
    const ins = create()
    const res = await ins.post(
      '/success',
      {
        a: 'a',
      },
      {
        dataType: 'formdata',
        isExtract: false,
      },
    )
    // expect(res.config.headers['Content-Type']).toEqual('multipart/form-data')
    expect(res.config.data instanceof window.FormData).toBeTruthy()
    expect(res.config.data.get('a')).toEqual('a')
  })
})
