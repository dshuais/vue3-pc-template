<script setup lang='ts'>

</script>
<template>
  index
  <div class="box">
    <div class="box1"></div>
  </div>
</template>
<style lang='less' scoped>
.box {
  width: 100px;
  height: 1000px;
  background: red;

  .box1 {
    .wh(50, 200);
    background: gold;
  }
}
</style>
