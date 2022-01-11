<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-31 15:05:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-11 14:42:21
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :default-active="activeMenu"
        :unique-opened="false"
        :collapse-transition="false"
        active-text-color="#0a60bd"
        background-color="#0c2135"
        class="el-menu-vertical-demo"
        text-color="#b7bdc3"
        mode="vertical"
      >
        <SideBarItem
          v-for="routeItem in routes"
          :key="routeItem.path"
          :item="routeItem"
          :base-path="routeItem.path"
        ></SideBarItem>
      </el-menu>
    </el-scrollbar>
    <a class="menu-toggle" @click="toggleSideBar">
      <el-icon v-if="!isCollapse"><d-arrow-left /></el-icon>
      <el-icon v-else><DArrowRight /></el-icon>
    </a>
  </div>
</template>

<script setup lang="ts">
import { DArrowLeft, DArrowRight } from "@element-plus/icons-vue";
import { computed, provide } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/store/modules/settings";
import { useAppStore } from "@/store/modules/app";

import logo from "./SideBarLogo.vue";
import SideBarItem from "./SideBarItem.vue";
import { useAsyncRouterStore } from "@/store/modules/asyncRouter";

const route = useRoute();
const useSettings = useSettingsStore();
const useApp = useAppStore();
const useAsyncRouter = useAsyncRouterStore();

const activeMenu = computed((): string => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});

const sideBar = computed(() => useApp.sidebar);
const showLogo = computed(() => useSettings.sidebarLogo);
const isCollapse = computed(() => !sideBar.value.opened);
provide("isCollapse", isCollapse);
const routes = computed(() => useAsyncRouter.routes);

const toggleSideBar = () => {
  useApp.toggleSideBar();
};
</script>
<style lang="scss">
.menu-toggle {
  position: absolute;
  height: 30px;
  line-height: 36px;
  bottom: 0;
  left: 0;
  right: 0;
  color: rgba(#fff, 0.74);
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-size: 20px;
  text-align: center;
  transition: color 0.28s ease;
  &:hover {
    color: #fff;
  }
}

.el-menu-item.is-active {
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}
</style>
