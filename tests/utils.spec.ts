import { toFormData } from '../src/utils'
import assert from 'assert'

test('toFormData: 表单格式不转换', () => {
  const mockForm = new window.FormData()
  mockForm.set('a', 'a')
  const res = toFormData(mockForm)
  assert.strictEqual(res.get('a'), 'a')
})

test('toFormData: 参数对象时，遍历赋值', () => {
  const res = toFormData({
    a: 'b',
  })
  assert.strictEqual(res.get('a'), 'b')
})

test('toFormData: 参数嵌套对象时，只转换一层', () => {
  const res = toFormData({
    a: [1, 2],
  })
  assert.strictEqual(res.get('a'), '[1,2]')
})
