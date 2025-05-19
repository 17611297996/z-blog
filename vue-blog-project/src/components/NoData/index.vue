<template>
  <div class="no-data">
    <img v-lazy="noDataImg" />
  </div>
</template>

<script setup>
import noDataImg from '@assets/images/noData.png'
</script>

<style lang="less" scoped>
.no-data {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
