/*
 * @Author: dushuai
 * @Date: 2023-04-24 18:31:36
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-24 22:32:02
 * @description: store
 */
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {

  const token = ref<string>('')

  return { token }
})
