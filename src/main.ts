/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 15:33:24
 */
import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
import { setupStore } from "@/store/index";
import "element-plus/es/components/message/style/css";
import "nprogress/nprogress.css";
import "@/mock/mock";

async function bootstrap() {
  const app = createApp(App);
  app.config.globalProperties.$ELEMENT = { size: "medium", zIndex: 3000 };

  await setupStore(app);

  // 挂载路由
  await setupRouter(app);
  await router.isReady();
  // app.use(router);
  await app.mount("#app", true);
}

void bootstrap();
