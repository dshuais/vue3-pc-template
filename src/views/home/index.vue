<!--
 * @Author: dushuai
 * @Date: 2023-04-24 21:20:50
 * @LastEditors: dushuai
 * @LastEditTime: 2023-11-01 16:06:29
 * @description: index
-->
<script setup lang='ts'>
import { Pages } from '@/enums/app';
import { to } from '@/utils/router';


function handleJump(page: keyof typeof Pages) {
  to(Pages[page])
}

onMounted(() => {
})
</script>
<template>
  <div class="h-full">首页</div>
  <el-button type="primary" @click="handleJump('About')">去其他页面</el-button>
  <el-button type="primary" @click="handleJump('Jsx')">去jsx页面</el-button>
</template>
<style lang='scss' scoped></style>
