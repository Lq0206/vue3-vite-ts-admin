<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-11 11:50:31
-->
<script setup lang="ts"></script>

<template>
  <el-config-provider :locale="locale" :size="size">
    <router-view></router-view>
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { computed } from "vue";
import { useAppStore } from "./store/modules/app";
const locale = zhCn;

const useApp = useAppStore();

const size = computed(() => useApp.getSize as any);
console.log("size", size.value);
</script>

<style lang="scss">
@import "@/styles/variables.scss";
#app {
  height: 100%;
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
  }
}
</style>
