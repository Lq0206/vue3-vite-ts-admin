<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 16:41:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-31 09:27:21
-->
<template><div></div></template>
<script lang="ts">
import { useDialog } from "naive-ui";

export default {
  name: "DialogContent",
  setup() {
    //挂载在 window 方便与在js中使用
    (window as any).$dialog = useDialog();
  },
};
</script>
