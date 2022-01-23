/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 09:59:00
 */
import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
import { setupStore } from "@/store/index";
import { installEl } from "./utils/eleCompInstall";
import "nprogress/nprogress.css";
import "@/styles/main.scss";
import "@/mock/mock";

async function bootstrap() {
  const app = createApp(App);

  await setupStore(app);
  await installEl(app);
  // 挂载路由
  await setupRouter(app);
  await router.isReady();
  // app.use(router);
  await app.mount("#app", true);
}

void bootstrap();
