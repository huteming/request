import { AxiosRequestConfig } from 'axios'
import qs from 'qs'

export const defaultRequestConfig: AxiosRequestConfig = {
  timeout: 10000,
  withCredentials: false,
  successCode: 200,
  responseOnlyData: true, // 返回后端 data
  paramsSerializer: (params: Object) => {
    return qs.stringify(params, { indices: false })
  },
  headers: {
    'Content-Type': 'application/json', // 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  },
}
