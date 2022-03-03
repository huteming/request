import assert from 'assert'
import create from '../src/index'
import presetStandardPC from '../src/preset/standard-pc'
import { notification, message } from 'antd'

describe('preset standard', () => {
  let spyNotify: any
  let spyMessage: any

  beforeEach(() => {
    spyNotify = jest.spyOn(notification, 'error').mockImplementation(() => {})
    spyMessage = jest.spyOn(message, 'error').mockImplementation(jest.fn())
  })

  afterEach(() => {
    spyNotify.mockRestore()
    spyMessage.mockRestore()
  })

  it('期望 code=0 为正常', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    const { config } = await ins({
      url: '/code/0',
      responseOnlyData: false,
    })
    expect(config.successCode).toEqual([0, 200])
  })

  it('期望 code=200 为正常', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    const { config } = await ins({
      url: '/code/200',
      responseOnlyData: false,
    })
    expect(config.successCode).toEqual([0, 200])
  })

  it('处理 status=400', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    try {
      await ins({
        url: '/status/400',
      })
      assert.ok(false)
    } catch {
      expect(spyNotify).toBeCalledTimes(1)
    }
  })

  it('处理 status=401', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    try {
      await ins({
        url: '/status/401',
      })
      assert.ok(false)
    } catch {
      expect(spyMessage).toBeCalledTimes(1)
    }
  })

  it('处理 status=402', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    try {
      await ins({
        url: '/status/402',
      })
      assert.ok(false)
    } catch {
      expect(spyMessage).toBeCalledTimes(1)
    }
  })

  it('处理 status=403', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    try {
      await ins({
        url: '/status/403',
      })
      assert.ok(false)
    } catch {
      expect(spyMessage).toBeCalledTimes(1)
    }
  })

  it('处理 status=404', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    try {
      await ins({
        url: '/status/404',
      })
      assert.ok(false)
    } catch {
      expect(spyNotify).toBeCalledTimes(1)
    }
  })

  it('处理 status=405', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    try {
      await ins({
        url: '/status/405',
      })
      assert.ok(false)
    } catch {
      expect(spyNotify).toBeCalledTimes(1)
    }
  })

  it('处理 status=500', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    try {
      await ins({
        url: '/status/500',
      })
      assert.ok(false)
    } catch {
      expect(spyMessage).toBeCalledTimes(1)
    }
  })

  it('处理 code 异常', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    try {
      await ins({
        url: '/code/600',
      })
      assert.ok(false)
    } catch {
      expect(spyMessage).toBeCalledTimes(1)
      expect(spyMessage).toBeCalledWith('error: code 600')
    }
  })

  it('处理其他 status 异常', async () => {
    const ins = create({
      preset: [presetStandardPC],
    })
    try {
      await ins({
        url: '/status/600',
      })
      assert.ok(false)
    } catch {
      expect(spyMessage).toHaveBeenCalledTimes(1)
      expect(spyMessage).toBeCalledWith('Request failed with status code 600')
    }
  })
})
