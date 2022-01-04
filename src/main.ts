/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 11:20:01
 */
import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
import { setupStore } from "@/store";
import "@/mock/mock";

async function bootstrap() {
  console.log("ready create app");
  const app = createApp(App);

  await setupStore(app);

  // 挂载路由
  await setupRouter(app);
  await router.isReady();
  // app.use(router);
  app.mount("#app", true);
}

void bootstrap();
