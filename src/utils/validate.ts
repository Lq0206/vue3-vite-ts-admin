/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-05 14:27:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 14:27:53
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
