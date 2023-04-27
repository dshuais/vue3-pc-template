/*
 * @Author: dushuai
 * @Date: 2023-04-27 15:00:26
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-27 15:32:36
 * @Description: pinia自动存储缓存工具
 */

import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'

/**
 * @description pinia持久化参数配置
 * @param {string} key 持久化名称
 * @param {Storage} storage 持久化类型
 * @param {string[]} paths 需要持久化的 state name
 * @returns {PersistedStateOptions} persist
 */
const piniaPersistConfig = (key: string, storage: Storage, paths?: string[]): PersistedStateOptions => {
  console.log('config', key, storage)
  const persist: PersistedStateOptions = {
    key,
    storage, // [localStorage, sessionStorage]
    paths
  };
  return persist
}

export default piniaPersistConfig
