import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

interface Preset {
  (ask: Ask): void
}

export interface AskConfig<T = any> extends AxiosRequestConfig<T> {
  successCode?: number | number[]
  dataType?: 'json' | 'form' | 'formdata'
  isExtract?: boolean // 直接返回 业务data
  preset?: Preset[]
}

export interface AskResponse<T = any> extends AxiosResponse<T> {
  data: T
  config: AskConfig<T>
}

// 不是继承 AxiosError，因为有些属性懒得去重写了
export interface AskError<T = any> extends Error {
  config: AskConfig
  response?: AskResponse<T>
  isCancel?: boolean
}

// code 处理器的注册函数
export type Code = number | ((code: number) => boolean)

export interface CodeHandler {
  (response: AskResponse): void
}

export interface CodeHandlerRegister {
  (code: Code, handler: CodeHandler): void
}

// status 处理器的注册函数
export type Status = number | ((status: number, erros: AskError) => boolean)

export interface StatusHandler {
  (error: AskError): void
}
export interface StatusHandlerRegister {
  (status: Status, handler: StatusHandler): void
}

export interface Ask extends AxiosInstance {
  <Res = any, Req = any>(config: AskConfig<Req>): Promise<Res>

  defaults: AskConfig
  interceptors: {
    request: AxiosInterceptorManager<AskConfig>
    response: AxiosInterceptorManager<any>
  }

  get: <Res = any, Req = any>(
    url: string,
    data?: Req,
    config?: AskConfig,
  ) => Promise<Res>

  post: <Res = any, Req = any>(
    url: string,
    data?: Req,
    config?: AskConfig,
  ) => Promise<Res>

  delete: <Res = any, Req = any>(
    url: string,
    data?: Req,
    config?: AskConfig,
  ) => Promise<Res>

  put: <Res = any, Req = any>(
    url: string,
    data?: Req,
    config?: AskConfig,
  ) => Promise<Res>

  // 自定义方法
  updateConfig: (option: AskConfig) => AskConfig
  registCodeHandler: CodeHandlerRegister
  registStatusHandler: StatusHandlerRegister
}

export default function create(config: AskConfig) {
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

  return axiosInstance as Ask
}
