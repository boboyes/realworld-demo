/**
 * axios 的请求模块
 */
import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

//通过插件机制获取上下文对象
export default ({store}) => {
  // 请求拦截
  request.interceptors.request.use((config)=>{
    const {user} = store.state
    if(user && user.token){
      config.headers.Authorization = `Token ${user.token}` 
    }
    return config;
  },(error)=>{
    return Promise.reject(error)
  })

  // 响应拦截
}