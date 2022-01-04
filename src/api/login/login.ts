/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 14:21:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 10:41:47
 */
import http from "@/utils/axios";
import * as T from "./types";

const loginApi: T.ILoginApi = {
  login(params: T.ILoginParams) {
    return http.post("/login", params);
  },
};
export default loginApi;
