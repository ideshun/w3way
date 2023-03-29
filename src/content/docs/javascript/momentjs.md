---
title: "moment.js 笔记"
description: "moment.js 笔记"
---



### 获取第前 n 天/周/月/年：

```javascript
/**
 * @description 获取第前 {n} 天
 * @param introTime 传入的时间 默认为当前时间
 * @param num 偏移值
 * @returns Format 格式
 */
export const getBeforeDay = (
  introTime: string | Moment = moment(new Date()),
  num: number = 24, // 默认值 24
  format: string = 'YYYYMMDD', // 默认日期格式 20230320
) => {
  return moment(introTime).subtract(num, 'days').format(format);
};

/**
 * @description 获取第前 {n} 个周
 * @param introTime 传入的时间 默认为当前时间
 * @param num 偏移值
 * @returns Format 格式
 */
export const getBeforeWeek = (
  introTime: string | Moment = moment(new Date()),
  num: number = 24,
  format: string = 'YYYYww',
) => {
  return moment(introTime).subtract(num, 'weeks').format(format);
};

/**
 * @description 获取第前 {n} 个月
 * @param introTime 传入的时间 默认为当前时间
 * @param num 偏移值
 * @returns Format 格式
 */
export const getBeforeMonth = (
  introTime: string | Moment = moment(new Date()),
  num: number = 24,
  format: string = 'YYYYMM',
) => {
  return moment(introTime).subtract(num, 'months').format(format);
};

/**
 * @description 获取第前 {n} 年
 * @param introTime 传入的时间 默认为当前时间
 * @param num 偏移值
 * @returns Format 格式
 */
export const getBeforeYear = (
  introTime: string | Moment = moment(new Date()),
  num: number = 10,
  format: string = 'YYYY',
) => {
  return moment(introTime).subtract(num, 'years').format(format);
};
```

### 获取两个间隔日期之间的所有日期：

```javascript
/**
 * @description 获取两个日期之间的所有日期
 * @param startDate 传入的时间：开始日期
 * @param endDate 传入的时间：结束日期
 * @param unit 单位：默认是天
 * @param format 日期格式：默认为 YYYYMMDD
 * @returns 日期列表/数组
 */
export const getDaysBetweenDates = function (startDate: Moment, endDate: Moment, unit: 'days' | 'weeks' | 'months' | 'years' = 'days', format: string = 'YYYYMMDD',) {
  const now = startDate.clone(), dates = [];
  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format(format));
    now.add(1, unit);
  }
  return dates;
};
```

