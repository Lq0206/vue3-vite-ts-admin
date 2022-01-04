/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-04 10:38:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 11:40:08
 */

import http from "@/utils/axios";
import * as T from "./types";

const userApi: T.IUser = {
  getUserInfo(token: string) {
    console.log("userApi", token);
    return http.post("/user/getUserInfo", token);
  },
};

export default userApi;
