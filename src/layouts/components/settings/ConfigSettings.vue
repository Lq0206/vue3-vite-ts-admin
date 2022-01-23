<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-04 17:40:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 13:58:00
-->
<template>
  <div class="drawer-container">
    <h3 class="drawer-title">系统配置</h3>
    <div class="drawer-item">
      <span>主题切换</span>
      <ThemeSwitch class="drawer-switch"></ThemeSwitch>
    </div>

    <div class="drawer-item">
      <span>启用页面标签</span>
      <el-switch v-model="tagsView" size="default" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span>固定顶部</span>
      <el-switch v-model="fixedHeader" size="default" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span>启用菜单LOGO</span>
      <el-switch v-model="sidebarLogo" size="default" class="drawer-switch" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/store/modules/settings";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.vue";

const useSettings = useSettingsStore();

// tagsView
const tagsView = computed({
  get() {
    return useSettings.tagsView;
  },
  set(value: boolean) {
    useSettings.changeSettings({ key: "tagsView", value });
  },
});

// fixedHeader
const fixedHeader = computed({
  get() {
    return useSettings.fixedHeader;
  },
  set(value: boolean) {
    useSettings.changeSettings({ key: "fixedHeader", value });
  },
});

// sidebarLogo
const sidebarLogo = computed({
  get() {
    return useSettings.sidebarLogo;
  },
  set(value: boolean) {
    useSettings.changeSettings({
      key: "sidebarLogo",
      value,
    });
  },
});
</script>
<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: var(--el-text-color-primary);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    display: flex;
    justify-content: space-between;
    color: var(--el-text-color-primary);
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    margin-bottom: 12px;
  }
}
.setting-toggle {
  position: absolute;
  left: -50px;
}
</style>
