<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-31 14:29:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-31 15:51:21
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <Siderbar class="sidebar-container" />
    <div class="main-container">
      <!-- <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
import { Siderbar, AppMain } from "./components/index";
const useApp = useAppStore();

const sidebar = computed(() => useApp.sidebar);
const classObj = computed(() => {
  return {
    openSidebar: sidebar.value.opened,
  };
});
</script>
<style lang="scss" scoped>
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>
