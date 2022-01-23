<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-31 15:46:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 15:00:14
-->
<template>
  <section class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <transition name="slide-fade">
        <keep-alive :include="cachedViews">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { useTagsViewStore } from "@/store/modules/tagsView";
import { useRoute } from "vue-router";
const useTagsView = useTagsViewStore();

const cachedViews = useTagsView.getCachedViews as any;
const key = useRoute().path;
</script>
<style lang="scss">
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
  background: var(--container-bg-color-2);
}

.fixed-header + .app-main {
  padding-top: 70px;
  min-height: 100vh;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }
  // 全开
  .fixed-header + .app-main {
    padding-top: 104px;
    min-height: 100vh;
  }
}
</style>
<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
