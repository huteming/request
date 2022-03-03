import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { mergeAxiosConfig, toFormData } from './utils'

export default function create<T>(
  config: AxiosRequestConfig<T>,
): AxiosInstance {
  const axiosInstance = axios.create(config)

  // 重写get方法
  axiosInstance.get = ((origin) => {
    return <Res = any, Req = any>(
      url: string,
      data: Req,
      requestConfig?: AxiosRequestConfig,
    ) => {
      return origin<Req, Res>(url, {
        ...requestConfig,
        params: data,
      })
    }
  })(axiosInstance.get)

  // 重写delete方法
  axiosInstance.delete = ((origin) => {
    return <Res = any, Req = any>(
      url: string,
      data: Req,
      requestConfig?: AxiosRequestConfig,
    ) => {
      return origin<Req, Res>(url, {
        ...requestConfig,
        data,
      })
    }
  })(axiosInstance.delete)

  axiosInstance.postFormData = (url, data, config) => {
    return axiosInstance.post(
      url,
      toFormData(data),
      mergeAxiosConfig(config, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    )
  }

  return axiosInstance
}
