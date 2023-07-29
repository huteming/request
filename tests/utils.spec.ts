import { toFormData } from '@/shared/utils'

describe('utils > toFormData', () => {
  test('期望表单格式不转换', () => {
    const mockForm = new window.FormData()
    mockForm.set('a', 'a')
    const res = toFormData(mockForm)
    expect(res).toBe(mockForm)
  })

  test('期望解析对象一层', () => {
    const res = toFormData({
      a: 1,
      b: [1, 2],
    })
    expect(res.get('a')).toEqual('1')
    expect(res.get('b')).toEqual(JSON.stringify([1, 2]))
  })
})
