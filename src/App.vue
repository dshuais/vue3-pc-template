<!--
 * @Author: dushuai
 * @Date: 2023-04-24 18:31:36
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-24 22:24:43
 * @description: App
-->
<script setup lang="ts">

// 配置项目标题和meta
useHead({
  title: import.meta.env.VITE_APP_TITLE,
  // meta: [
  //   { name: 'type', content: 'v2' },
  // ]
})

</script>
<template>
  <RouterView />
</template>
<style scoped></style>
