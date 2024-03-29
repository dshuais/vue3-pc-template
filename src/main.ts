/*
 * @Author: dushuai
 * @Date: 2023-04-24 18:31:36
 * @LastEditors: dushuai
 * @LastEditTime: 2023-11-01 15:54:10
 * @description: main
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import './assets/styles/index.css'

createApp(App)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(router)
  .use(createHead())
  .mount('#app')
