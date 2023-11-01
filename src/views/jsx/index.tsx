/*
 * @Author: dushuai
 * @Date: 2023-11-01 12:05:03
 * @LastEditors: dushuai
 * @LastEditTime: 2023-11-01 16:20:16
 * @description: jsx页面
 */
import { to } from '@/utils/router'
import styles from './jsx.module.scss'
import { Pages } from '@/enums/app'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'Jsx',
  component: {},
  props: {},
  emits: [],
  setup() {

    function handleJump() {
      to(Pages.Home)
    }

    return () => (
      <>
        <div class={styles.container}>jsx页面</div>
        <div class='h-52 w-52 bg-emerald-300 dark:border-l-indigo-600 text-gray-950 dark:text-white'>盒子</div>
        <ElButton type={'primary'} onClick={handleJump}>回首页</ElButton>
      </>
    )
  }
})
