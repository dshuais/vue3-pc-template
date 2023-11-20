/*
 * @Author: dushuai
 * @Date: 2023-11-01 12:05:03
 * @LastEditors: dushuai
 * @LastEditTime: 2023-11-20 15:14:24
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

    /**
     * 创建打字机
     */
    function createTypewriter() {
      const dom: HTMLElement = document.getElementById('Typewriter')
      console.log(dom.offsetWidth);
    }

    /**
     * 添加事件监听
     */
    function handleAddEventListener() {
      const dom: HTMLElement = document.getElementById('Text')
      dom.addEventListener('animationend', () => {
        console.log('animationend');
        dom.classList.remove('anim-typewriter')
        dom.classList.add(styles['anim-typewriter--close'])
      }, { once: true })
    }


    onMounted(() => {
      createTypewriter()
      handleAddEventListener()
    })

    return () => (
      <>
        <div class={styles.container}>jsx页面</div>
        <div class='h-52 w-52 bg-emerald-300 dark:border-l-indigo-600 text-gray-950 dark:text-white'>盒子</div>
        <ElButton type={'primary'} onClick={handleJump}>回首页</ElButton>

        <p id="Text" class={[styles['anim-typewriter'], styles['line-1']]}>Animation typewriter style using css steps()</p>

        <p id="Typewriter" class={styles.typewriter}>我是</p>
      </>
    )
  }
})
