import create from '@/index'

describe('config > validateCode', () => {
  it('期望支持自定义 code 校验', async () => {
    const ins = create({
      validateCode: (code) => {
        return code === 0
      },
    })
    try {
      await ins({
        url: '/code/0',
      })
      await ins({
        url: '/code/200',
      })
      expect(false).toBeTruthy()
    } catch (err: any) {
      expect(err.code).toEqual(200)
    }
  })
})
