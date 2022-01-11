/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 16:03:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 17:29:29
 */
import { asyncRoutes, constantRouter } from "@/router";
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { store } from "@/store";
import { IAsyncRouterState } from "../types";

interface checkRoute {
  routes: RouteRecordRaw;
  flag: boolean;
}

const hasPermission = (roles: string[], route: any) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  }
  return true;
};

export const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  roles: string[]
) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmp: any = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
};

export const useAsyncRouterStore = defineStore({
  id: "asyncRouter",
  state: (): IAsyncRouterState => ({
    routes: [],
    addRoutes: [],
  }),
  getters: {
    getRoutes(): RouteRecordRaw[] {
      return this.routes;
    },
  },
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes;
      this.routes = constantRouter.concat(routes);
    },
    generateRoutes(roles: string[]): Promise<RouteRecordRaw[]> {
      return new Promise((resolve) => {
        let accessedRoutes: RouteRecordRaw[];
        if (roles.includes("admin")) {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        accessedRoutes.push({
          path: "/:pathMatch(.*)*",
          name: "NotFound",
          meta: { title: "找不到页面", hidden: true },
          component: () => import("@/views/errorPages/404Page.vue"),
        });
        this.setRoutes(accessedRoutes);
        resolve(accessedRoutes);
      });
    },
  },
});

export const useAsyncRouterWidthOut = () => useAsyncRouterStore(store);
