import create from '@/index'

describe('errorInterceptor', () => {
  it('期望 http 异常时返回自定义 error 对象', async () => {
    const ins = create()

    try {
      await ins({
        url: '/status/400',
      })
      expect(false).toBeTruthy()
    } catch (err: any) {
      expect(err.isCustomError).toBe(true)
    }
  })
})
