<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-05 15:31:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 10:15:37
-->
<template>
  <i v-if="props.icon" :class="props.icon" class="sub-el-icon"></i>
  <span class="menu-item-text">
    {{ title }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
<style lang="scss" scoped></style>
