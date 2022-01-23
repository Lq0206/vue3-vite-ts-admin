<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-07 11:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 10:10:12
-->
<template>
  <div style="padding: 0 12px" @click="handleClick">
    <i class="iconfont icon-fullscreen navbar-icon"></i>
  </div>
</template>

<script setup lang="ts">
import screenfull from "screenfull";
import { onMounted, onBeforeMount, ref, getCurrentInstance } from "vue";
import { IComponentInternalInstance } from "@/utils/eleCompInstall";
const isFullscreen = ref(false);
const proxy = getCurrentInstance()?.appContext.config
  .globalProperties as IComponentInternalInstance;
const handleClick = () => {
  if (!screenfull.isEnabled) {
    proxy.$message({
      message: "您的浏览器不支持该功能",
      type: "warning",
    });
    return false;
  }
  screenfull.toggle();
};

onMounted(() => {
  init();
});

onBeforeMount(() => {
  destroy();
});

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on("change", change);
  }
};

const destroy = () => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change);
  }
};
</script>
<style lang="scss" scoped>
.screenfull-icon {
  transform: rotate(45deg);
}
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
