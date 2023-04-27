/*
 * @Author: dushuai
 * @Date: 2023-03-20 09:33:25
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-27 17:21:16
 * @description: ts类型文件
 */

/**
 * App内数据类型
 */
declare namespace App {

}

/**
 * 路由Menu数据类型
 */
declare namespace Menu {
  interface MenuOptions {
    path: string;
    name: string;
    component?: string | (() => Promise<any>);
    redirect?: string;
    meta: MetaProps;
    children?: MenuOptions[];
  }
  interface MetaProps {
    icon: string;
    title: string;
    activeMenu?: string;
    isLink?: string;
    isHide: boolean;
    isFull: boolean;
    isAffix: boolean;
    isKeepAlive: boolean;
  }
}
