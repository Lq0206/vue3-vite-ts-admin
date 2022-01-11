/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-04 10:38:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 10:47:39
 */

import http from "@/utils/axios";
import * as T from "./types";

const userApi: T.IUser = {
  getUserInfo(token: string) {
    return http.post("/user/getUserInfo", token);
  },
};

export default userApi;
