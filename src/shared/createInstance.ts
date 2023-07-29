import axios from 'axios'
import { IAxiosInstance, IAxiosRequestConfig } from '../types'

function createInstance(config: IAxiosRequestConfig): IAxiosInstance {
  const axiosInstance = axios.create(config) as IAxiosInstance

  // 重写get方法
  axiosInstance.get = ((origin) => {
    return (url: string, params?: any, requestConfig?: any) => {
      return origin(url, {
        ...requestConfig,
        params,
      })
    }
  })(axiosInstance.get)

  // 重写delete方法
  axiosInstance.delete = ((origin) => {
    return (url: string, data?: any, requestConfig?: any) => {
      return origin(url, {
        ...requestConfig,
        data,
      })
    }
  })(axiosInstance.delete)

  return axiosInstance
}

export default createInstance
