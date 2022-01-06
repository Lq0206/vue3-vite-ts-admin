/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-05 09:29:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 15:04:08
 */
// import styles from "@/styles/element-variables.scss";
import { defaultSettings } from "@/config/settings";
import ls from "@/utils/storage";
import { defineStore } from "pinia";
import { ISettingsState } from "../types";
import { toRaw } from "vue";

const { title, showSettings, tagsView, fixedHeader, sidebarLogo } =
  defaultSettings;

export const useSettingsStore = defineStore({
  id: "settings",
  state: (): ISettingsState => ({
    title: title,
    theme: "",
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    darkMode: false,
  }),
  actions: {
    async changeSettings<T>(data: { key: string; value: T }) {
      const { key, value } = data;
      // call: Do not access Object.prototype method 'hasOwnProperty' from target object
      if (Object.prototype.hasOwnProperty.call(toRaw(this.$state), key)) {
        await Object.assign(this, { [key]: value });
        // set storage
        await ls.set(key, value);
      }
    },
  },
});
