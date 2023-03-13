/*
 * @Author: Deshun
 * @Date: 2023-03-06 17:03:29
 * @LastEditors: Deshun
 * @LastEditTime: 2023-03-13 12:08:48
 * @FilePath: \w3way\src\consts.ts
 * @Description: 常量
 */
export const SITE = {
  title: "w3Way",
  description: "前端学习路径",
  defaultLanguage: "en-us",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true",
    alt:
      "astro logo on a starry expanse of space," +
      " with a purple saturn-like planet floating in the right foreground",
  },
  twitter: "astrodotbuild",
};

export const KNOWN_LANGUAGES = {
  English: "en",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const LINKS = [
  {
    name: "前端资源网",
    url: "https://www.w3h5.com",
  },
  {
    name: "德顺博客",
    url: "https://www.dblog.cc",
  },
];
// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX",
};

export type Sidebar = Record<
  (typeof KNOWN_LANGUAGE_CODES)[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  en: {
    '常用': [{ text: "TypeScript笔记", link: "common/typescript" }],
    React: [{ text: "学习笔记", link: "react/react-note" }],
    Rust: [{ text: "介绍", link: "rust/introduction" }],
  },
};
