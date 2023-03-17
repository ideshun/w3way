/*
 * @Author: Deshun
 * @Date: 2023-03-06 17:03:29
 * @LastEditors: Deshun
 * @LastEditTime: 2023-03-17 11:16:51
 * @FilePath: \w3way\src\consts.ts
 * @Description: 常量
 */
export const SITE = {
  title: "w3Way",
  name: "前端笔记",
  description: "w3way前端开发笔记，记录工作和学习中的技术、资料和问题。",
  keywords: "前端,前端资料,前端开发,前端网站,前端笔记,前端面试题,前端开发博客,javascript,javascript教程,react,react教程,vue,vue教程,uni-app,微信小程序开发,微信小程序开发文档,大数据,人工智能,new bing,新必应,ChatGPT,低代码,WuJie,无界,微应用,乾坤,qiankun,乾坤微应用,nodejs,德顺网络,德顺博客,QQ1209278955,德顺QQ1209278955",
  defaultLanguage: "en-us",
} as const;

export const SITE_TITLE = `${SITE.title} - ${SITE.name}`

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

export type Sidebar = Record<
  (typeof KNOWN_LANGUAGE_CODES)[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  en: {
    '常用': [
      { text: "Git", link: "common/git" },
      { text: "Node", link: "common/node" },
      { text: "SEO", link: "common/seo" },
      { text: "TypeScript", link: "common/typescript" },
      { text: "VS Code", link: "common/vscode" },
      { text: "Yarn", link: "common/yarn" }
    ],
    React: [{ text: "学习笔记", link: "react/react-note" }],
    Rust: [{ text: "介绍", link: "rust/introduction" }],
  },
};
