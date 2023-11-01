<!--
 * @Author: dushuai
 * @Date: 2023-04-24 21:30:44
 * @LastEditors: dushuai
 * @LastEditTime: 2023-11-01 12:02:21
 * @description: 其他页面
-->
<script setup lang='ts'>
import { Pages } from '@/enums/app';
import { to } from '@/utils/router';


function handleJump(page: keyof typeof Pages) {
  to(Pages[page])
}

</script>
<template>
  about
  <el-button type="primary" @click="handleJump('Home')">回首页</el-button>
</template>
<style lang='less' scoped></style>
