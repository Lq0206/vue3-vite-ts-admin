<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-04 17:40:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 16:55:40
-->
<template>
  <div class="drawer-container">
    <h3 class="drawer-title">系统配置</h3>
    <!-- <div class="drawer-item">
      <span>主题颜色</span>
      <theme-picker
        style="float: right; height: 26px; margin: -3px 8px 0 0"
        @change="themeChange"
      />
    </div> -->

    <div class="drawer-item">
      <span>启用页面标签</span>
      <el-switch v-model="tagsView" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span>固定顶部</span>
      <el-switch v-model="fixedHeader" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span>启用菜单LOGO</span>
      <el-switch v-model="sidebarLogo" class="drawer-switch" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSettingsStore } from "@/store/modules/settings";

const useSettings = useSettingsStore();
const themeChange = () => {
  console.log("此功能正在开发中。。。");
};

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
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
.setting-toggle {
  position: absolute;
  left: -50px;
}
</style>
