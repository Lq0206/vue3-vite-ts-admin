<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-05 15:31:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-06 17:11:49
-->
<template>
  <i v-if="props.icon" :class="props.icon" class="sub-el-icon"></i>
  <span v-if="!isCollapse" class="menu-item-text">
    {{ title }}
  </span>
</template>

<script setup lang="ts">
import { inject } from "vue";
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

const isCollapse = inject("isCollapse");
</script>
<style lang="scss" scoped></style>
