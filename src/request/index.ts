import Http, { AxiosError, } from 'axios'
import { message } from 'antd';
Http.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
// const BaseUrl = 'https://wangzz.site'
const BaseUrl = 'http://localhost:8000'
//设置axios为form-data
// Http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Http.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';


/**
 * encode get 请求对象
 * @param params
 * @returns {string}
 */
const encodeParams = (params: any) => {
  const r = '?'
  const p = []
  for (const key in params) {
    p.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  }
  return r + p.join('&')
}

/**
 * 请求类
 */
class ApiService {
  constructor() {
    this.interceptorsOfReq()
    this.interceptorsOfRes()
  }
  /**
   * get请求
   * @param url
   * @param params
   * @returns {Promise.<TResult>}
   */
  get(url: string, params?: any) {
    if (params) {
      url += encodeParams(params)
    }
    return Http.get(BaseUrl + url).then(res => res.data)
  }

  /**
   * post请求
   * @param url       请求地址
   * @param params    请求参数
   * @param flag      是否需要加签名
   * @returns {Promise.<TResult>}
   */
  post(url: string, params?: any) {
    if (!params) {
      params = {}
    }
    return Http.post(BaseUrl + url, params).then(res => res.data)
  }
  /**
   * delete请求
   * @param url       请求地址
   * @param params    请求参数
   * @param flag      是否需要加签名
   * @returns {Promise.<TResult>}
   */
  delete(url: string, params: any) {
    if (!params) {
      params = {}
    }
    return Http.delete(BaseUrl + url, params).then(res => res.data)
  }
  /**
   * 请求拦截器
   */
  interceptorsOfReq() {
    return Http.interceptors.request.use(
      config => {
        // 如果需要token验证, 头部带上token

        config.headers!.authorization = 'Bearer ' + localStorage.getItem('token') || ''
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )
  }
  /**
   * 响应拦截器
   */
  interceptorsOfRes() {
    Http.interceptors.response.use(
      response => {
        if (response.status === 200 && response.data.code !== "0") {
          message.error(response.data.msg);
        }
        return response
      },
      (error: AxiosError) => {
        if (error.message) {
          message.error('操作异常~');
        }
        //message.error(error.message);
        return Promise.reject(error)
      }
    )
  }
}

export default new ApiService()
