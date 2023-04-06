---
title: "Linux 笔记"
description: "Linux 笔记"
---

#### 查看文件

```powershell
cat nginx.conf
```

`pwd` 查看当前目录

`ll` 查看当前目录文件，是 `ls -l` 的简写

`ll -a` 查看隐藏文件

查看文件的最后一行

```
tail -n l hello.text
```





#### vim

`yy` 复制

`p` 粘贴

`wq` 保存&退出，先按 esc 进入命令模式再输入





```
# 查看本机有哪些shell
cat /etc/shells  # 显示当前用的shell:   echo $SHELL

# 测试zsh
zsh --version

# 如果没用安装
sudo apt update && sudo apt upgrade
# sudo apt update && sudo apt upgrade zsh

# 安装zsh
sudo apt install zsh

# 切换shell
chsh -s $(which zsh)

```

ubuntu 卸载 Git

```
卸载git
要从Ubuntu 14.04中删除git包本身，请在终端上执行：

$ sudo apt-get remove git
卸载git及其依赖包
删除git包和任何其他依赖包，这些包不再需要Ubuntu Trusty。

$ sudo apt-get remove --auto-remove git
清理git
如果你还想从Ubuntu Trusty中删除git的配置和/或数据文件，那么这将起作用：

$ sudo apt-get purge git
要从Ubuntu Trusty中删除git的配置和/或数据文件及其依赖项，请执行：

$ sudo apt-get purge --auto-remove git
```

