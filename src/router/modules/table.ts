/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 16:38:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-31 16:39:22
 */

import { RouteRecordRaw } from "vue-router";
import BaseLayout from "@/layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/table",
    component: BaseLayout,
    name: "table",
    meta: { title: "Table", icon: "el-icon-date", roles: ["admin", "visitor"] },
    children: [
      {
        path: "/table/normalTable",
        component: () => import("@/views/table/normalTable.vue"),
        name: "normalTable",
        meta: { title: "普通表格", icon: "", roles: ["admin", "visitor"] },
      },
      {
        path: "/table/proTable",
        component: () => import("@/views/table/proTable.vue"),
        name: "proTable",
        meta: { title: "proTable", icon: "", roles: ["admin"] },
      },
    ],
  },
];

export default routes;
