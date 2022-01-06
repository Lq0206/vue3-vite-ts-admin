/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 14:34:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 17:07:56
 */
import { defineStore } from "pinia";
import ls from "@/utils/storage/index";
import { IAppState } from "../types";
export const useAppStore = defineStore({
  id: "app",
  state: (): IAppState => ({
    sidebar: {
      opened: ls.get("sidebarStatus") ? !!+ls.get("sidebarStatus") : true,
      withoutAnimation: false,
    },
    device: "desktop",
    size: ls.get("size") || "medium",
  }),
  getters: {},
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      ls.set("sidebarStatus", this.sidebar.opened);
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
