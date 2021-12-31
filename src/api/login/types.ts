/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 14:21:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-30 17:34:48
 */
export interface ILoginParams {
  username: string;
  password: string | number;
}
export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>;
}
