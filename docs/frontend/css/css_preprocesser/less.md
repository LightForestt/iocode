## Less 入门

> 前言：预处理是来做什么的，它解决了什么问题？

1. 通过嵌套的代码书写方式，在 less 中可以对 html 中的节点解构一目了然；
2. less 中可以定义变量，便于维护，也有熟悉的作用域的概念，更接近编程语言，前端开发者容易接受和使用，更易于规范样式；
3. less 中可以使用混入，实现代码复用和类似于函数式的编程（类似函数但不是，仅有混入）；
4. less 中提供了很多方便的函数，可以实现函数式动态编程；
5. 和 css 完全兼容 ；

提示：（vscode - easy less / compile hero 插件直接编译 less）

### 0.注释

```less
// 开发注释 这种注释不会被编译到css文件中去
/* 用户注释 这种会被编译到css文件中去*/
```

### 定义变量

```less
//属性值变量定义
@width: 10px;
@height: @width + 10px;
#header {
  width: @width;
  height: @height;
}
//属性名变量定义
@w: width;
#header {
  @{w}: @width;
  height: @height;
}
//选择器变量定义
@sel: "@header";
@{sel} {
  @{w}: @width;
  height: @height;
}
// 变量的延迟加载和作用域
@var: 0;
.class {
  @var: 1;
  .inner {
    @var: 2;
    //变异成3 因为延迟加载
    font-size: @var;
    @var: 3;
  }
  // 编译成1
  z-index: @var;
}
```

### 嵌套规则

```less
//基本嵌套
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
//你还可以使用此方法将伪选择器（pseudo-selectors）与混合（mixins）一同使用。下面是一个经典的 //clearfix 技巧，重写为一个混合（mixin） (& 表示当前选择器的父级）：
.clearfix {
  display: block;
  zoom: 1;
  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}

// 和伪类嵌套使用
div {
  // 首先获取2个以后的div元素
  &:nth-child(n + 2) {
    // 设置悬浮变红
    &:hover {
      background-color: red;
    }
  }
}
// 编译输出如下
// div:nth-child(n+2):hover {
//   background-color: red;
// }
```

### 混入

- ###### 普通混入 无括号就会编译到原生 css 中

```less
//1. 普通混入 无括号就会编译到原生css中
.center {
  display: flex;
  position: relative;
  margin: auto auto;
}
```

- ###### 无参数混入 有括号就不会编译到 css 中区

```less
//2. 无参数混入 有括号就不会编译到css中区
.center() {
  display: flex;
  position: relative;
  margin: auto auto;
}
.outer {
  .center();
  width: 500px;
  height: 500px;
  border: 1px solid red;
}

.inner {
  .center();
  width: 200px;
  height: 200px;
  border: 1px solid blue;
}
```

- ###### 参数混入

```less
//3. 参数混入
.square(@w,@h) {
  width: @w;
  height: @h;
}
.outer {
  .center();
  .square(300px, 300px);
  border: 1px solid red;
}
.inner {
  .center();
  .square(100px, 100px);
  border: 1px solid blue;
}
```

- ###### 默认参数混入

```less
//4. 默认参数混入
.square(@w:100px,@h:100px) {
  width: @w;
  height: @h;
}
.outer {
  .center();
  .square(300px);
  border: 1px solid red;
}
.inner {
  .center();
  .square(100px);
  border: 1px solid blue;
}
```

- ###### 命名参数混入 用于指定给某个参数赋值

```less
//5. 命名参数混入 用于指定给某个参数赋值
.outer {
  .center();
  .square(300px);
  border: 1px solid red;
}
.inner {
  .center();
  .square(@h:300px);
  border: 1px solid blue;
}
.square(@w:100px,@h:100px) {
  width: @w;
  height: @h;
}
```

- ###### 匹配模式 根据匹配符（首个参数） 来指定混入方式

```less
//6. 匹配模式 根据匹配符（首个参数） 来指定混入方式
.inner {
  .triangle(T, 100px, red);
}
// 每次调用同名称混入的时候 会将@_的内容带上
.triangle(@_,@w,@c) {
  width: 0;
  height: 0;
  border-style: solid;
}
.triangle (B,@w,@c) {
  border-width: @w;
  border-color: transparent transparent @c transparent;
}
.triangle (T,@w,@c) {
  border-width: @w;
  border-color: @c transparent transparent transparent;
}
.triangle (R,@w,@c) {
  border-width: @w;
  border-color: transparent @c transparent transparent;
}
.triangle (L,@w,@c) {
  border-width: @w;
  border-color: transparent transparent transparent @c;
}
// 编译如下css ↓↓↓↓↓↓↓
.inner {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 100px;
  border-color: red transparent transparent transparent;
}
```

- ###### arguments 变量 实参列表

```less
//7. arguments变量 实参列表 实际上是个类数组 类似js
.border(@width,@style,@color) {
  border: @arguments;
}

#wrapper {
  .border(100px, solid, red);
}
```

### 4.less 的计算

```less
// less计算  只需要一方带单位就好了 单位不同以前边的为准
.clac {
  width: (100+200px);
  height: (100rem+200px);
}
```

### 5.less 的继承

```less
.center {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.outer {
  // all 关键字代表继承所有伪类 和 伪元素
  &:extend(.center all);
  .inner {
    &:extend(.center all);
  }
}

// 编译成如下↓↓↓↓↓↓↓↓↓ css 相当于通过并集的方式取得属性
// 并集选择器
.center,
.outer,
.outer .inner {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

//为了对比继承  下边是混入的方式
.center {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.outer {
  .center();
  .inner {
    .center();
  }
}
// 编译成如下↓↓↓↓↓↓↓↓↓ css 相当于通过复制粘贴获得属性 对比继承 编译出的css文件体量大
.outer {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.outer .inner {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
```

### less 中的内置函数

- 逻辑函数

```less
//if(boolean,{},else{})函数 相当于if(){} else{}
@some: 105px;
.outer {
  background-color: red;
  border-color: if((2 > 1), blue, green);
  width: if(true, 0);
  height: if(false, @some, 0);
  color: if((iscolor(@some)), @some, black);
}

//boolean(any) 函数 返回一个布尔值 luma是计算亮度百分比的函数
@bg: black;
@bg-light: boolean(luma(@bg) > 50%);
div {
  background: @bg;
  color: if(@bg-light, black, white);
}
```

- 字符串函数

```less
// escape(string) 转成url编码 不会被解析的字符: , / ? @ & + ' ~ ! $
@escape: "'a=1'";
.outer {
  &::after {
    content: escape(@escape);
  }
}
//解析如下
.outer::after {
  content: "a%3D1";
}

// replace(string,regex,replacement,flags) 字符串替换
// 参数1-字符串 参数2-正则表达式  参数3-替换成什么字符串 参数4-正则标志 可选
.outer {
  &::after {
    content: replace("Hello, Mars?", "Mars\?", "Earth!");
  }
}
// g-替换小写 i-替换大写
// replace("One + one = 4", "one", "2", "gi");
// $1 取出正则中的第一组
// replace('This is a string.', "(string)\.$", "new $1.");
// 注意 波浪线去除了引号 避免了编译
// replace(~"bar-1", '1', '2');   // bar-2

//luma 计算一个彩色物体的亮度(感知亮度) 返回一个百分比值
@bg-light: boolean(luma(@bg) > 50%);
```
