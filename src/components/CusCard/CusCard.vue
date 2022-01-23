<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-20 16:03:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 16:26:50
-->
<template>
  <div :class="['custom-card', props.customClass]">
    <slot name="header">
      <span>{{ props.title }}</span>
    </slot>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  customClass: {
    type: String,
    default: "",
  },
  // options: {
  //   type: Object,
  //   default() {
  //     return {};
  //   },
  // },
});
</script>
<style lang="scss" scoped>
.custom-card {
  position: relative;
  background: #fff;
  margin-bottom: 24px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  &:hover {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    transition: all 0.28s linear;
  }
}
</style>
