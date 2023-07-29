import createError from '@/shared/createError'
import { IAxiosError, ICustomError } from '../types'
import transformErrorMessage from '@/shared/transformErrorMessage'

export default function createErrorInterceptor() {
  return (error: IAxiosError | ICustomError) => {
    if ('isCustomError' in error) {
      return Promise.reject(error)
    }

    const { status, response, request } = error
    const { data } = response || {}

    const customError = createError(Number(status), data?.code, transformErrorMessage(error), request, response)
    return Promise.reject(customError)
  }
}
