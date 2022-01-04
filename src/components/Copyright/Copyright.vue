<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-31 11:59:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-31 14:22:49
-->
<template>
  <div class="copyright" :style="{ color: props.color }">
    {{ copyright }}
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
const props = defineProps({
  color: {
    type: String,
    default: "#909399",
  },
});
const copyright = ref("Copyright @ 2022");
</script>
<style lang="scss" scoped></style>
