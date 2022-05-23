import axios from 'axios'
import { notification } from 'antd'
import { baseURL } from '@/utils'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

/**
 * Create Axios instance
 * axios中请求配置有baseURL选项，表示请求URL公共部分
 * timeout  超时时间 默认10秒
 */
const service = axios.create({
  baseURL,
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

export default service
