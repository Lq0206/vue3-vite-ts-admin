<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-31 14:29:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 17:20:23
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <!-- <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />-->
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
import { SideBar, AppMain } from "./components/index";
import { useSettingsStore } from "@/store/modules/settings";

// components
import Settings from "./components/settings/ConfigSettings.vue";
import RightPanel from "@/components/RightPanel/RightPanel.vue";
const useApp = useAppStore();
const useSettings = useSettingsStore();

const sidebar = computed(() => useApp.sidebar);
const showSettings = computed(() => useSettings.showSettings);
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
  };
});
</script>
<style lang="scss" scoped>
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>
