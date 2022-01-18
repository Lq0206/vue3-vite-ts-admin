<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-17 16:08:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-17 18:08:20
-->
<template>
  <div class="model-switch">
    <el-switch
      v-model="model"
      inline-prompt
      :active-icon="Moon"
      :inactive-icon="Sunny"
    >
    </el-switch>
  </div>
</template>

<script setup lang="ts">
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useAppStore } from "@/store/modules/app";
import { handleClass } from "./ThemeSwitch";
import { computed } from "vue";

const useApp = useAppStore();
const model = computed({
  get() {
    return useApp.getThemeModel;
  },
  set(value: boolean) {
    useApp.toggleThemeModel(value);
    handleClass(value);
  },
});

// const handleThemeChange = async (value: any) => {
//   const res = await useApp.toggleThemeModel(value);
//   handleClass(res);
// };
</script>
<style lang="scss" scoped>
.model-switch {
  position: absolute;
  right: 40px;
  top: 20px;
}
</style>
