import { defaultTo, isFunction } from '@/shared/utils'
import createError from '@/shared/createError'
import { IAxiosResponse } from '../types'

export default function createCodeValidater() {
  return (response: IAxiosResponse) => {
    const { config, data, status, request } = response
    const { validateCode } = config

    if (!isFunction(validateCode)) {
      return response
    }

    const code = defaultTo(Number.NaN, data.code)
    if (validateCode(code)) {
      return response
    }

    const customError = createError(status, code, data?.message, request, response)

    return Promise.reject(customError)
  }
}
