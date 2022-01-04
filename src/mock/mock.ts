/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 10:26:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 16:33:16
 */
import Mock from "mockjs";
import { loginInfo, userInfo } from "./modules/user";
import { routes } from "./modules/routes";

const Random = Mock.Random;
export const token = Random.string("adminsuper", 32, 32);

const login = (res: any) => {
  const { username, password } = JSON.parse(res.body);
  if (username !== loginInfo.username || password !== loginInfo.password) {
    return {
      code: 401,
      message: "用户账号或密码不正确",
    };
  }
  return {
    code: 200,
    data: token,
  };
};

const getUserInfo = (res: any) => {
  const resToken = JSON.parse(res.body);
  if (!resToken) {
    return {
      code: 401,
      message: "获取用户信息错误(token不正确)",
    };
  }
  return {
    code: 200,
    data: userInfo,
  };
};

const getRoutes = () => {
  return {
    code: 200,
    data: routes,
  };
};

Mock.mock("/login", "post", login);
Mock.mock("/user/getUserInfo", getUserInfo);
Mock.mock("/getRoutes", "get", getRoutes);
