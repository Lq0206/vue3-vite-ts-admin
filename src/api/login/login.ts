/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 14:21:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-30 14:22:32
 */
import http from "@/utils/axios";
import * as T from "./types";

const loginApi: T.ILoginApi = {
  login(params) {
    return http.post("/login", params);
  },
};
export default loginApi;
