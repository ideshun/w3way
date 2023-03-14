---
title: "NodeJS 笔记"
description: "NodeJS 笔记"
---

### 选择性依赖项

`package.json` 文件里的 `resolutions` 字段用于解析选择性版本，可以通过此功能自定义依赖版本。 这通常需要手动编辑 `yarn.lock` 文件。

#### 为什么要这么做？

- 有些时候，项目会依赖一个不常更新的包，但这个包又依赖另一个需要立即升级的包。 这时候，如果这个（不常更新的）包的依赖列表里不包含需要升级的包的新版本，那就只能等待作者升级，没别的办法。
- 项目的子依赖（依赖的依赖）需要紧急安全更新，来不及等待直接依赖更新。
- 项目的直接依赖还可以正常工作但已经停止维护，这时子依赖需要更新。 同时，你清楚子依赖的更新不会影响现有系统，但是又不想通过 fork 的方式来升级直接依赖。
- 项目的直接依赖定义了过于宽泛的子依赖版本范围，恰巧这其中的某个版本有问题，这时你想要把子依赖限制在某些正常工作的版本范围里。

#### 如何使用？

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

### 检查 package.json 中未使用的依赖

```bash
$ npm install depcheck -g
 
$ depcheck
Unused dependencies
* underscore
Unused devDependencies
* jasmine
Missing dependencies
* lodash
```

### 修改node_modules源码（本地测试）

`patch-package` 是一个用来给其他 `npm` 包打补丁的包，实际原理也是在本工程保存一份修改的代码，只不过不是用全量代码的形式保存，而是保存了 `git diff` 的结果，节省了代码体积

#### **用法如下：**

- `npm i -S patch-package` 安装 `patch-package`
- 直接在 `node_modules` 下修改需要修改的包源码
- 执行 `npx patch-package 包名` , `patch-package` 会将当前 `node_modules` 下的源码与原始源码进行 `git diff` ，并在项目根目录下生成一个 `patch` 补丁文件
- 后续只要执行 `npx patch-package` 命令，就会把项目 `patches` 目录下的补丁应用到 `node_modules` 的对应包中，这个执行时机一般可以设置为 `postinstall` 这个勾子

```json
"scripts": {
    "postinstall": "patch-package"
}
```

#### **为什么是用它？**

毕竟是专门团队开发的工具，在能实现目的的前提下，该考虑的都帮你考虑好了，比如这个包的版本升级了怎么办，你会发现如果你装的包版本和你之前生成的补丁中记录的版本不一样，`npx patch-package` 会直接报错 `**ERROR** Failed to apply patch for package xxxx at path`，另外使用 `git diff` 来记录补丁比起重写一份源码的方法更节省空间，即安全，又便捷。

