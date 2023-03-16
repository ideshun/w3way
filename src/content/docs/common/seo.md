---
title: "SEO 笔记"
description: "SEO 笔记"
---

### property=og 标签

#### 什么是Meta Property=og协议

og 是一种新的HTTP头部标记（Open Graph协议）这种协议可以让网页成为一个“富媒体对象”（被其他网站引用等）。目前主流百度，360等等搜索引擎已经支持og 富媒体协议！

#### Meta Property=og 协议的作用？

1. 能够正确被蜘蛛抓取您的内容到百度、360、搜狗等网页搜索；
2. 帮助您的内容更有效的在百度、360、搜狗结构化展现；
3. 能够正确的分享您的内容到SNS网站；
4. 帮助您的内容更有效的在SNS网络中传播；

#### Meta Property=og主要标签属性

`og:title` 标题

`og:type` 类型（常用值：rticle book movie）

`og:image` 略缩图地址

`og:author` 作者名称

`og:url` 页面地址

`og:release_date` 发布时间

`og:description` 页面的简单描述

`og:site_name` 页面所在网站名

`og:videosrc` 视频或者Flash地址

`og:audiosrc` 音频地址

不支持 keywords ，可以和 name 搭配使用：

```html
<meta name="description" property="og:description" content={SITE.description} />
<meta name="keywords" content={SITE.keywords} />
```

