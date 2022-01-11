/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 16:57:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 16:42:43
 */
import { Router, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { whiteList } from "./whiteList";
import getPageTitle from "@/utils/getPageTitle";
import { useUserStoreWidthOut } from "@/store/modules/user";
import { useAsyncRouterWidthOut } from "@/store/modules/asyncRouter";
import ls from "@/utils/storage";
import { ACCESS_TOKEN } from "@/store/mutation-types";

export function createRouterPermission(router: Router) {
  const userStore = useUserStoreWidthOut();
  const asyncRouterStore = useAsyncRouterWidthOut();
  router.beforeEach(async (to: any, from, next) => {
    NProgress.start();
    document.title = getPageTitle(to.meta.title);
    const hasToken = ls.get(ACCESS_TOKEN);
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
              // console.log("动态路由加载完毕", asyncRouterStore.getRoutes);
              // 确保动态路由加载完毕
              await next({ ...to, replace: true });
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

  router.onError((e) => {
    console.log(e);
  });
}
