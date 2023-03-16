---
title: "NodeJS 笔记"
description: "NodeJS 笔记"
---

### npm版本号的 `^` 和 `~` 

npm 依赖版本号是采用了语义化版本 (semver) 规范，格式为：`<主版本号>.<次版本号>.<修订号>`。npm 会在版本号前面附加一个符号，如 `^` 或 `~` ，来表示依赖的范围。比如：

- `^1.2.3` 表示安装大于等于 `1.2.3` 且小于 `2.0.0` 的最新版本。
- `~1.2.3` 表示安装大于等于 `1.2.3` 且小于 `1.3.0` 的最新版本。

<small>——  该资料来自微软 New Bing </small>



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

