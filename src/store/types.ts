/*
 * @Descripttion: user state types
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 14:38:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-18 16:26:55
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
  themeModel: boolean;
  isSwitch: boolean;
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

// tagsView
export interface ITagsViewState {
  visitedViews: Array<RouteRecordRaw>;
  cachedViews: Array<RouteRecordRaw>;
}
