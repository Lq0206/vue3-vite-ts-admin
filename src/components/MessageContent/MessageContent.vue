<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 16:42:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-31 09:27:17
-->
<template><div></div></template>
<script lang="ts">
import { useMessage } from "naive-ui";

export default {
  name: "MessageContent",
  setup() {
    //挂载在 window 方便与在js中使用
    (window as any).$message = useMessage();
  },
};
</script>
