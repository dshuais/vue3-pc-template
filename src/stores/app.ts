/*
 * @Author: dushuai
 * @Date: 2023-04-24 18:31:36
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-27 15:31:31
 * @description: store
 */
import piniaPersistConfig from '@/config/piniaPersist'

export const useAppStore = defineStore('app', () => {
  const token = ref<string>('123')

  return { token }
}, {
  persist: piniaPersistConfig('app', sessionStorage)
})
