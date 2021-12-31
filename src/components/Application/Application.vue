<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 16:39:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-30 16:53:57
-->
<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <DialogContent />
      <n-notification-provider>
        <n-message-provider>
          <MessageContent />
          <slot></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
} from "naive-ui";
import { MessageContent } from "@/components/MessageContent";
import { DialogContent } from "@/components/DialogContent";

export default defineComponent({
  name: "ApplicationWrap",
  components: {
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
    NLoadingBarProvider,
    MessageContent,
    DialogContent,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped></style>
