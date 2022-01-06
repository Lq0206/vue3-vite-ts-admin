/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 16:26:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 18:08:40
 */
import { App } from "vue";
import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  _RouteRecordBase,
} from "vue-router";
import common from "./common";
import { createRouterPermission } from "./permission";

// route: item.hidden 是否在菜单中显示

const modules = import.meta.globEager("./modules/**/*.ts");
const routeModuleList: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList: Array<RouteRecordRaw> = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [...routeModuleList];

export const constantRouter: Array<RouteRecordRaw> = [...common];

export const router = createRouter({
  history: createWebHashHistory(""),
  routes: constantRouter,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  createRouterPermission(router);
  app.use(router);
}

export default router;
