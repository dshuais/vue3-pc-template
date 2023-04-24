/*
 * @Author: dushuai
 * @Date: 2023-03-19 22:08:30
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-24 22:34:07
 * @Description: 接口response data类型文件
 */

/**
 * 接口response data类型
 */
declare namespace Res {
  /** response */
  interface ResponseRes<T = any> {
    code: number,
    data: T,
    msg: string
  }

}
