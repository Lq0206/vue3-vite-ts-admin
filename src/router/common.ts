/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 11:44:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 16:56:14
 */
// types: RouteRecordRaw
import { RouteRecordRaw } from "vue-router";
import BaseLayout from "@/layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: BaseLayout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/MainDashboard.vue"),
        meta: { title: "仪表盘" },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/UserLogin.vue"),
    meta: { title: "登录" },
  },
];

export default routes;
