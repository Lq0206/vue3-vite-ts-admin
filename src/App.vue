<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 17:34:50
-->
<script setup lang="ts"></script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const locale = zhCn;
</script>

<style>
#app {
  height: 100%;
}
</style>
