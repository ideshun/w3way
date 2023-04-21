---
title: "Javascript 笔记"
description: "Javascript 笔记"
---

### if 的简写

#### `if else` 语句后面有没有花括号 `{}` 的区别：

+ 如果没有花括号 `{}`，则只能执行一条语句，如果有多条语句，会报错或者出现逻辑错误。

- 如果有花括号 `{}`，则可以执行多条语句，而且更加清晰和规范。

两段代码的区别是：

- 第一段代码没有花括号 `{}`，所以只能执行 `if` 或者 `else` 后面的一条语句，如果想要执行多条语句，需要加上花括号 `{}`。
- 第二段代码有花括号 `{}`，所以可以执行 `if` 或者 `else` 后面的多条语句，而且更加清晰和规范。

建议使用第二段代码的写法，因为它更符合编程规范和习惯。

#### if a b 是不相当于 if (a) {return b}

报错：`Uncaught SyntaxError: Unexpected identifier 'a'`

#### if (a) b 相当于 if (a) {return b} 吗

`if (a) b` 相当于 `if (a) {b;}`，也就是说，如果 `a` 为真，那么执行 `b` 语句。但是这种写法并不等于 `if (a) {return b;}`，因为 `return` 语句的作用是从函数中返回一个值，而不是简单地执行一个语句2。

如果您想使用条件表达式（三元运算符）来简化代码，您可以写成 `b = a ? c : d;` 这样的形式，意思是如果 `a` 为真，那么 `b` 等于 `c`，否则 `b` 等于 `d`。



#### () => a 是不是相当于 ()=> {return a}

`() => a` 是一种箭头函数的写法，它的意思是：

- 定义一个没有参数的匿名函数
- 函数体只有一条语句，即返回 `a` 的值
- 可以省略大括号和 `return` 关键字

所以，`() => a` 和 `()=> {return a}` 是完全相同的，它们都表示一个返回 `a` 的值的匿名函数。



### 浏览器缓存机制

浏览器在加载和显示网页时，会根据不同的情况，决定是否重新从服务器获取网页内容或使用缓存中的内容。缓存是指浏览器在本地存储的一些网页资源，如图片、CSS、JS等，以便于下次访问时快速加载，提高用户体验和网站性能。

对于大多数浏览器而言，都包含有三种刷新方式，以下我们以Chrome浏览器为例：

F5刷新：这是最常用的刷新方式，它会根据缓存的有效期和修改时间，决定是否重新从服务器下载内容。如果缓存的内容没有过期或没有修改，就会直接使用缓存，这样可以节省流量和时间。

Ctrl+F5刷新：这是强制刷新的方式，它会忽略缓存的内容，强制重新从服务器下载所有内容，包括JavaScript文件，图像，文本文件等。这样可以保证显示网页的最新内容，但是会消耗更多的流量和时间。

Shift+F5刷新：这是清除缓存并刷新的方式，它会把浏览器中的临时文件夹的文件删除再重新从服务器下载。这样可以清除一些可能造成问题的缓存文件，但是也会消耗更多的流量和时间。

#### JS 代码实现F5的效果，清空缓存并刷新页面

JS 代码实现F5的效果，可以使用以下方法：

`window.location.reload(false)` 方法会根据缓存的有效期和修改时间，决定是否重新从服务器下载内容。如果缓存的内容没有过期或没有修改，就会直接使用缓存，这样可以节省流量和时间。
`window.location.href = window.location.href` 方法会重新加载当前页面的URL，但是也可能使用缓存的内容。

JS 代码实现 Ctrl+F5 和 Shift+F5 的效果，可以使用以下方法：

`window.location.reload(true)` 方法会忽略缓存的内容，强制重新从服务器下载所有内容，包括 JavaScript 文件，图像，文本文件等。这样可以保证显示网页的最新内容，但是会消耗更多的流量和时间。

`window.location.replace(window.location.href)` 方法会把浏览器中的临时文件夹的文件删除再重新从服务器下载。这样可以清除一些可能造成问题的缓存文件，但是也会消耗更多的流量和时间。

注意：`location.reload(true)` 在 Firefox 浏览器中是有效的，它会强制 Firefox 从服务器加载页面资源，其他浏览器还不支持。

#### Object.entries()

`Object.entries()` 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。

参数：可以返回其可枚举属性的键值对的对象。

返回值：给定对象自身可枚举属性的键值对数组。

```javascript
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
```

#### Object.fromEntries()

`Object.fromEntries()` 方法把键值对列表转换为一个对象。

参数：类似 `Array` 、 `Map` 或者其他实现了[可迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)的可迭代对象。

返回值：一个由该迭代对象条目提供对应属性的新对象。

```javascript
// Map
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);
console.log(Object.fromEntries(entries));
// { foo: "bar", baz: 42 }

// Array
const array = [ ['foo', 'bar'], ['baz', 42] ];
console.log(Object.fromEntries(array))
// {foo: 'bar', baz: 42}
```

