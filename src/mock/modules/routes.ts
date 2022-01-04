/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 15:52:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-31 15:57:23
 */
export const routes = [
  {
    path: "/table",
    component: "Layout",
    name: "table",
    meta: { title: "Table", icon: "el-icon-date", roles: ["admin", "visitor"] },
    children: [
      {
        path: "/table/normalTable",
        component: "/table/normalTable",
        name: "normalTable",
        meta: { title: "普通表格", icon: "", roles: ["admin", "visitor"] },
      },
      {
        path: "/table/proTable",
        component: "/table/proTable",
        name: "proTable",
        meta: { title: "proTable", icon: "", roles: ["admin"] },
      },
    ],
  },
  {
    path: "/userCenter",
    component: "Layout",
    meta: {
      title: "个人页",
      icon: "el-icon-user",
      roles: ["admin", "visitor"],
    },
    children: [
      {
        path: "/userManage",
        name: "UserManage",
        component: "/user/index",
        meta: { title: "用户管理", icon: "", roles: ["admin", "visitor"] },
      },
      {
        path: "/setting",
        name: "Setting",
        props: true,
        component: "/user/setting",
        meta: { title: "个人设置", icon: "", roles: ["admin", "visitor"] },
      },
    ],
  },
];
