/*
 * @Descripttion: user state types
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 14:38:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 15:04:14
 */

import { RouteRecordRaw } from "vue-router";

// UserState
export interface IUserState {
  token: string;
  username: string;
  avatar: string;
  roles: Array<string>;
  userInfo: object;
}

// AppState
export interface IAppState {
  sidebar: {
    opened: boolean;
    withoutAnimation: false;
  };
  device: string;
  size: string;
}

// AsyncRouter
export interface IAsyncRouterState {
  routes: RouteRecordRaw[];
  addRoutes: RouteRecordRaw[];
}

// Settings
export interface ISettingsState {
  title: string;
  theme?: any;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  darkMode?: boolean;
}
