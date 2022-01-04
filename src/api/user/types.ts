/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-04 10:38:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 11:39:35
 */
export interface IUser {
  getUserInfo: (token: string) => Promise<any>;
}
