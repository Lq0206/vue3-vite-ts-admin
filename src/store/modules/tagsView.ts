/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-06 17:51:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-11 09:31:21
 */
import { defineStore } from "pinia";
import { ITagsViewState } from "../types";
import { RouteRecordRaw } from "vue-router";
export const useTagsViewStore = defineStore({
  id: "tagsView",
  state: (): ITagsViewState => ({
    visitedViews: [],
    cachedViews: [],
  }),
  getters: {
    getCachedViews(): Array<RouteRecordRaw> {
      return this.cachedViews;
    },
  },
  actions: {
    addView(view: any) {
      this.addCachedView(view);
      this.addVisitedView(view);
    },
    addVisitedView(view: RouteRecordRaw) {
      if (this.visitedViews.some((v) => v.path === view.path)) {
        return;
      }
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view?.meta?.title || "no-name",
        })
      );
    },
    addCachedView(view: any) {
      if (this.cachedViews.includes(view.name)) {
        return;
      }
      if (!view?.meta?.noCache) {
        this.cachedViews.push(view.name);
      }
    },
    delView(view: any): Promise<{
      visitedViews: Array<RouteRecordRaw>;
      cachedViews: Array<RouteRecordRaw>;
    }> {
      return new Promise((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delVisitedView(view: RouteRecordRaw): Promise<Array<RouteRecordRaw>> {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...this.visitedViews]);
      });
    },
    delCachedView(view: any): Promise<Array<RouteRecordRaw>> {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name);
        index > -1 && this.cachedViews.splice(index, 1);
        resolve([...this.cachedViews] || []);
      });
    },
    delOthersViews(view: any): Promise<{
      visitedViews: Array<RouteRecordRaw>;
      cachedViews: Array<RouteRecordRaw>;
    }> {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delOthersVisitedViews(view: any): Promise<Array<RouteRecordRaw>> {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v: RouteRecordRaw) => {
          return v?.meta?.affix || v.path === view.path;
        });
        resolve([...this.visitedViews]);
      });
    },
    delOthersCachedViews(view: any): Promise<Array<RouteRecordRaw>> {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name);
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1);
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = [];
        }
        resolve([...this.cachedViews]);
      });
    },
    delAllViews(): Promise<{
      visitedViews: Array<RouteRecordRaw>;
      cachedViews: Array<RouteRecordRaw>;
    }> {
      return new Promise((resolve) => {
        this.delAllVisitedViews();
        this.delAllCachedViews();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delAllVisitedViews(): Promise<Array<RouteRecordRaw>> {
      return new Promise((resolve) => {
        const affixTags = this.visitedViews.filter((tag) => tag?.meta?.affix);
        this.visitedViews = affixTags;
        resolve([...this.visitedViews]);
      });
    },
    delAllCachedViews(): Promise<Array<RouteRecordRaw>> {
      return new Promise((resolve) => {
        this.cachedViews = [];
        resolve([...this.cachedViews]);
      });
    },
    updateVisitedView(view: any) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
});
