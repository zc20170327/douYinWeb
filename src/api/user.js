import request from '@/utils/request'
var baseURL = process.env.VUE_APP_BASE_API // url = base url + request url

export function login(data) {
  return request({
  	baseURL: baseURL,
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
  	baseURL: baseURL,
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
  	baseURL: baseURL,
    url: '/user/logout',
    method: 'post'
  })
}
