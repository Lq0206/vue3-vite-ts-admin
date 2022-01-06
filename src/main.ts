/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 17:50:16
 */
import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
import { setupStore } from "@/store/index";
import "@/mock/mock";

async function bootstrap() {
  const app = createApp(App);

  await setupStore(app);

  // 挂载路由
  await setupRouter(app);
  await router.isReady();
  // app.use(router);
  await app.mount("#app", true);
}

void bootstrap();
