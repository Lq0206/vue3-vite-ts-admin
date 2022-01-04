/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 16:57:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 16:55:59
 */
import { Router, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { whiteList } from "./whiteList";
import getPageTitle from "@/utils/getPageTitle";
import { useUserStoreWidthOut } from "@/store/modules/user";
import { useAsyncRouterWidthOut } from "@/store/modules/asyncRouter";

console.log("touter primission");

export function createRouterPermission(router: Router) {
  const userStore = useUserStoreWidthOut();
  const asyncRouterStore = useAsyncRouterWidthOut();
  router.beforeEach(async (to: any, from, next) => {
    NProgress.start();
    document.title = getPageTitle(to.meta.title);
    const hasToken = userStore.getToken;
    console.log("hastoken", hasToken);
    if (hasToken) {
      if (to.path === "/login") {
        next({ path: "/" });
        NProgress.done();
      } else {
        const hasRoles = userStore.getRoles && userStore.getRoles.length > 0;
        if (hasRoles) {
          next();
        } else {
          try {
            const { roles } = await userStore.getUserInfo();
            const accessRoutes: RouteRecordRaw[] =
              await asyncRouterStore.generateRoutes(roles);
            if (accessRoutes.length > 0) {
              accessRoutes.forEach((rIrem: RouteRecordRaw) => {
                router.addRoute(rIrem);
              });
              console.log("accessRoutes", accessRoutes);
              console.log("动态路由加载完毕", asyncRouterStore.getRoutes);
              // router.addRoute(...accessRoutes);
              next();
            }
          } catch (e) {
            return Promise.reject(e);
          }
        }
      }
    } else {
      const flag = whiteList.indexOf(to.path) !== -1;
      if (flag) {
        next();
      } else {
        next(`/login`);
        NProgress.done();
      }
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
