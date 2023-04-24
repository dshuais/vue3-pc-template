/*
 * @Author: dushuai
 * @Date: 2023-04-24 18:31:36
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-24 21:40:09
 * @description: main
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/style/reset.less'


createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
