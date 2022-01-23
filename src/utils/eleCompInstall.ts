/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-19 15:40:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-19 17:35:34
 */
import { App, ComponentInternalInstance } from "vue";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

export function installEl(app: App) {
  app.config.globalProperties.$message = ElMessage;
  app.config.globalProperties.$messageBox = ElMessageBox;
  app.config.globalProperties.$notification = ElNotification;
}

// types
export interface IComponentInternalInstance extends ComponentInternalInstance {
  $message: any;
  $messageBox: any;
  $notification: any;
}
