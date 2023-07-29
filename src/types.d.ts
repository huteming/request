import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// ---------------> 类型重写

export interface IAxiosError<Data = any, Params = any> extends AxiosError {
  config: IAxiosRequestConfig<Params>
  response?: IAxiosResponse<Data, Params>
}

export interface IAxiosRequestConfig<Params = any> extends AxiosRequestConfig<Params> {
  onlyReturnData?: boolean
  validateCode?: (code: number) => boolean
}

export interface IAxiosResponse<Data = any, Params = any> extends AxiosResponse<ICustomDataWrapper<Data>, Params> {
  config: IAxiosRequestConfig<Params>
}

export interface IAxiosInstance extends AxiosInstance {
  (config: IAxiosRequestConfig): Promise<IAxiosResponse>

  get<Data = any, Params = any, Res = IAxiosResponse<Data>>(
    url: string,
    params?: Params,
    config?: IAxiosRequestConfig<Params>,
  ): Promise<Res>

  delete<Data = any, Params = any, Res = IAxiosResponse<Data>>(
    url: string,
    data?: Params,
    config?: IAxiosRequestConfig<Params>,
  ): Promise<Res>

  put<Data = any, Params = any, Res = IAxiosResponse<Data>>(
    url: string,
    data?: Params,
    config?: IAxiosRequestConfig<Params>,
  ): Promise<Res>

  post<Data = any, Params = any, Res = IAxiosResponse<Data>>(
    url: string,
    data?: Params,
    config?: IAxiosRequestConfig<Params>,
  ): Promise<Res>
}

// ---------------> 自定义类型

export interface ICustomDataWrapper<Data = any> {
  code?: number
  data?: Data
  message?: string
}

export interface ICustomError {
  isCustomError: boolean
  name: string
  status?: number
  code?: number
  message?: string
  request?: IAxiosRequestConfig
  response?: IAxiosResponse
}
