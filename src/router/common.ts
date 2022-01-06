/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 11:44:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-06 10:31:28
 */
// types: RouteRecordRaw
import { RouteRecordRaw } from "vue-router";
import BaseLayout from "@/layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: BaseLayout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/routeRedirect.vue"),
      },
    ],
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: BaseLayout,
    meta: { hidden: false },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/MainDashboard.vue"),
        meta: {
          title: "仪表盘",
          icon: "iconfont icon-dashboard",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/UserLogin.vue"),
    meta: { title: "登录", hidden: true },
  },
];

export default routes;
