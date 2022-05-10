import axios, { AxiosRequestConfig } from 'axios'
import LimitPromise from '@/contracts/limitPromise'
import { notification } from 'antd'

const limtReq = new LimitPromise(5, 10000)

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

/**
 * Create Axios instance
 * axios中请求配置有baseURL选项，表示请求URL公共部分
 * timeout  超时时间 默认10秒
 */
const service = axios.create({
  // baseURL,
  timeout: 10000,
})

/** request Interceptor */
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error: any) => {
    Promise.reject(error)
  },
)

/** Response interceptor */
service.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    notification.error({
      message: 'Error',
      description: `${error.message}.Please refresh the page and try again`,
    })
    return Promise.reject(error)
  },
)

const limitGet = (
  url: string,
  config?: AxiosRequestConfig,
  resolve?: (value: any | PromiseLike<any>) => void,
  reject?: (reason?: any) => void,
) =>
  limtReq
    .call(() => service.get(url, config))
    .then(resolve)
    .catch(reject)

export default limitGet
