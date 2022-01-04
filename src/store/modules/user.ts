/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 14:35:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 16:34:54
 */
import { defineStore } from "pinia";
import { IUserState } from "../types";
import ls from "@/utils/storage/index";
import { ACCESS_TOKEN } from "../mutation-types";
import loginApi from "@/api/login/login";
import userApi from "@/api/user/user";
import { ILoginParams } from "@/api/login/types";
import { ResultEnum } from "@/enums/http";
import { store } from "@/store";

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => ({
    token: ls.get(ACCESS_TOKEN, ""),
    username: "",
    avatar: "",
    roles: [],
    userInfo: {},
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getRoles(): Array<string> {
      return this.roles;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setRoles(roles: Array<string>) {
      this.roles = roles;
    },
    /**
     * 用户登录
     * @param userInfo
     * @returns 登录信息
     */
    async login(userInfo: ILoginParams) {
      try {
        const res = await loginApi.login(userInfo);
        const { code, data } = res;
        if (code === ResultEnum.SUCCESS) {
          // setting...
          const expiry = 7 * 24 * 60 * 60 * 1000;
          this.setToken(data);
          ls.set(ACCESS_TOKEN, data, expiry);
          return Promise.resolve(res);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * 获取用户信息
     * @returns 用户信息
     */
    async getUserInfo() {
      try {
        const res = await userApi.getUserInfo(this.getToken);
        return Promise.resolve(res.data);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * 用户登出
     */
    async loginOut() {
      try {
        this.setToken("");
        ls.remove(ACCESS_TOKEN);
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
});

export const useUserStoreWidthOut = () => useUserStore(store);
