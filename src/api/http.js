import axios from 'axios'
import { showNotify } from 'vant'

const instance = axios.create({
  baseURL: 'https://api.shop.eduwork.cn/api',
  timeout: 5000,
})

instance.interceptors.request.use(
  config => {
    // 设置请求头等操作
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    // 处理响应数据等操作
    return response.data
  },
  error => {
    // 处理错误信息等操作
    console.log(error)
    if (error.response) {
      switch (error.response.status) {
        case 403:
          showNotify({
            message: error.response.data.message,
            type: 'danger'
          })
          break
        case 422:
          showNotify({
            message: error.response.data.errors[Object.keys(error.response.data.errors)[0]][0],
            type: 'danger'
          })
          break
      }
    }
    return Promise.reject(error)
  }
)

export default instance