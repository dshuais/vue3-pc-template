/*
 * @Author: dushuai
 * @Date: 2023-04-27 17:24:04
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-27 17:27:26
 * @description: router helper methods
 */

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArray(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.reduce((pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
    let flatArr = [...pre, current]
    if (current.children) flatArr = [...flatArr, ...getFlatArray(current.children)]
    return flatArr
  }, [])
}

/**
 * @description 使用递归，过滤需要缓存的路由（暂时没有使用）
 * @param {Array} menuList 所有菜单列表
 * @param {Array} keepAliveArr 缓存的路由菜单 name ['**','**']
 * @return array
 * */
export function getKeepAliveRouterName(menuList: Menu.MenuOptions[], keepAliveArr: string[] = []) {
  menuList.forEach(item => {
    item.meta.isKeepAlive && item.name && keepAliveArr.push(item.name)
    item.children?.length && getKeepAliveRouterName(item.children, keepAliveArr)
  })
  return keepAliveArr
}

/**
 * @description 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param {Array} menuList 所有菜单列表
 * @return array
 * */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.isHide
  })
}

/**
 * @description 使用递归处理路由菜单 path，生成一维数组(第一版本地路由鉴权会用到)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} menuPathArr 菜单地址的一维数组 ['**','**']
 * @return array
 */
export function getMenuListPath(menuList: Menu.MenuOptions[], menuPathArr: string[] = []) {
  menuList.forEach((item: Menu.MenuOptions) => {
    typeof item === "object" && item.path && menuPathArr.push(item.path)
    item.children?.length && getMenuListPath(item.children, menuPathArr)
  })
  return menuPathArr
}

/**
 * @description 递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @param {Object} result 输出的结果
 * @param {Array} parent 父级菜单
 * @returns object
 */
export const getAllBreadcrumbList = (menuList: Menu.MenuOptions[], result: { [key: string]: any } = {}, parent: Array<any> = []) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item]
    if (item.children) getAllBreadcrumbList(item.children, result, result[item.path])
  }
  return result
}
