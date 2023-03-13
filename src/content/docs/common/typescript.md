---
title: "TypeScript 笔记"
description: "TypeScript 笔记"
---

### 函数式组件

#### TypeScript 中函数参数为对象时的写法

```tsx
const fn = (props: {
  type: 'history' | 'nominate'; //历史还是推荐
  process: 'set' | 'get'; // 保存还是读取
}) => {
  const { type, process } = props;
  ...
};
```

直观一点：

```tsx
export interface Props {
  type: 'history' | 'nominate'; // 历史还是推荐
  process: 'set' | 'get'; // 保存还是读取
}

const fn = (props: Props) => {
  const { type, process } = props;
};
```

