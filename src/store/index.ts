/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 14:33:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 11:10:53
 */
import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

export function setupStore(app: App<Element>) {
  console.log("install pinia");
  app.use(store);
}

export { store };
