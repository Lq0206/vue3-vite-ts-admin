/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 16:26:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 16:22:26
 */
import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import common from "./common";
import { createRouterPermission } from "./permission";

const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList: Array<RouteRecordRaw> = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
  console.log("routeModuleList", routeModuleList);
});

export const asyncRoutes = [...routeModuleList];
console.log("asyncRoutes", asyncRoutes);

export const constantRouter: Array<RouteRecordRaw> = [...common];

export const router = createRouter({
  history: createWebHashHistory(""),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  createRouterPermission(router);
}

export default router;
