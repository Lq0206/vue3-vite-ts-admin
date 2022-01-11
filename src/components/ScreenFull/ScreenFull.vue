<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-07 11:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 15:11:55
-->
<template>
  <div style="padding: 0 12px" @click="handleClick">
    <i class="iconfont icon-fullscreen navbar-icon"></i>
  </div>
</template>

<script setup lang="ts">
import screenfull from "screenfull";
import { onMounted, onBeforeMount, ref } from "vue";
import { ElMessage } from "element-plus";
const isFullscreen = ref(false);
const handleClick = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: "you browser can not work",
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
