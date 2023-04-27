/*
 * @Author: dushuai
 * @Date: 2023-03-14 17:53:45
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-27 15:39:11
 * @description: axios
 */
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { useAppStore } from '@/stores/app'
import { cancelRequest } from './requestCancel'
import ErrorCodeHandle from './requestCode'


/** 不需要处理异常白名单 */
const whiteList: string[] = []

// axios基础配置
const service = axios.create({
  timeout: 20000,
  baseURL: import.meta.env.VITE_APP_BASE_URL
})

// 请求拦截
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // 添加token
    const { token } = storeToRefs(useAppStore())
    if (token.value) {
      config.headers['token'] = token.value
    }

    cancelRequest.addPending(config) // 添加当前请求至请求列表

    // console.log('请求拦截 config:>> ', config)
    return config
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    const url = response.config.url as string

    cancelRequest.removePending(response.config) // 删除重复请求

    if (whiteList.some(e => e.match(url))) {
      console.log('接口通过白名单，不需要异常处理url:>> ', url)
    } else {
      ErrorCodeHandle(response)
    }

    // console.log('响应拦截 response:>> ', response)
    return response
  },
  (err: AxiosError) => {
    /**
     * 将取消请求的错误捕获
     * 根据需要设置 因为需要对每个请求单独处理catch 所以隐藏取消请求的错误返回
     */
    if (err.code === 'ERR_CANCELED') {
      console.log('请求取消url:>> ', err.config?.url)
    } else {
      return Promise.reject(err)
    }
  }
)

/**
 * 基础的请求
*/
/** POST JSON格式 */
export function post<T = any>(url: string, params?: object): Promise<Res.ResponseRes<T>> {
  return new Promise<Res.ResponseRes<T>>((resolve, reject) => {
    service
      .post(url, params)
      .then(
        (response: AxiosResponse<Res.ResponseRes<T>>) => {
          response && resolve(response.data)
        },
        (err: AxiosError) => {
          reject(err)
        }
      )
      .catch((error: AxiosError) => {
        reject(error)
      })
  })
}

/** GET请求 */
export function get<T = any>(url: string, params?: object): Promise<Res.ResponseRes<T>> {
  return new Promise<Res.ResponseRes<T>>((resolve, reject) => {
    service
      .get(url, { params })
      .then(
        (response: AxiosResponse<Res.ResponseRes<T>>) => {
          response && resolve(response.data)
        },
        (err: AxiosError) => {
          reject(err)
        }
      )
      .catch((error: AxiosError) => {
        reject(error)
      })
  })
}
