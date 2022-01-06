<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-31 15:01:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 10:53:43
-->
<template>
  <div>
    <span>dashboard</span>
    <el-calendar v-model="value" />
    <ElButton @click="changeSettings">changeSettings</ElButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSettingsStore } from "@/store/modules/settings";
const value = ref(new Date());
const useSettings = useSettingsStore();
const changeSettings = () => {
  console.log(
    useSettings.changeSettings({ key: "showSettings", value: false })
  );
};
</script>
<style lang="scss" scoped></style>
