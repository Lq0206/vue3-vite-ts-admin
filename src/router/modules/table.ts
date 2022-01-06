/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 16:38:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-06 10:33:28
 */

import { RouteRecordRaw } from "vue-router";
import BaseLayout from "@/layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/table",
    component: BaseLayout,
    name: "table",
    meta: {
      title: "Table",
      icon: "iconfont icon-table",
      hidden: false,
      roles: ["admin", "visitor"],
    },
    children: [
      {
        path: "normalTable",
        component: () => import("@/views/table/normalTable.vue"),
        name: "normalTable",
        meta: {
          title: "普通表格",
          hidden: false,
          icon: "iconfont icon-table",
          roles: ["admin", "visitor"],
        },
      },
      {
        path: "proTable",
        component: () => import("@/views/table/proTable.vue"),
        name: "proTable",
        meta: {
          title: "proTable",
          hidden: false,
          icon: "iconfont icon-table",
          roles: ["admin"],
        },
      },
    ],
  },
];

export default routes;
