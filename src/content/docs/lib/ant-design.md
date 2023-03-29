---
title: "Ant Design 笔记"
description: "Ant Design 笔记"
---

日期禁止选择：

antd 官方示例方法：

```
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};
```

因为我处理时间用的是Moment.js的库，参考antd官方示例，代码如下：

```
import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

const DateTimePicker = (props) => {
  const [begin] = useState(props.begin);
  const [end] = useState(props.end);
  const [value, setValue] = useState(moment());
  /**
   * @description: 处理不可选择的时间
   * @return {*}
   */
  const handleDisabledDate = (current) =>
    current && (current < moment(begin).startOf('day') || current > moment(end).endOf('day'));

  return <DatePicker value={value} disabledDate={handleDisabledDate} onChange={(event) => event && setValue(event)} />;
};
export default DateTimePicker;

```

我觉得这样写看上去有点复杂，就把方法部分代码发给必应，让必应看一下，有没有可优化的地方，下面是 New Bing 的回答：

帮我优化一下这段代码：

```
const handleDisabledDate = (current) => current && (current < moment(begin).startOf('day') || current > moment(end).endOf('day'))
```

根据我从网络上搜索到的信息，函数优化的目的是提高函数的效率和可读性，减少不必要的计算和内存消耗。对于你的这段代码，你可以考虑以下几点：

- 检查你的 current 参数是否是一个 moment 对象，如果是，那么你可以省略 moment() 的调用，直接使用 current 的方法。
- 检查你的 begin 和 end 参数是否是固定的值，如果是，那么你可以将 moment(begin).startOf('day') 和 moment(end).endOf('day') 提前计算好，避免每次调用函数时都重复计算。
- 检查你的逻辑是否可以简化，比如使用 isBefore 和 isAfter 方法来代替比较运算符。

综合以上几点，你可以尝试以下的优化代码：

```js
// 假设 current 是一个 moment 对象
// 假设 begin 和 end 是固定的值
const beginDay = moment(begin).startOf('day'); // 提前计算
const endDay = moment(end).endOf('day'); // 提前计算
const handleDisabledDate = (current) => current && (current.isBefore(beginDay) || current.isAfter(endDay)); // 简化逻辑
```

