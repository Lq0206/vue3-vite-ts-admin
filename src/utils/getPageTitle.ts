/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-04 10:02:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 10:12:34
 */
import { defaultSettings } from "@/config/setting";

const sysTitle = defaultSettings.title || "Vite Admin Template";

export default function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${sysTitle}`;
  }
  return `${sysTitle}`;
}
