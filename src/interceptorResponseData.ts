import { AxiosResponse } from 'axios'

export default function interceptorResponseData() {
  return (response: AxiosResponse) => {
    const {
      config: { responseOnlyData },
    } = response

    const res = responseOnlyData ? response.data.data : response
    return res
  }
}
