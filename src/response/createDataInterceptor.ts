import { IAxiosResponse } from '../types'

export default function createDataInterceptor() {
  return (response: IAxiosResponse) => {
    const {
      config: { onlyReturnData },
      data,
    } = response

    const res = onlyReturnData ? data.data : response
    return res
  }
}
