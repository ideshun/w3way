---
title: "CSS 笔记"
description: "CSS 笔记"
---

### 手机端，拖动滚动条触发浏览器前进后退手势的禁用方法

```
touch-action: pan-y;
```

`touch-action` 属性用于设置触摸屏用户如何操纵元素的区域，例如浏览器内置的缩放功能。可以通过不同的参数来指定哪些手势由浏览器处理，哪些手势由您自己提供行为。

例如，`touch-action: pan-y;` 表示启用单指垂直平移手势，但禁用水平平移和缩放手势。这样可以避免浏览器误识别您的滑块操作为前进后退手势而切换页面。

您可以参考[[1](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) [2](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)]链接来了解更多关于 `touch-action` 属性的用法和示例。



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

