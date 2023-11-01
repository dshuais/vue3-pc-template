/*
 * @Author: dushuai
 * @Date: 2023-04-24 18:31:36
 * @LastEditors: dushuai
 * @LastEditTime: 2023-11-01 12:12:17
 * @description: router
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

/**
 * @description 动态路由参数配置简介 📚
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/about/index.vue')
  },
  {
    path: '/jsx',
    name: 'Jsx',
    component: () => import('@/views/jsx')
  },
]

const router = createRouter({
  history: createWebHistory(), // import.meta.env.BASE_URL
  routes
})

// 防止连续点击多次路由报错
const originalPush = router.push
router.push = function push(location) {
  return originalPush.call(this, location)
}

const originalReplace = router.replace
router.replace = function replace(location) {
  return originalReplace.call(this, location)
}

export default router
