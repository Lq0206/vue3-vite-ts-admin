/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-12-30 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 17:12:52
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    // .gz
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    AutoImport({
      imports: ["vue"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/main.scss";',
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    https: false,
    proxy: {},
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
