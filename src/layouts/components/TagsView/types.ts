/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-10 10:18:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-10 10:23:46
 */
import { RouteRecordRaw } from "vue-router";
export interface IState {
  visible: boolean;
  top: number;
  left: number;
  selectedTag: object;
  affixTags: any[];
}
