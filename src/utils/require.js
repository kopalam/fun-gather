/**
 * User: vickyzhe@outlook.com
 * Date: 2018/10/9
 * Time: 上午11:07
 *
 */
import axios from 'axios'
import qs from 'qs'
// axios.defaults.baseURL = '/apis'
axios.defaults.timeout = 20000

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
    return response
}, function (error) {
  // Do something with response error
  error.code = error.response.status
  switch (error.response.status) {
    case 400:
      error.message = '错误请求'
      break;
    case 401:
      error.message = '未授权，请重新登录'
      break;
    case 403:
      error.message = '拒绝访问'
      break;
    case 404:
      error.message = '请求错误,未找到该资源'
      break;
    case 405:
      error.message = '请求方法未允许'
      break;
    case 408:
      error.message = '请求超时'
      break;
    case 500:
      error.message = '服务器端出错'
      break;
    case 501:
      error.message = '网络未实现'
      break;
    case 502:
      error.message = '网络错误'
      break;
    case 503:
      error.message = '服务不可用'
      break;
    case 504:
      error.message = '网络超时'
      break;
    case 505:
      error.message = 'http版本不支持该请求'
      break;
    default:
      error.message = `连接错误${error.response.status}`
  }
  return Promise.reject(error)
})

async function request(options) {
  options.method = 'post'
  if (options.config === 'formData') {
    options.headers = {'Content-Type': 'multipart/form-data'}
  } else {
    options.data = qs.stringify(options.data)
  }
  return new Promise((resolve,reject) => {
    axios(options).then(res => {
      if(res.data.status === 0) {
        resolve(res.data)
      } else if (res.data.status === 1) {
        this.$message.error(`status: ${res.data.status}, message: ${ res.data.message }`)
        reject(res.data)
      } else if (res.data.status === 2) {
        this.$message.error(`status: ${res.data.status}, message: ${ res.data.message }`)
        setTimeout(() => this.$router.go('/login'), 1200)
      }
    }).catch(error => {
      this.$message.error(`${error.code} : ${ error.message }`)
    })
  })
}

async function requestAll (data1, data2) {
  function fun1() {
    return axios({ method: 'post', ...data1, data: qs.stringify(data1.data) })
  }
  function fun2() {
    return axios({ method: 'post', ...data2, data: qs.stringify(data2.data) })
  }
  return new Promise((resolve,reject) => {
    axios.all([fun1(), fun2()]).then(axios.spread((res1, res2) => {
      // 两个请求现在都执行完成
      const data1 = res1.data
      const data2 = res2.data
      if(data1.status === 0 && data2.status === 0) {
        const newArr = [...data1.data, ...data2.data]
        resolve(newArr)
      } else {
        this.$message.error(`message: 请求出错`)
        reject([data1,data2])
      }

    })).catch(error => {
      this.$message.error(`${error.code} : ${ error.message }`)
    })
  })
}

export default { request, requestAll }

