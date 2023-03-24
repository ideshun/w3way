---
title: "CSS 笔记"
description: "CSS 笔记"
---

### 美化滚动条样式(伪类选择器)

`::-webkit-scrollbar` 设置滚动条的**整体样式**，包括宽度、高度、背景色等。

`::-webkit-scrollbar-track` 设置滚动条**轨道**的样式，包括圆角、阴影、背景色等。

`::-webkit-scrollbar-thumb` 设置滚动条**滑块**的样式，包括圆角、阴影、背景色等。

`::-webkit-scrollbar-button` 设置滚动条两端的箭头按钮的样式，包括背景色等。

`::-webkit-scrollbar-corner` 设置滚动条交接处的样式，包括背景色等。

`:horizontal` 和 `:vertical` 来分别设置水平和垂直方向上的滚动条样式。

`:decrement` 和`:increment` 来分别设置左右（上下）按钮和内层轨道区域的样式。

示例：

```
/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width: 12px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 0, 0, 0.4);
}
```

