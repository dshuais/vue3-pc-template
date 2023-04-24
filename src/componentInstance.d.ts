/*
 * @Author: dushuai
 * @Date: 2023-04-24 21:40:09
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-24 22:20:25
 * @description: 统一定义组件类型 <ComponentInstance['组件名']> === <InstanceType<typeof 组件名>
 * @Read more: https://github.com/antfu/unplugin-vue-components/issues/601
 */
import type { GlobalComponents } from '@vue/runtime-core'

declare global {
  type ComponentInstance = {
    [Property in keyof GlobalComponents]: InstanceType<GlobalComponents[Property]>
  }
}
