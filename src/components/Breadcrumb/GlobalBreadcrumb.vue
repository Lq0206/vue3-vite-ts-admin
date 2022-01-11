<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-07 10:55:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-11 11:12:40
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in (levelList as any)"
        :key="item.path"
      >
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { compile } from "path-to-regexp";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter, RouteRecordRaw } from "vue-router";

const route = useRoute();
const router = useRouter();

const levelList = ref([]);

// watch
watch(
  () => route.path,
  (cur, old) => {
    if (cur.startsWith("/redirect/")) {
      return;
    }
    getBreadcrumb();
  }
);
onMounted(() => {
  getBreadcrumb();
});

const getBreadcrumb = () => {
  let matched: any = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
  const first = matched[0];

  if (!isDashboard(first)) {
    matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(
      matched
    );
  }

  levelList.value = matched.filter(
    (item: any) =>
      item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};

// methods
const isDashboard = (route: RouteRecordRaw) => {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return (
    (name as string).trim().toLocaleLowerCase() ===
    "Dashboard".toLocaleLowerCase()
  );
};

const pathCompile = (path: string) => {
  const { params } = route;
  const toPath = compile(path);
  return toPath(params);
};

const handleLink = (item: any) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(pathCompile(path));
};
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 16px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