#### !! 用法

- `!!` 对一个值进行两次逻辑非运算，第一次逻辑非运算会将值转换为布尔值，然后取反，第二次逻辑非运算会再次取反，得到原始的布尔值。

- `!!` 可以用于判断一个值是否为真值或者假值。

  例如，变量 `x` 是一个真值，如 `true`、`1`、`"hello"` 等，那么 `!!x` 会返回 `true`；

  如果 `x` 是一个假值，例如 `false`、`0`、`""` 等， `!!x` 则会返回 `false`，。

#### `?.` 和 `??` 的区别

- `?.` 是可选链运算符，用于访问一个可能为空或者未定义的对象的属性，如果对象为空或者未定义，它会返回 `undefined`，而不会抛出错误。

  例如，如果 `obj` 是一个对象，那么 `obj?.name` 会返回 `obj` 的 `name` 属性，如果 `obj` 是 `null` 或者 `undefined`，那么 `obj?.name` 会返回 `undefined`。

- `??` 是空值合并运算符，它用于提供一个默认值，当左边的表达式为 `null` 或者 `undefined` 时，它会返回右边的表达式的值，否则返回左边的表达式的值。例如，如果 `x` 是一个变量，那么 `x ?? 0` 会返回 `x` 的值，如果 `x` 是 `null` 或者 `undefined`，那么 `x ?? 0` 会返回 `0`。

#### `??` 和 `||` 的区别

- `??` 只会在左边的表达式为 `null` 或者 `undefined` 时，返回右边的表达式的值，否则返回左边的表达式的值。这意味着，如果左边的表达式是一个假值，例如 `false`、`0`、`""` 等，它仍然会被返回。
- `||` 会在左边的表达式为任何假值时，返回右边的表达式的值，否则返回左边的表达式的值。这意味着，如果左边的表达式是一个真值，例如 `true`、`1`、`"hello"` 等，它会被返回。

所以，`??` 和 `||` 的用法取决于你想要实现的逻辑。一般来说，如果你只想排除 `null` 或者 `undefined`，那么使用 `??` 比较好；如果你想排除所有假值，那么使用 `||` 比较好。例如：

```
// 假设 name 是一个变量
const greeting = name ?? "guest"; // 如果 name 是 null 或者 undefined，那么 greeting 会是 "guest"，否则会是 name 的值
const status = name || "unknown"; // 如果 name 是任何假值，那么 status 会是 "unknown"，否则会是 name 的值
```



### 代码优化

#### 案例1

优化前：

```typescript
export const getColsDataFromColId = (gridApi: GridApi) => {
    return (rowId: string[]) => {
        const allData: IGridRowData[] = [];
        gridApi.forEachNode((rowNode) => {
            if (rowNode.rowIndex?.toString()) {
                allData.push(rowNode.data);
            }
        });
        const allColsData: GetColIdDataType[] = [];
        allData.forEach((data) => {
            const currentCols: { [key: string]: Primitive | object | [] } = {};
            rowId.forEach((id) => {
                currentCols[id] = data[id];
            });
            allColsData.push({
                ...currentCols,
                data_uuid: data?.data_uuid,
                _options: undefined,
                origin: undefined,
                options: undefined
            });
        });
        return allColsData;
    };
};
```

优化后：

```typescript
/**
 * @description 根据列 colId 获取列数据
 * @param {GridApi} gridApi
 * @param {colIds}  string[]
 * @return {*}
 */
export const getColsDataFromColId = (gridApi: GridApi) => {
    return (colIds: string[]) => {
        const allColsData: GetColIdDataType[] = [];
        gridApi.forEachNode((rowNode) => {
            if (rowNode.getRowIndexString()) {
                const { data } = rowNode;
                allColsData.push({
                    ...Object.fromEntries(Object.entries(data).filter(([key]) => colIds.includes(key))),
                    data_uuid: data?.data_uuid
                });
            }
        });
        return allColsData;
    };
};
```

##### 说明：

- 使用 `Object.fromEntries` 和 `Object.entries` 来创建和过滤对象，而不是手动遍历和赋值。

  这个表达式的作用是从 data 对象中筛选出 colIds 数组中包含的键，然后返回一个新的对象。它的步骤如下：

  - `Object.entries(data)` 把 data 对象转换为一个二维数组，每个子数组包含一个键值对，例如 `{a: 1, b: 2}` 会变成 `[["a", 1], ["b", 2]]`。
  - `.filter(([key]) => colIds.includes(key))` 对这个二维数组进行过滤，只保留 colIds 数组中包含的键，例如如果 colIds 是 `["a", "c"]`，那么 `[["a", 1], ["b", 2]]` 会变成 `[["a", 1]]`。
  - `Object.fromEntries(...)` 把过滤后的二维数组转换回对象，例如 `[["a", 1]]` 会变成 `{a: 1}`。

- 使用可选链运算符 `?.` 和空值合并运算符 `??` 来处理可能为空的属性，而不是用逻辑运算符 `||`。

