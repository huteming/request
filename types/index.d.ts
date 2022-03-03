import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { CodeHandlerRegister } from '../src/interceptorResponseCode'
import { StatusHandlerRegister } from '../src/interceptorResponseStatus'

type Defined<
  T extends Record<string, any>,
  D extends string,
> = T[D] extends boolean ? true : false

type CheckDefined<T extends Record<string, any>, D extends string> = Defined<
  T,
  D
> extends true
  ? true
  : false

interface Preset {
  (instance: AxiosInstance, config: AxiosRequestConfig): void
}

export default AxiosInstance

declare module 'axios' {
  export interface AxiosRequestConfig {
    successCode?: number | number[]
    responseOnlyData?: boolean
    preset?: Preset[]
    disabledCodeHandlers?: boolean
    disabledStatusHandlers?: boolean
  }

  export interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
    get<T = any, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>
    delete<T = any, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>
    put<T = any, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>
    post<T = any, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>

    postFormData: AxiosInstance['post']
    updateConfig: (config: AxiosRequestConfig) => void
    registCodeHandler: CodeHandlerRegister
    registStatusHandler: StatusHandlerRegister
  }
}
