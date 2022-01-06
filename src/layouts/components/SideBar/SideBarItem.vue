<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-05 14:23:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-06 17:14:22
-->
<template>
  <template v-if="!item.meta.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{
            'submenu-title-noDropdown': !isNest,
          }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <SideBarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import path from "path-browserify";
import { isExternal } from "@/utils/validate";
import Item from "./Item.vue";
import AppLink from "./AppLink.vue";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});
// console.log("props", props.item);
const router = useRouter();

const isCollapse = inject("isCollapse");

const onlyOneChild = ref(null);

// methods

const hasOneShowingChild = (children = [], parent: any) => {
  const showingChildren = children.filter((item: any) => {
    if (item.meta.hidden) {
      return false;
    }
    onlyOneChild.value = item;
    return true;
  });

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>
<style lang="scss" scoped></style>
