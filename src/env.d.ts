/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 17:45:01
 */
/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module "@/utils/*";
// declare module "@/store/*";
