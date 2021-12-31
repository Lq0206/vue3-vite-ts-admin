/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-30 17:54:25
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { setupStore } from "@/store";

const app = createApp(App);

setupStore(app);
app.use(router);
app.mount("#app");
