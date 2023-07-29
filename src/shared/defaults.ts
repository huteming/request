import { IAxiosRequestConfig } from '../types'

const defaultRequestConfig: IAxiosRequestConfig = {
  timeout: 10000,
  withCredentials: false,
  onlyReturnData: true,
  // paramsSerializer: (params: Object) => {
  //   return qs.stringify(params, { indices: false })
  // },
  headers: {
    'Content-Type': 'application/json', // 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  },
}

export default defaultRequestConfig
