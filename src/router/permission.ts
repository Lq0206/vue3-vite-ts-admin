/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 16:57:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 19:19:30
 */
import { Router, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { whiteList } from "./whiteList";
import getPageTitle from "@/utils/getPageTitle";
import { useUserStoreWidthOut } from "@/store/modules/user";
import { useAsyncRouterWidthOut } from "@/store/modules/asyncRouter";

export function createRouterPermission(router: Router) {
  console.log(123);
  const userStore = useUserStoreWidthOut();
  const asyncRouterStore = useAsyncRouterWidthOut();
  router.beforeEach(async (to: any, from, next) => {
    console.log(to.matched);
    // if (to.matched.length == 0) {
    //   router.push(to.path);
    // }
    console.log(223);
    NProgress.start();
    document.title = getPageTitle(to.meta.title);
    const hasToken = userStore.getToken;
    if (hasToken) {
      console.log(1);
      if (to.path === "/login") {
        next({ path: "/" });
        NProgress.done();
      } else {
        const hasRoles = userStore.getRoles && userStore.getRoles.length > 0;
        if (hasRoles) {
          console.log(2);
          next();
        } else {
          console.log(3);
          try {
            const { roles } = await userStore.getUserInfo();
            const accessRoutes: RouteRecordRaw[] =
              await asyncRouterStore.generateRoutes(roles);
            if (accessRoutes.length > 0) {
              accessRoutes.forEach((rIrem: RouteRecordRaw) => {
                router.addRoute(rIrem);
              });
              console.log("动态路由加载完毕", asyncRouterStore.getRoutes);
              console.log(4);
              await next();
            }
          } catch (e) {
            return Promise.reject(e);
          }
        }
      }
    } else {
      const flag = whiteList.indexOf(to.path) !== -1;
      if (flag) {
        console.log(5);
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
