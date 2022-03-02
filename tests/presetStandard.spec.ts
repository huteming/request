import assert from 'assert'
import create from '../src/index'
import presetStandardPC from '../src/preset/standard-pc'
import { notification, message } from 'antd'

describe('preset standard', () => {
  let spyNotify
  let spyMessage

  beforeEach(() => {
    spyNotify = jest.spyOn(notification, 'error').mockImplementation(() => {})
    spyMessage = jest.spyOn(message, 'error').mockImplementation(jest.fn())
  })

  afterEach(() => {
    spyNotify.mockRestore()
    spyMessage.mockRestore()
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

  it('处理未规范状态', async () => {
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
    }
  })
})
