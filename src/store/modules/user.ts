/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 14:35:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-30 17:55:11
 */
import { defineStore } from "pinia";
import { IUserState } from "../types";
import ls from "@/utils/storage/index";
import { ACCESS_TOKEN } from "../mutation-types";
import loginApi from "@/api/login/login";
import { ILoginParams } from "@/api/login/types";
import { ResultEnum } from "@/enums/http";

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => ({
    token: ls.get(ACCESS_TOKEN, ""),
    username: "超级管理员",
    avatar: "",
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    async login(userInfo: ILoginParams) {
      try {
        const expiry = 7 * 24 * 60 * 60 * 1000;
        this.setToken(JSON.stringify(userInfo));
        ls.set(ACCESS_TOKEN, userInfo, expiry);
        // const res = await loginApi.login(userInfo);
        // const { code, result } = res;
        // if (code === ResultEnum.SUCCESS) {
        //   const expiry = 7 * 24 * 60 * 60 * 1000;
        //   ls.set(ACCESS_TOKEN, "22323232", expiry);
        // }
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
});
