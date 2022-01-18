/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-17 17:46:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-17 17:50:26
 */
import { addClass, removeClass } from "@/utils";

export const handleClass = async (value: any) => {
  if (value) {
    addClass(window.document.documentElement, "dark");
  } else {
    removeClass(window.document.documentElement, "dark");
  }
};
