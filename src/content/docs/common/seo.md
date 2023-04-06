---
title: "SEO 笔记"
description: "SEO 笔记"
---



### 网站被搜索引擎（百度）K了怎么办

网站被K是一件很让人头疼的事情，但是也不是没有办法恢复的。根据网上的一些经验，你可以尝试以下几个步骤：

1. 找出网站被百度K的原因，比如内容质量、外链质量、关键词堆砌、服务器不稳定等，然后及时改正。
2. 改变网站的标题和关键词，让百度重新认识你的网站。
3. 每天更新一些原创内容，提高网站的价值和活跃度。
4. 增加一些高质量的友情链接和外链，提高网站的权重和信誉。
5. 到百度站长平台提交你的网址、sitemap和抓取诊断，让百度重新抓取你的网页。
6. 到百度投诉中心反馈你的问题，说明原因，请求恢复收录。

这些步骤可能需要一段时间才能见效，所以你要有耐心和信心。

同时，也要注意避免再次触发百度的惩罚机制，做好用户体验和内容质量。



### property=og 标签

#### 什么是Meta Property=og协议

og 是一种新的HTTP头部标记（Open Graph协议）这种协议可以让网页成为一个“富媒体对象”（被其他网站引用等）。目前主流百度，360等等搜索引擎已经支持og 富媒体协议！

#### Meta Property=og 协议的作用？

1. 能够正确被蜘蛛抓取您的内容到百度、360、搜狗等网页搜索；
2. 帮助您的内容更有效的在百度、360、搜狗结构化展现；
3. 能够正确的分享您的内容到SNS网站；
4. 帮助您的内容更有效的在SNS网络中传播；

#### Meta Property=og 主要标签属性

`og:title` 网页标题

`og:type` 网页类型（常用值：`article` 、`book` 、`movie` 、`video` 、`website`）

`og:image` 网页的主要图片

`og:author` 作者名称

`og:url` 网页的地址

`og:release_date` 发布时间

`og:description` 网页的简介

`og:site_name` 页面所在网站名

`og:videosrc` 视频或者Flash地址

`og:audiosrc` 音频地址

`og:site_name` 网站名称

`og:locale` 网页语言

不支持 `keywords`。

可以和 `name` 搭配使用：

```html
<meta name="description" property="og:description" content={SITE.description} />
<meta name="keywords" content={SITE.keywords} />
```

#### 简单示例：

```html
<meta property="og:title" content="property=og标签的含义及作用-w3h5前端资源网"/>
<meta property="og:type" content="article"/>
<meta property="og:image" content="https://w3h5.com/og-image.jpg"/>
<meta property="og:url" content="https://w3h5.com/og-article.html"/>
<meta property="og:description" content="本文介绍了property=og标签的概念、用法和优势，以及如何在WordPress中添加该标签。"/>
<meta property="og:site_name" content="w3h5前端资源网"/>
<meta property="og:locale" content="zh_CN"/>
```



