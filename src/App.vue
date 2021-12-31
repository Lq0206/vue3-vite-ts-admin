<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-30 17:18:59
-->
<script setup lang="ts">
import { NConfigProvider } from "naive-ui";
import { AppProvider } from "@/components/Application";
</script>

<template>
  <NConfigProvider style="height: 100%">
    <AppProvider>
      <div id="app">
        <router-view></router-view>
      </div>
    </AppProvider>
  </NConfigProvider>
</template>

<style>
#app {
  height: 100%;
}
</style>
