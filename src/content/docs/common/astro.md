---
title: "Astro 部署笔记"
description: "Astro 部署到 GitHub Pages 记录"
---

### Astro 是什么？

Astro 是**集多功能于一体的 Web 框架**，用于构建**快速、以内容为中心**的网站。

### 主要特性

- **组件支持:** 更快构建网站的新 web 架构。
- **服务器优先的 API 设计:** 去除高成本的 Hydration。
- **默认零 JS:** 没有 JavaScript 运行时开销。
- **边缘就绪:** 可以在任何地方部署，甚至像 Deno 或 Cloudflare 这样的全球边缘运行时。
- **可定制:** Tailwind, MDX 和 100 多个其他集成可供选择。
- **不依赖特定 UI:** 支持 React, Preact, Svelte, Vue, Solid, Lit 等等。

有关 Astro 功能的详细信息，请查阅<a href="https://docs.astro.build/zh-cn/concepts/why-astro/" target="_blank">为什么选择 Astro</a>的详细说明。✨

### 创建项目

这里以 yarn 为例：

```powershell
# 使用 yarn 创建新项目
yarn create astro
```

注意这样只是创建一个默认的 Astro 项目，如果需要安装模板，创建时要加一个 `--template` 参数，支持从<a href="https://github.com/withastro/astro/tree/main/examples" target="_blank">官方示例</a>或者任何 GitHub 存储库的 `main` 分支创建 astro 项目。

```powershell
# 使用官方示例创建一个新项目
yarn create astro --template <example-name>

# 基于某个 GitHub 仓库的 main 分支创建一个新项目
yarn create astro --template <github-username>/<github-repo>
```

此命令默认使用模板仓库的 `main` 分支。如果指定分支，可以加在 `--template` 的参数中：`<github-username>/<github-repo>#<branch>`。

可以在<a href="https://astro.build/themes/" target="_blank">官方主题</a>中浏览博客、个人作品集、文档、落地页等主题！ 也可以<a href="https://github.com/search?o=desc&q=astro+starter&s=stars&type=Repositories" target="_blank">在 GitHub 上搜索</a>更多入门项目。

项目结构和框架我就不赘述了，可以查看<a href="https://docs.astro.build/zh-cn/core-concepts/project-structure/" target="_blank">官方文档</a>。

### 部署到 GitHub Pages

在部署的时候踩了一些坑，因为 Astro 是比较新的框架嘛，网上也找不到相应的资料，只能自己踩坑，不断地试错。这里以我的笔记网站  <a href="https://w3way.top" target="_blank">`w3way.top`</a> 为例：

#### GitHub Pages 部署配置

GitHub Pages 部署配置就不需要我来赘述了，网上有很多教程。

需要注意的几点：
Source 选择 GitHub Actions。

如果有域名的话，可以添加域名，正常情况下，等待几分钟 GitHub 就会成功申请证书，Enforce HTTPS 就可以勾选了。

需要注意，如果使用了 CDN，要先改成回源，不然 GitHub 检测不到源站，就无法自动申请证书，就无法勾选 Enforce HTTPS。

![image-20230317200216740](/images/astro_github_pages.png)

#### Astro 项目配置

在配置文件  `astro.config.mjs`  中设置 `site`，并根据需要设置 `base` 选项。

```jsx
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://astronaut.github.io',
  base: '/my-repo',
})
```

`site` 最终部署的地址，或者说是网站链接。如果是 Github Pages，应当为 `https://<YOUR_USERNAME>.github.io`，如果有域名，则应该是 <a href="https://w3way.top" target="_blank">`https://w3way.top`</a>。

`base` 存储库的名称，以（`/`）开头，例如 `/w3way`。告诉 Astro 你的网站的根目录是 `/w3way`，而非默认的 `/`。这是有一个**坑**，如果你的网站是子网站，比如 `w3h5.com/w3way`，需要配置 `base`。如果不是，则不需要配置，默认不写，或者指定 `/` 就可以，不然部署完访问时会多出一层 `w3way`。

另外，首页不要使用 `index`，可以指定为 `home`。这里我又踩**坑**了，重定向到 `/index`，部署到 GitHub Pages 打开空白，需要访问 `w3way.top/index/index` 才显示页面，但是这样的话样式又找不到样式，显示一堆文字。所以不要使用 `index` 作为首页，这个问题让我郁闷了好久。

#### 创建 deploy 文件

在项目的根目录创建 `.github/workflows/` 目录，在目录中建一个 `deploy.yml` 文件，将以下 YAML 配置复制过去：

```yaml
name: GitHub Pages Astro CI

on:
  # 每次推送到 `main` 分支时触发这个“工作流程”
  # 如果你使用了别的分支名，请按需将 `main` 替换成你的分支名
  push:
    branches: [ main ]
  # 允许你在 GitHub 上的 Actions 标签中手动触发此“工作流程”
  workflow_dispatch:
  
# 允许 job 克隆 repo 并创建一个 page deployment
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v3
      - name: Install, build, and upload your site
        uses: withastro/action@v0

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

官方提供的配置会检测你首选的包管理器（`npm`、`yarn` 或 `pnpm`）。应该将包管理器自动生成的 `package-lock.json`、`yarn.lock` 或 `pnpm-lock.yaml` 文件提交到 Git 仓库。

每次提交代码更改，GitHub Actions 会自动部署发布。

