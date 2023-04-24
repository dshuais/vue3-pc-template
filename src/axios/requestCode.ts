/*
 * @Author: dushuai
 * @Date: 2023-04-03 14:33:53
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-03 14:51:02
 * @description: 统一处理报错
 */
import { useAppActions } from "@/stores/appActions";
import type { AxiosResponse } from "axios";


/** 不需要token的接口列表 */
const noTokenUrl: string[] = ['app/main/getToken']
/** 报错需要跳转降级页的状态码 -500 */
const to404Url: number[] = []

/**
 * 统一处理报错
 * @param {AxiosResponse} response 请求响应参数
 */
export default (response: AxiosResponse): void => {
  const code: number = response.data.code,
    url: string = response.config.url as string

  if (code === 200) { // 正常

  } else if (code === 401 && !noTokenUrl.includes(url)) { // 401未登录
    console.log('登陆失败err:>> ', url)
    useAppActions().REMOVE_TOKEN()
  } else if (to404Url.includes(code)) { // 跳降级页
    window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
  } else {
    console.log('请求失败err:>> ', response.data);
  }
}
