---
title: "操作系统 笔记"
description: "操作系统 笔记"
---

### 使用hosts文件屏蔽一些网址

1. 找到系统中的hosts文件，它通常位于C:\Windows\System32\drivers\etc目录下。
2. 用记事本或其他文本编辑器打开hosts文件。
3. 在文件的末尾添加一行，格式为： `0.0.0.0` 或 `127.0.0.1` + 空格 + 你要屏蔽的网址，例如 `127.0.0.1 www.baidu.com`。
4. 保存并关闭 hosts 文件。
5. 这样，当你访问被屏蔽的网址时，系统会将其解析为无效的IP地址，从而无法打开对应的网页。

注意：修改 hosts 文件可能需要管理员权限，并且可能会影响一些正常的网络访问。如果你想恢复原来的设置，只需删除或注释掉添加的行即可。

### LF和CRLF

LF和CRLF是用来表示文本换行的方式。

- LF（Line Feed）代表换行，对应ASCII中转义字符\n，表示一行文本的结束。
- CRLF（Carriage Return & Linefeed）代表回车并换行，对应ASCII中转义字符\r\n，表示将光标移动到当前行的开头并开始新的一行。

由于历史原因，不同的操作系统使用不同的换行符：

- Windows系统使用CRLF作为其文本文件的换行符。
- Unix系统（包括Linux和MacOS近些年的版本）使用LF作为其文本文件的换行符。
- Apple最初在Mac Classic上使用CR作为其文本文件的换行符，但最终在OS X上改用了LF。

这些差异可能会给跨平台协作开发和运行带来一些问题，比如 `git diff` 中显示整个文件都被修改了，或者合并分支时出现冲突等。为了避免这些问题，可以使用`git config` 或 `.gitattributes` 文件来配置 git 如何处理不同系统上的换行符。