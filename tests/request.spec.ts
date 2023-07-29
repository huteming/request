import create from '../src'
import { successData } from './shared/constants'

describe('request', () => {
  it('[default]: 期望只返回 response 中的 data', async () => {
    const ins = create()
    const res = await ins({
      url: '/success',
    })
    expect(res).toEqual(successData)
  })

  it('[default]: 期望请求体类型为 application/json', async () => {
    const ins = create()
    const { config } = await ins({
      url: '/success',
      method: 'post',
      onlyReturnData: false,
    })
    expect(config.headers?.['Accept']).toContain('application/json')
  })

  it('期望 get 参数顺序重写为和 post 一致', async () => {
    const ins = create()
    const mockParams = { a: 'a' }
    const { config, data } = await ins.get('/success', mockParams, {
      onlyReturnData: false,
    })
    expect(data.data).toEqual(successData)
    expect(config.params).toEqual(mockParams)
  })

  it('期望 delete 参数顺序重写为和 post 一致', async () => {
    const ins = create()
    const mockParams = { a: 'a' }
    const { config, data } = await ins.delete('/success', mockParams, {
      onlyReturnData: false,
    })
    expect(data.data).toEqual(successData)
    expect(config.data).toEqual(JSON.stringify(mockParams))
  })
})
