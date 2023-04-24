/*
 * @Author: dushuai
 * @Date: 2023-03-27 16:03:47
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-30 17:30:52
 * @description: 重写路由跳转
 */
import type { Pages } from "@/enums/app"
import router from "@/router"
import type { RouteParamsRaw } from "vue-router"


/**
 * router.push跳转
 * @param {Pages} path 将要去的路由
 * @param {RouteParamsRaw} params 参数
 */
export const to = (path: Pages, params?: RouteParamsRaw) => {
  router.push({ path, query: { ...params } })
}

/**
 * router.replace跳转
 * @param {Pages} path 将要去的路由
 * @param {RouteParamsRaw} params 参数
 */
export const redirect = (path: Pages, params?: RouteParamsRaw) => {
  router.replace({ path, query: { ...params } })
}

/**
 * router.back返回上一页
 */
export const back = () => {
  router.back()
}

/**
 * router.go跳到某一级页面
 * @param {number} index 某一级
 */
export const go = (index: number) => {
  router.go(index)
}
