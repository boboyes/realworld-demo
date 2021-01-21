/**
 * axios 的请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 请求拦截
request.interceptors.request.use((config)=>{
  config.headers.Authorization = `Token ` 
  return config;
},(error)=>{
  return Promise.reject(error)
})

// 响应拦截

export default request