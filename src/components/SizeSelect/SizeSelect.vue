<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-07 14:32:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-11 14:16:11
-->
<template>
  <el-dropdown trigger="hover" @command="handleSetSize">
    <a class="nav-icon-wrap">
      <i class="iconfont icon-font-size navbar-icon"></i>
    </a>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of state.sizeOptions"
          :key="item.value"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { reactive, computed, nextTick, getCurrentInstance } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useRoute, useRouter } from "vue-router";
import { useTagsViewStore } from "@/store/modules/tagsView";
import { ElMessage } from "element-plus";
const router = useRouter();
const route = useRoute();
const useApp = useAppStore();
const useTagsView = useTagsViewStore();
const proxy = getCurrentInstance();
const state = reactive({
  sizeOptions: [
    { label: "Large", value: "large" },
    { label: "Default", value: "default" },
    { label: "Small", value: "small" },
  ],
});

const size = computed(() => useApp.getSize);
const handleSetSize = (size: string) => {
  if (proxy) {
    proxy.appContext.config.globalProperties.$ELEMENT.size = size;
    useApp.setSize(size);
    refreshView();
    ElMessage({
      message: "配置成功",
      type: "success",
    });
  }
};

const refreshView = () => {
  useTagsView.delAllCachedViews();
  const { fullPath } = route;
  nextTick(() => {
    router.replace({
      path: "/redirect" + fullPath,
    });
  });
};
</script>
<style lang="scss" scoped>
.nav-icon-wrap {
  display: block;
  width: 100%;
  height: 100%;
  padding: 16px 0;
}
</style>
