// import { AxiosInstance, AxiosRequestConfig } from 'axios'
// import { CodeHandlerRegister } from '../src/interceptorResponseCode'
// import { StatusHandlerRegister } from '../src/interceptorResponseStatus'

// interface Preset {
//   (instance: AxiosInstance, config: AxiosRequestConfig): void
// }

// declare module 'axios' {
//   export interface AxiosRequestConfig {
//     successCode?: number | number[]
//     responseOnlyData?: boolean
//     preset?: Preset[]
//   }

//   export interface AxiosInstance {
//     // 类型从 post 复制而来
//     get<T = any, R = AxiosResponse<T>, D = any>(
//       url: string,
//       data?: D,
//       config?: AxiosRequestConfig<D>,
//     ): Promise<R>
//     delete<T = any, R = AxiosResponse<T>, D = any>(
//       url: string,
//       data?: D,
//       config?: AxiosRequestConfig<D>,
//     ): Promise<R>

//     postFormData: Axios['post']
//     updateConfig: (config: AxiosRequestConfig) => void
//     registCodeHandler: CodeHandlerRegister
//     registStatusHandler: StatusHandlerRegister
//   }
// }
