---
title: "React 学习笔记"
description: "React 学习笔记"
---

### 函数式组件

函数式组件就是函数，可以 `写逻辑` 和 `定义变量` 等函数可以操作的所有操作；

```tsx
import React from 'react';

const IndexPage: React.FC<{}> = () => {
  /* 创建函数式组件 */
  const ViewComponent = (props: any) => {
	const { title } = props; //通过props可以拿到标签的属性值
    console.log(this) //undefiend：严格模式禁止自定义的函数指向 Window
    return title; //必须有返回值
  }
  
  return (
    //渲染组件到页面
    <ViewComponent title='你好'/> //标签必须闭合
    /*
    * 1.React解析组件标签，找到了ViewComponent组件
    * 2.发现组件是函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中
    */
  );
};

export default IndexPage;
```

注意：函数组件必须以大写字母开头。

1. 如果是小写字母开头就直接转成html同名元素了，若html中无该标签对应的同名元素，则报错。

2. 如果是大写字母开头，React就去渲染对应的组件，若组件没有定义，则报错。

#### 也可以在（父）组件传参时使用函数组件：

```tsx
//页面
import BillTab from '@/components/bill-tab'
...
<BillTab title={<ViewComponent title='你好'/>}>
...

//组件
import React, { ReactNode } from 'react';

interface Props {
  title: ReactNode; //标题
}
const BillTab: React.FC<Props> = (props) => {
  const { title } = props;
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default BillTab;
```

### 类式组件

用类定义的组件，适用于复杂组件的定义

1. 必须继承 `React.Component` 父类
2. 必须要写 `render()` 
3. `render()` 必须有返回值

```tsx
//创建类式组件
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    //初始化状态
    this.state = {
      isBoy: true
    }
  }
  render() {
    //render在类的原型对象上，供实例使用。
    //render中的this是MyComponent的实例对象，MyComponent组件实例对象。
    const {isBoy} = this.state //读取状态
    return <h2>Hello Word!{isBoy ? 'Boy' : 'girl'}</h2>
  }
}
//渲染组件到页面
<MyComponent />
/*
* 1.React解析组件标签，找到了MyComponent组件。
* 2.发现组件是使用类（class）定义的，随后new出来该类的实例，并通过该实例调用原型上的render方法。
*/
```

#### 增加事件和函数

```tsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isBoy: true
    }
  }
  render() {
    const {isBoy} = this.state
    return <h2 onClick={handelClick}>Hello Word!{isBoy ? 'Boy' : 'girl'}</h2>
    //注意这里的函数不能带 `()`
    //这里是一个赋值语句
  }
}
function handelClick() {
  console.log('你点击了标题')
}
<MyComponent />

```



### 在组件标签里书写的内容如何显示出来

比如我封装了一个组件 `BillTab` ，想在它里面写一些自定义的内容。

```tsx
...
<billTab title='标题'>
  <h2>Hello Word</h2>
</billTab>
...
```

直接这样写 `h2` 标签是不会显示的，不过也不是没有办法。

`props` 有一个 `children` 属性，就是标签里面的内容：

```tsx
interface Props {
  title: ReactNode; //标题
}
const BillTab: React.FC<Props> = (props) => {
  const { title, children } = props;
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

这样写在组件标签内的 `h2` 就显示出来了。