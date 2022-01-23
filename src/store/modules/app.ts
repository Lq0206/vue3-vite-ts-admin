/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 14:34:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-18 16:28:35
 */
import { defineStore } from "pinia";
import ls from "@/utils/storage/index";
import { IAppState } from "../types";
export const useAppStore = defineStore({
  id: "app",
  state: (): IAppState => ({
    sidebar: {
      opened: ls.get("sidebarStatus"),
      withoutAnimation: false,
    },
    device: "desktop",
    size: ls.get("size") || "default",
    themeModel: ls.get("themeModel"),
    isSwitch: ls.get("isSwitch") || false,
  }),
  getters: {
    getSize(): string {
      return this.size;
    },
    getThemeModel(): boolean {
      return this.themeModel;
    },
  },
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      ls.set("sidebarStatus", this.sidebar.opened);
    },
    setSize(size: string) {
      this.size = size;
    },
    setIsSwitch(value: boolean) {
      this.isSwitch = value;
      ls.set("isSwitch", value);
    },
    toggleThemeModel(value: boolean) {
      this.themeModel = value;
      ls.set("themeModel", this.themeModel);
      return Promise.resolve(value);
    },
    // closeSideBar({ commit }, { withoutAnimation }) {
    //   ls.set("sidebarStatus", 0);
    //   this.sidebar.opened = false;
    //   this.sidebar.withoutAnimation = withoutAnimation;
    // },
    // toggleDevice({ commit }, device) {
    //   commit("TOGGLE_DEVICE", device);
    // },
    // setSize({ commit }, size) {
    //   commit("SET_SIZE", size);
    // },
  },
});
