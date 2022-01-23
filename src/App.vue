<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-19 17:36:01
-->
<script setup lang="ts"></script>

<template>
  <el-config-provider :locale="locale" :size="size">
    <router-view></router-view>
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { computed, onMounted, getCurrentInstance } from "vue";
import { IComponentInternalInstance } from "@/utils/eleCompInstall";
import { useAppStore } from "./store/modules/app";
import { handleClass } from "./components/ThemeSwitch/ThemeSwitch";
import ls from "./utils/storage";
const locale = zhCn;

const useApp = useAppStore();
const proxy = getCurrentInstance()?.appContext.config
  .globalProperties as IComponentInternalInstance;

const size = computed(() => useApp.getSize as any);
onMounted(() => {
  if (+ls.get("themeModel")) {
    handleClass(true);
  } else {
    handleClass(false);
  }
  useApp.toggleThemeModel(ls.get("themeModel"));
  // 判断用户电脑是否处于暗黑模式
  const isDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDark && !useApp.getThemeModel && !useApp.isSwitch) {
    proxy.$messageBox
      .confirm("您的电脑正在处于黑夜模式是否将该系统切换成黑夜模式？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(async () => {
        const res = await useApp.toggleThemeModel(true);
        handleClass(true);
        if (res) {
          proxy.$message({
            type: "success",
            message: "切换成功",
          });
        }
      })
      .catch(() => {
        useApp.setIsSwitch(true);
        proxy.$message({
          type: "info",
          message: "取消切换",
        });
      });
  }
});
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
