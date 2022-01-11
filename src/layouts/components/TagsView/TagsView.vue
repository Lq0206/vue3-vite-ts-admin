<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-06 17:29:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-11 14:31:45
-->
<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-scrollbar>
      <div class="flex-content">
        <router-link
          v-for="(tag, i) in visitedViews"
          :ref="(el) => ((tagList[i] as any) = el)"
          :key="tag.path"
          :class="[
            isActive(tag) ? 'active' : '',
            !isAffix(tag) ? 'is-affix' : '',
          ]"
          :to="{ path: tag.path }"
          class="tags-view-item"
          @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          {{ tag?.meta?.title }}
          <span
            v-if="!isAffix(tag)"
            class="iconfont icon-close tag-icon"
            @click.prevent.stop="closeSelectedTag(tag)"
          />
        </router-link>
      </div>
    </el-scrollbar>
    <ul
      v-show="state.visible"
      :style="{ left: state.left + 'px', top: state.top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(state.selectedTag)">Refresh</li>
      <li
        v-if="!isAffix(state.selectedTag)"
        @click="closeSelectedTag(state.selectedTag)"
      >
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(state.selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useTagsViewStore } from "@/store/modules/tagsView";
import {
  computed,
  reactive,
  ref,
  watch,
  nextTick,
  getCurrentInstance,
  ComponentInternalInstance,
  onMounted,
} from "vue";
import { RouteRecordRaw } from "vue-router";
import { useAsyncRouterStore } from "@/store/modules/asyncRouter";
import path from "path-browserify";
import * as T from "./types";
const route = useRoute();
const router = useRouter();
const useTagsView = useTagsViewStore();
const useAsyncRouter = useAsyncRouterStore();
// state
const state: T.IState = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  affixTags: [],
});
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const tagList = ref([]);

// computed
const visitedViews = computed(() => useTagsView.visitedViews);
const routes = computed(() => {
  return JSON.parse(JSON.stringify(useAsyncRouter.routes));
});

watch(
  () => route.path,
  () => {
    addTags();
    moveToCurrentTag();
  }
);

watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener("click", closeMenu);
    } else {
      document.body.removeEventListener("click", closeMenu);
    }
  }
);

// methods
const initTags = () => {
  const affixTags = (state.affixTags = filterAffixTags(routes.value) || []);
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      useTagsView.addVisitedView(tag);
    }
  }
};

const addTags = () => {
  const { name } = route;
  if (name) {
    useTagsView.addView(route);
  }
  return false;
};

const isActive = (_route: RouteRecordRaw) => {
  return _route.path === route.path;
};

const isAffix = (tag: any) => {
  return tag.meta && tag.meta.affix;
};
const filterAffixTags = (routes: Array<any>, basePath = "/") => {
  let tags: any = [];
  if (routes) {
    routes.forEach((route) => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta },
        });
      }
      if (route.children) {
        const tempTags: any[] =
          filterAffixTags(route.children, route.path) || [];
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags];
        }
      }
    });
    return tags;
  }
};

const moveToCurrentTag = () => {
  const tags: any[] = tagList.value;
  nextTick(() => {
    for (const tag of tags) {
      if (tag?.to?.path === route?.path) {
        if (tag.to.fullPath !== route.fullPath) {
          useTagsView.updateVisitedView(route);
        }
        break;
      }
    }
  });
};
const closeSelectedTag = async (view: any) => {
  const { visitedViews } = await useTagsView.delView(view);
  if (isActive(view)) {
    toLastView(visitedViews, view);
  }
};
const openMenu = (tag: any, e: any) => {
  const _this = proxy?.$el;
  const menuMinWidth = 105;
  const offsetLeft = _this.getBoundingClientRect().left;
  const offsetWidth = _this.offsetWidth;
  const maxLeft = offsetWidth - menuMinWidth;
  const left = e.clientX - offsetLeft + 15;

  if (left > maxLeft) {
    state.left = maxLeft;
  } else {
    state.left = left;
  }

  state.top = e.clientY;
  state.visible = true;
  state.selectedTag = tag;
};
const refreshSelectedTag = async (view: any) => {
  const arr: any[] = (await useTagsView.delCachedView(view)) as any[];
  if (arr.length > 0) {
    const { fullPath } = view;
    nextTick(() => {
      router.replace({
        path: "/redirect" + fullPath,
      });
    });
  }
};
const closeAllTags = async (view: any) => {
  const { visitedViews } = await useTagsView.delAllViews();
  if (state.affixTags.some((tag) => tag.path === view.path)) {
    return;
  }
  toLastView(visitedViews, view);
};
const closeOthersTags = async () => {
  router.push(state.selectedTag);
  await useTagsView.delOthersViews(state.selectedTag);
};
const toLastView = (visitedViews: any, view: any) => {
  const latestView: any = visitedViews.slice(-1)[0];
  if (latestView) {
    router.push(latestView?.fullPath);
  } else if (view.name === "Dashboard") {
    router.replace({ path: "/redirect" + view.fullPath });
  } else {
    router.push("/");
  }
};

const closeMenu = () => {
  state.visible = false;
};

onMounted(async () => {
  await initTags();
  await addTags();
});
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.flex-content {
  display: flex;
}
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    border-radius: 4px;
    -webkit-transition: all 300ms ease-in-out;
    transition: all 300ms ease-in-out;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background: $gradual-bg;
      color: #fff;
      border-color: #764ba2;
    }
    // &.is-affix:hover {
    //   .tag-icon {
    //   }
    // }
    .tag-icon {
      // border-radius: 50%;
      font-size: 12px;
      border-radius: 50%;
      &:hover {
        // background-color: #fff;
        color: red;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
