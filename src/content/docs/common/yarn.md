---
title: "Yarn 笔记"
description: "Yarn 笔记"
---

### yarn.lock 的版本锁定

关于 npm 依赖版本规则，可以参考我 [node#npm版本号的 ^ 和 ~](/common/node#npm版本号的--和) 这篇文章。

#### yarn.lock 的结构

```json
core-js-compat@^3.0.0:
  version "3.14.0"
  resolved "https://registry.npmjs.org/core-js-compat/-/core-js-compat-3.14.0.tgz#b574dabf29184681d5b16357bd33d104df3d29a5"
  integrity sha1-tXTavykYRoHVsWNXvTPRBN89KaU=
  dependencies:
    browserslist "^4.16.6"
    semver "7.0.0"
```

##### Identifier(s)

`core-js-compat@^3.0.0` 是依赖的 identifier。和 package.json 里对应的包名和版本区间，用 `@` 连接。这边的标题里带了 `(s)` ，是因为多个 Identifier 最终可能都指向同一个版本（具体例子可以看下文 `### dependencies` 里给出的例子）

##### version

`version` 是实际安装的版本。通常是满足版本区间里的一个版本，比如上一行 identifier 里版本区间是 `^3.0.0`，这里实际安装的是 `3.14.0`，符合要求。但是为什么要说是“通常”呢，因为有例外，在后文 `resolutions` 部分会讲到。

##### resolved

`resolved` 的是一个链接，是下载这个包的地址。这个 url 里的域名部分跟*项目里配置的 .npmrc*或*你本地的 npm 配置的  registry* 有关。

##### integrity

`integrity` 是对 `resolved` 下载下来的文件进行完整性校验。如果出现 diff，说明同一个下载链接对应的文件被修改过。

##### dependencies

`dependencies` 是这个包自己的依赖。如这里依赖的 `browserslist "^4.16.6"`，你想看下实际安装的哪个版本，就可以把它拼成 Identifier `browserslist@^4.16.6` ，以此为关键字在 yarn.lock 中搜索，就能找到对应的“块”了。

```json
browserslist@4.16.6, browserslist@^4.0.0, browserslist@^4.11.1, browserslist@^4.12.0, browserslist@^4.14.5, browserslist@^4.16.0, browserslist@^4.16.6, browserslist@^4.3.6, browserslist@^4.6.2, browserslist@^4.6.4, browserslist@^4.7.2, browserslist@^4.9.1:
  version "4.16.6"
  resolved "https://registry.npmjs.org/browserslist/-/browserslist-4.16.6.tgz#d7901277a5a88e554ed305b183ec9b0c08f66fa2"
  integrity sha1-15ASd6WojlVO0wWxg+ybDAj2b6I=
  dependencies:
    caniuse-lite "^1.0.30001219"
    colorette "^1.2.2"
    electron-to-chromium "^1.3.723"
    escalade "^3.1.1"
    node-releases "^1.1.71"
```

上面这个例子第一行有多个 Identifiers，最终都指向第二行的 `version "4.16.6"`，可以检查下 `4.16.6` 版本满足上面所有 Identifiers 里的版本区间：`4.16.6`、`^4.0.0`...

#### yarn.lock 的生成

yarn.lock 是自动生成的，不应该去手动修改。

执行 `yarn` 或者 `yarn install` 成功后会自动生成 yarn.lock 文件。package.json 中指定的依赖版本有变化（或者说与 yarn.lock 中的版本不匹配），也会自动下载并更新 yarn.lock 文件。

其他命令也会更新 yarn.lock 文件，比如：

`yarn add <packageName>` 新增依赖：默认安装最新版本（会修改 package.json 文件）。

`yarn upgrade <packageName>` 更新依赖：按照 [node#npm版本号的 ^ 和 ~](/common/node#npm版本号的--和) 规则，更新依赖。

> 注意：package.json 中依赖版本使用了 `^` 时，如果 `yarn.lock` **和** `node_modules` 文件夹中已经有这个依赖， `yarn` / `yarn install` 不会自动更新依赖版本，不会修改 `yarn.lock` 文件。如果 `node_modules` 目录**或者** `yarn.lock` 文件中没有相应的依赖，才会按照 package.json 中的版本规则重新下载依赖。

#### yarn upgrade

根据 package.json文件中指定的版本范围将包升级到其最新版本，同时会更新 yarn.lock 文件。

`yarn upgrade [package | package@tag | package@version | --scope @scope]... [--ignore-engines] [--pattern]`

可以选择指定一个或多个包名称。 指定包名称后，将只升级这些包。 如果未指定包名称，则将升级所有依赖项。

`[package]` 指定的包只是一个名称时，此程序包将升级到最新的匹配版本 。

`[package@tag]` : 当指定的包包含标签时，指定的标记将升级到指定的标签。 选择的标签会出现在 `package.json`文件。

`[package@version]` : 当指定的软件包包含版本时，将升级到指定版本。并修改 `package.json` 文件。

`--ignore-engines` 跳过引擎检查。

示例：

```
yarn upgrade
yarn upgrade left-pad
yarn upgrade left-pad@^1.0.0
yarn upgrade left-pad grunt
yarn upgrade @angular
```


### 选择性依赖项 resolutions

`package.json` 文件里的 `resolutions` 字段用于解析选择性版本，可以通过此功能自定义依赖版本。

#### 常见场景

- 有些时候，项目会依赖一个不常更新的包，但这个包又依赖另一个需要立即升级的包。 这时候，如果这个（不常更新的）包的依赖列表里不包含需要升级的包的新版本，那就只能等待作者升级，没别的办法。
- 项目的子依赖（依赖的依赖）需要紧急安全更新，来不及等待直接依赖更新。
- 项目的直接依赖还可以正常工作但已经停止维护，这时子依赖需要更新。 同时，你清楚子依赖的更新不会影响现有系统，但是又不想通过 fork 的方式来升级直接依赖。
- 项目的直接依赖定义了过于宽泛的子依赖版本范围，恰巧这其中的某个版本有问题，这时你想要把子依赖限制在某些正常工作的版本范围里。

#### 如何使用

在 `package.json` 文件里添加 `resolutions` 字段，用于覆盖版本定义：

**package.json**

```json
{
  "name": "project",
  "version": "1.0.0",
  "dependencies": {
    "left-pad": "1.0.0",
    "c": "file:../c-1",
    "d2": "file:../d2-1"
  },
  "resolutions": {
    "d2/left-pad": "1.1.1",
    "c/**/left-pad": "1.1.2"
  }
}
```

之后执行 `yarn install`。

### Integrity check failed 报错

一下报错信息摘自网络：

```bash
error https://ournexusserver/repository/npm/@40three-internal/ng-base/-/ng-base-7.0.1.tgz: Integrity check failed for "@40three-internal/ng-base" (computed integrity doesn't match our records, got "sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==")
```

这是因为版本校验出错，我是通过删除 `node_modules` 文件夹和 `yarn.lock` 文件，重新执行 `yarn` 解决的。

也有一下其他解决方法，因为我是 ci 场景，不适合修改全局配置。