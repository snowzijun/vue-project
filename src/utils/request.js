import axios from 'axios'
// TODO: 请求的基础路径，待完善
const baseUrl = ''

const instance = axios.create({
  baseUrl,
  // 超时时间 16 秒
  timeout: 16000
})

// 请求拦截器 添加token， 判断登录之类操作
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器，对返回数据进行预处理
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 对 请求进行封装 只有 status 与 code 都是200 才会进入 then , 否则均进入 catch
 * @param {*} options
 */
const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    instance(options)
      .then(({ data: { code, msg, data }, status }) => {
        if (status === 200 && code === 200) {
          resolve(data)
        } else {
          reject(msg || '请求异常')
        }
      })
      .catch(({ response: { status } }) => {
        switch (status) {
          // 未登录
          case 401:
            break
          case 403:
            // token 过期
            break
          case 404:
            // 请求丢失
            break
          default:
            break
        }
        reject('请求异常')
      })
  })
}

const get = (url, params = {}) => {
  return request({
    url,
    method: 'get',
    params
  })
}

const post = (url, data = {}) => {
  return request({
    url,
    method: 'get',
    data
  })
}

/**
 * request 对请求进行二次包装，处理了异常编码
 * get
 * set
 * axios 对axios进行包装之后的原生实例
 */
export { request, get, post, instance as axios }
