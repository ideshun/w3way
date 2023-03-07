/*
 * @Author: Deshun
 * @Date: 2023-03-06 17:03:29
 * @LastEditors: Deshun
 * @LastEditTime: 2023-03-07 12:03:08
 * @FilePath: \w3way\astro.config.mjs
 * @Description: 文件描述
 */
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [
    // Enable Preact to support Preact JSX components.
    preact(),
    // Enable React for the Algolia search component.
    react(),
  ],
});
