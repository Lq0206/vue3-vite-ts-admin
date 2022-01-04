/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-31 10:26:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 16:08:41
 */
import Mock from "mockjs";

const Random = Mock.Random;

export const loginInfo = {
  username: "admin",
  password: "admin",
};

export const userInfo = {
  username: "admin super",
  roles: ["admin"],
  userId: 1,
  avatar: Random.image(),
  desc: "admin super",
  permissions: [],
};
