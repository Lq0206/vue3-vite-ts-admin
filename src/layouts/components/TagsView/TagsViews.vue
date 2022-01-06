<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-06 17:29:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-06 17:46:39
-->
<template>
  <div id="tags-view-container" class="tags-view-container">
    <!-- <el-scrollbar>
      <div class="flex-content">
        <router-link
          v-for="(tag, i) in visitedViews"
          :ref="(el) => (tagList[i] = el)"
          :key="tag.path"
          :class="isActive(tag) ? 'active' : ''"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          tag="span"
          class="tags-view-item"
          @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          {{ tag.title }}
          <span
            v-if="!isAffix(tag)"
            class="el-icon-close tag-icon"
            @click.prevent.stop="closeSelectedTag(tag)"
          />
        </router-link>
      </div>
    </el-scrollbar>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
</script>
<style lang="scss" scoped></style>
