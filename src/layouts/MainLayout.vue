<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-31 14:29:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 15:04:52
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <SideBar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <header :class="['sys-header', { 'fixed-header': fixedHeader }]">
        <NavBar :is-tag="needTagsView" />
        <tags-view v-if="needTagsView" />
      </header>
      <app-main />
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/settings";

// components
import Settings from "./components/settings/ConfigSettings.vue";
import { SideBar, AppMain, NavBar, TagsView } from "./components/index";
import RightPanel from "@/components/RightPanel/RightPanel.vue";
const useApp = useAppStore();
const useSettings = useSettingsStore();

const sidebar = computed(() => useApp.sidebar);
const showSettings = computed(() => useSettings.showSettings);
const fixedHeader = computed(() => useSettings.fixedHeader);
const needTagsView = computed(() => useSettings.tagsView);
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
  };
});
</script>
<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
  box-shadow: var(--sidebar-right-shadow);
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
