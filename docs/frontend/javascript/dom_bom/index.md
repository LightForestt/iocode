## DOM 文档对象模型

- dom 中顶级对象是`document`主要是用来操作文档，节点，属性，文本。

### 获取元素

- `getElementById()` 按照 id 取元素。

```js
console.dir(document.getElementById("dom"));
```

- `getElementsByTagName`按照标签名选出当前元素包含的子元素。注意：返回值是一个类数组`HTMLCollection`，即使找不到元素，也是返回一个长度的类数组（`length`为`0`）。

```js
// 选出document中的div
console.dir(document.getElementsByTagName("div"));

// 选出#dom 下的div
let dom = document.getElementById("dom");
console.dir(dom.getElementsByTagName("div"));
```

- `document.getElementsByClassName` H5 新增方法 IE9 以下不可用

```js
console.dir(document.getElementsByClassName("box"));
```

- `document.querySelector`选择第一个匹配的元素对象 ，H5 新增方法 IE9 以下不可用
- `document.querySelectorAll`选择所有匹配的元素对象,返回类数组`NodeList`，H5 新增方法 >IE8 可用

```js
console.dir(document.querySelector(".box"));
console.dir(document.querySelector("#dom"));
console.dir(document.querySelectorAll(".box"));
```

- 获取特殊元素 `body html`

```js
let body = document.body;
let html = document.documentElement;
```

#### 事件

- 事件三要素
  1. 事件源
  2. 事件类型
  3. 事件处理方式

```js
// 注册事件 只能注册一个方法
box.onclick = function() {
  // dosomething
};
// 通过事件监听可以设置多个监听方法 (IE9之前不支持)
box.addEventListener("click", () => {
  // dosomething
});
// 兼容IE9之前的写法
box.attachEvent("onclick", () => {
  // dosomething
});

// 解绑事件
box.onclick = null;
// 当去监听器时，就需要传入需要删除的方法，这么做的前提是设置监听方法的时候不能传入匿名方法，如下
function clickMethod() {
  //dosomething
}
box.addEventListener("click", clickMethod);
box.removeEventListener("click", clickMethod);
```

- 事件流
  - 捕获阶段，从外向内传播事件，`document->html->body->div`
  - 冒泡阶段，从内向外传播事件，`div->body->html->document`

```js
// 传统注册的方法只能在冒泡阶段触发
div.onclick = function() {};
// attachEvent IE9以下只能冒泡阶段触发
div.attachEvent("onclick", function() {
  //dosomething
});

// addEventListener可以通过添加第三个参数来指定当前方法是在捕获阶段还是在冒泡阶段触发
div.addEventListener(
  "click",
  function() {
    //dosomething
  },
  true
);
```

- 事件触发顺序为，从外至内执行捕获的事件，然后从内之外执行冒泡的事件。

```js
let box = document.querySelector(".box");
let inner = box.children[0];
let son = inner.children[0];

function fn() {
  console.log(this);
}

box.addEventListener("click", fn);
inner.addEventListener("click", fn, true);
son.addEventListener("click", fn);
```

- 事件对象 `event`

```js
div.onclick = function(e) {
  // 兼容IE678
  e = e || window.event;
};

div.attachEvent("onclick", function(e) {
  // IE678 不支持
  e;
});
```

- `e.target` 和 `this` 的区别
  - `e.target` 返回的是触发事件的对象
  - `this` 返回的是绑定事件的对象
  - 当一个事件触发，不一定是绑定他的元素触发的事件，也可能是当前元素的子元素触发的当前事件。

```html
<div class="box">
  <div class="inner">
    <div class="son">
      content
    </div>
  </div>
</div>
```

```js
let box = document.querySelector(".box");
let inner = box.children[0];
let son = inner.children[0];

// 点击content文字触发方法
function fn(e) {
  console.log(this); // box
  console.log(e.target); // son
  console.log(e.srcElement); // IE678
}
box.addEventListener("click", fn);
```

- 常用事件属性和方法

  - `e.type` 方法类型,不带`on`
  - `e.preventDefault()` 阻止默认行为 IE678 不支持
  - `e.stopPropagation()` 阻止冒泡
  - `e.cancelBubble = true` IE678 阻止毛泡

- 事件委托/代理/委派

> - 如下代码。想要为每个`li`创建同一个点击方法，按照常规方法应该为每个`li`添加监听,这样会浪费很多的性能去添加监听器。如果利用冒泡机制，使用事件委托的方式，给`ul`添加监听器，这样就通过`li`的冒泡触发了`ul`的监听器。如果想要获取具体点击了哪个`li`可以通过`e.target`去获取。

```html
<ul>
  <!-- 点击li 冒泡会触发ul的监听器-->
  <li>001</li>
  <li>002</li>
  <li>003</li>
  <li>004</li>
  <li>005</li>
</ul>
```

```js
let ul = document.querySelector("ul");
ul.addEventListener("click", (e) => {
  e.target.style.backgroundColor = "red";
});
```

- 常用鼠标事件
  - `onlick` 点击
  - `onmouseenter`经过自身盒子触发，不会冒泡
  - `onmouseover`鼠标经过自身或者子盒子触发，会冒泡
  - `onmouserleave` 鼠标离开 不会冒泡 和`onmouseenter` 对应
  - `onmouseup` 鼠标弹起触发
  - `onmouseout` 鼠标离开触发
  - `onmousedown` 鼠标按下触发
  - `onmousemove` 鼠标移动触发
  - `onfocus` 获得鼠标焦点
  - `onblur` 失去鼠标焦点
  - `contextmenu` 控制显示上下文菜单 主要用来取消默认的上下文菜单
  - `selectstart` 开始选中内容时候触发
  - `element.click()` 当前元素执行一次点击事件 会冒泡
  - `element.focus()` 获取焦点
  - `element.blur()` 失去焦点

```js
// 阻止弹出右键菜单
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
// 阻止选中行为
document.addEventListener("selectstart", (e) => {
  e.preventDefault();
});
```

- 鼠标事件对象 `MouseEvent`
  - `e.clientX` 鼠标相对视口的 X 坐标
  - `e.clientY` 鼠标相对于视口的 Y 坐标
  - `e.screenX` 鼠标相对屏幕的 X 坐标
  - `e.screenY` 鼠标相对屏幕的 Y 坐标
  - `e.pageX` 鼠标相对于整个文档页面的 X 坐标 _IE9 以下不支持_
  - `e.pageY` 鼠标相对于整个文档页面的 Y 坐标 _IE9 以下不支持_
  -

```js
document.addEventListener("mousemove", (e) => {
  div.style.left = e.clientX + "px";
  div.style.top = e.clientY + "px";
});
```

- 常用键盘事件
  - `onkeyup` 键盘弹起触发
  - `onkeydown` 键盘按下触发 一直按着一直触发
  - `onkeypress`键盘按下触发，但是功能按键不会触发这个方法 一直按着一直触发
  - 如果三者都有 执行顺序是`down -> press -> up`

```js
function fn(e) {
  console.log(e);
}
document.addEventListener("keyup", fn);
document.addEventListener("keydown", fn);
document.addEventListener("keypress", fn);
```

- 键盘事件对象 `KeyBoardEvent`
  - `keyCode` 按键对应的 ASCII 码 大小写字母是一样的，但是按下和弹起的 ASCII 码是不一样的

```js
const search = document.querySelector('.search')
const search = document.querySelector('.search')

        document.addEventListener('keyup', e => {
            e.keyCode === 83 && search.focus()
        })const search = document.querySelector('.search')

        document.addEventListener('keyup', e => {
            e.keyCode === 83 && search.focus()
        })
document.addEventListener('keyup', e => {
    e.keyCode === 83 && search.focus()
})
```

- 移动端事件

  - `touchstart` 开始触摸
  - `touchend` 结束触摸
  - `touchmove` 触摸+移动

- 移动端事件对象 `TouchEvent` 用于描述一个或者多个触点。
  - `e.touches` 所有触点的列表。
  - `e.targetTouches` 当前 Dom 元素上的触点列表，最常使用，重点使用。
  - `e.changedTouches` 触点状态变化列表，从无到有或者从有到无，手指离开屏幕的时候可以通过此属性获取触点信息。以上两个都为空。
  - `e.targetTouches[0]` 获取第一个触点，其中包含位置信息。

* 过渡事件 使用`transition`的元素拥有该事件
  - `transitionend`过渡结束时触发过渡在完成前被移除或者`display:none`的时候不会触发方法
  - `transitionrun`该事件在首次生成 CSS 过渡时（即`transition-delay`开始之前）触发。包含延迟时间。
  - `transitionstart`当 CSS 过渡实际开始时（即`transition-delay`结束后），将触发此事件，动画实际开始时候触发，不包含延迟时间 。
  - `transitioncancel`动画被取消时触发，`display:none`触发，过渡被终止时候触发，比如设置鼠标悬浮时候触发某个动画，在动画完成之前移出鼠标，触发该事件，当正在过渡的属性被改变时触发。

### 修改元素

- `innerText`
  - 渲染不解析标签。该属性是可读可写的。读取出内容会去除空格和换行。

```js
console.dir(box.innerText);
box.onclick = function() {
  box.innerText = "<div>123</div>";
};
```

- `innerHTML`
  - 渲染并解析标签。该属性是可读可写的。读取的内容保留空格和换行。

```js
console.dir(box.innerHTML);
box.onclick = function() {
  box.innerHTML = "<div>123</div>";
};
```

- 读写元素属性，可以直接用`标签对象.属性`来读写，只能获取内置属性，可以用方法来读写，优势是可以获取自定义属

```js
// 读
element.attr;
element.getAttribute("my-attr");
// H5获取自定义属性
element.dataset.attr;
element.dataset["attr"];
// 多个短横需要采用驼峰通过dataset获取属性
element.dataset.someAttr;

// 写
// H5规范如果是自定义属性加上 data- 前缀
element.attr = "attr";
element.setAttribute("data-attr", "value");

// 移除属性
element.removeAttribute("data-attr");
```

- `element.style` 修改行内样式，驼峰写法。

```js
let ls = document.querySelectorAll("li");
for (var i = 0; i < ls.length; i++) {
  let index = "100";
  ls[i].backgroundPosition = "0 -" + index + "px";
}
```

- `element.classList`操作样式类。

```js
// 如果有就删除 没有就添加box属性
box.classList.toggle("box");
box.classList.add("box");
box.classList.remove("box");
```

- `element.className`直接指定类，会去除原来的类。

```js
let ls = document.querySelector("li");
ls.classList.add("class");
```

### 节点操作

- 利用节点层级关系获取元素，比 dom 查询更方便。
  页面中所有内容都是节点。所有节点都可以通过 js 访问，均可被修改、删除、新增。

- 节点属性

  - 节点类型 nodeType
    - 元素节点 - 1
    - 属性节点 - 2
    - 文本节点 - 3 （包含文字 空格 换行）
  - 节点名称 nodeName
  - 节点值 nodeValue

- 获取节点

```js
// 获取离元素最近的父级节点
box.parentNode;
// 包含文本节点和元素节点，但不包含属性节点
box.childNodes;
// 仅包含子元素节点
box.children;

// 获取子级首尾节点，会取到文本节点
box.firstChild;
box.lastChild;

// 获取子级首尾元素节点  IE9以上
box.lastElementChild;
box.firstElementChild;

// 实际开发中使用children达到获取子级首尾元素的效果
box.children[0];
box.children[box.children.length - 1];

// 获取兄弟节点 包括文本节点
box.nextSibling;
box.previousSibling;

//  获取兄弟元素节点 不兼容IE9以下 需要自行添加polyfill
box.nextElementSibling;
box.previousElementSibling;
```

- 创建节点和添加节点
- 使用先创建后添加的方式。原因是如果使用`innerHTML`性能差很多,因为传入字符串还需要浪费资源去解析。如果拼接完毕后一次写入，放弃循环，`innerHTML`性能会有提升。 多方案比较参见网站。[查看性能对比](https://jsperf.com/appendchild-vs-documentfragment-vs-innerhtml/61)

```js
// 创建节点
let div = document.createElement("div");
div.innerText = "123";

// 添加节点
// 首先获取父级节点
let box = document.querySelector(".box");

// 在父元素的子节点列表的末尾添加节点  如果重复操作同一个元素 会将前边的该元素删除
box.appendChild(div);

// 在某个节点前添加节点
// `insertBefore(插入的节点，参照的节点)`
box.insertBefore(div, box.children[0]);

// 删除某个子节点
box.removeChild(box.children[3]);

// 拷贝节点，参数为是否进行深拷贝，即是否克隆所有子节点
// 浅拷贝时也会将属性节点拷贝过来
box.children[0].cloneNode(true);
```

## BOM 浏览器对象模型

- bom 中顶级对象是`window`，bom 主要是和浏览器打交道，完成跳转，滚动窗口，调整窗口大小，浏览器事件等等。dom 是包含在 bom 中的，`window.document`

### `window` 对象

- `window` 对象，是 js 访问浏览器窗口的一个接口，是一个全局对象，定义在全局作用于中的各变量都会变成`window`的属性或者方法。

  - 注意：`window.name`本身是有值的，不要通过`var name = 'something'` 不要重新赋值。

- `window.noload`或者`window.addEventListener('load',e=>{})`当文档内容全部加载完成之后执行方法，需要等待所有图片，flash，css 等等加载完执行。

```js
// 好处是多个监听不会互相覆盖
window.addEventListener("load", (e) => {
  console.log(e);
});
window.onload = (e) => {};
```

- `window.addEventListener('DOMContentLoaded',e=>{})` DOM 加载完毕执行，不包含图片，flash，css 等就可以执行。

```js
// 文档内容(标签)加载完就会执行
window.addEventListener("DOMContentLoaded", (e) => {
  console.log(e);
});
```

- `window.onresize`或者`window.addEventListener('resize',function(){})`浏览器窗口变化时触发方法。
- `window.innerWidth`屏幕的尺寸，配合 onersize 可以进行部分响应式操作。
- `window.setTimeout(fn,delay)`执行一次，返回一个定时器编号。
- `window.clearInterval(n)`清除定时器
- `window.setInterval(fn,delay)`无限执行，返回一个定时器编号。
- `window.clearInterval(n)`清除定时器
- `this`指向 略。
- `window.onload`在火狐浏览器下会有问题，原因是火狐浏览器是将上一页的内容缓存进内存中，再返回上个页面的时候不会触发该事件
- `window.pageshow`为了兼容上述火狐浏览器的问题，只要是页面展示就会触发这个方法

### js 在浏览器中的运行机制 `event loop`(不适用 node)

- 宏任务和微任务：普通任务队列和延迟队列中的任务，都属于宏任务，对于每个宏任务而言，其内部都有一个微任务队列,其实引入微任务的初衷是为了解决异步回调的问题。
- V8 引擎对于微任务的优化如下：在每一个宏任务中定义一个微任务队列，当该宏任务执行完成，会检查其中的微任务队列，如果为空则直接执行下一个宏任务，如果不为空，则依次执行微任务，执行完成才去执行下一个宏任务。
- 常见的微任务有`Promise.then`(或`.reject`) 以及以`Promise`为基础开发的其他技术(比如`fetch API`), 还包括 V8 的垃圾回收过程。
- 详述 js 代码运行机制
  1. 一开始整段脚本作为第一个宏任务执行,执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列，当前宏任务执行完出队。
  2. 检查执行微任务队列，如果有则依次执行，直到微任务队列为空
  3. 检查执行浏览器 UI 线程的渲染工作
  4. 检查执行是否有 WebWorker（自行百度）任务
  5. 执行队首新的宏任务，循环往复，直到宏任务和微任务队列都为空

```js
let promise = new Promise((res, rej) => {
  console.log("start_1");
  res();
});
promise.then(() => {
  console.log("Promise1");
  setTimeout(() => {
    console.log("setTimeout2");
  }, 0);
});
setTimeout(() => {
  console.log("setTimeout1");
  Promise.resolve().then(() => {
    console.log("Promise2");
  });
}, 0);
console.log("start_2");
//执行结果：start_1 start_2 promise1 setTimeout1 Promise2 setTimeout2
```

### `window.location`对象

- `location.href`整个 url（可以用来实现当前页面跳转，不开启新页签）
- `location.host` 主机/域名
- `location.port` 端口
- `location.pathname` 路径
- `location.search` 参数（带`?`）
- `location.hash` #后边值
- `location.assign(url)`跳转指定页面，可以记录浏览历史，可以后退。
- `location.replace(url)`跳转，不记录历史，不可后退
- `location.reload(boolean)`刷新页面,如果需要清除缓存传入布尔值`true`(强制刷新)

### `window.navigator`对象

- `navigator.userAgent` 客户端信息

### `window.history` 对象

- `history.back()` 后退 1
- `history.forward()` 前进 1
- `history.go(number)` 前进或者后退 n

### `offset` 元素偏移量

- `el.offsetParent` 返回当前父级定位元素（非`static`元素），逐级寻找，如果没有就返回`<body>`
- `el.offsetTop` 元素相对`offsetParent`元素上方的偏移量
- `el.offsetLeft` 元素相对`offsetParent`元素左侧的偏移量
- `el.offsetWidth` 返回自身包括`padding、border、content`的宽度，返回值不带单位
- `el.offsetHeight` 返回自身包括`padding、border、content`的高度，返回值不带单位
- `offset`和`style`区别(两种方式都可以获取宽高)
  - `offset`可以获取内联样式也能获取外部 link 或者 style 中的样式，获取到的样式数据是没有单位的，包含`padding和border`，**只读**
  - `style`只能获取内联样式中的数值，不能获取`<style>`标签中的样式，获取到的内联样式数据是带单位的，如`50px`，不包含`padding和border`，**可读写**
  - 总结：取值用`offset`，改值用`style`

```js
const box = document.querySelector(".box");

box.addEventListener("click", function(e) {
  console.log(e.pageY - this.offsetTop);
  console.log(e.pageX - this.offsetLeft);
});
```

### `client` 元素可视区相关属性

> 在响应式布局的时候时常需要判断当前视口的参数来决定当前页面的文字大小和一些样式，这就用到了以下属性，另外需要注意和`offset`系列的区别。

- `element.clientTop` 返回元素上边框大小
- `element.clientLeft` 返回元素左边框大小
- `element.clientWidth` 返回自身包括`padding、centent`的宽度，不包含边框，返回值不带单位,和`offsetWidth`最大区别是不带边框。
- `element.clientHeight` 返回自身包括`padding、centent`的高度，不包含边框，返回值不带单位，和`offsetHeight`最大区别是不带边框。

### `scroll` 滚动区域相关属性

- `element.scrollTop` 被滚动到上边的长度 (滚动距离)
- `element.scrollLeft` 被滚动到左边的长度 (滚动距离)
- `element.scrollWidth` 返回自身实际宽度 不含边框
- `element.scrollHeight`返回自身实际高度，不含边框，即使超过了当前元素区域，也会计算超出的长度。而`clientHeight`是不同的，`clientHeight`不会计算超出的区域。
- `element.onsrcoll` 元素滚动时候触发
- `window.pageYOffset`如果当前页面是可以滚动的，这个参数代表窗口的滚动距离。
- 简单对比三大系列

| offset                                                                                 | client                                                                 | scroll                                           |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------ |
| `border、padding、content`，会计算滚动条的宽度，不计算视区之外的内容，会把边框计算在内 | `padding、content`，，不会计算滚动条的宽度，只计算能看见的内容和内边距 | `content、padding`、滚动出视区的内容也会计算在内 |

- 案例：简易轮播图

```js
function animate(ele, target, fn) {
  _animate(ele, target - ele.offsetLeft, fn);
}
function _animate(ele, long, fn) {
  if (ele.timer) return;
  let init = ele.offsetLeft;
  ele.timer = setInterval(function() {
    let step = long > 0 ? Math.ceil(long / 10) : Math.floor(long / 10);
    if (ele.offsetLeft - init === long) {
      clearInterval(ele.timer);
      ele.timer = null;
      fn();
      return;
    }
    ele.style.left = ele.offsetLeft + step + "px";
  }, 15);
}
const slideLeft = document.querySelector(".left");
const slideRight = document.querySelector(".right");
const wrapper = document.querySelector(".wrapper");
const ul = document.querySelector(".pic");
wrapper.addEventListener("mouseover", function(e) {
  slideLeft.style.display = "block";
  slideRight.style.display = "block";
});
wrapper.addEventListener("mouseout", function(e) {
  slideLeft.style.display = "none";
  slideRight.style.display = "none";
});
slideLeft.addEventListener("click", function(e) {
  _animate(ul, -500, function() {
    console.log("over");
  });
});
slideRight.addEventListener("click", function(e) {
  _animate(ul, 500, function() {
    console.log("over");
  });
});
```

### 本地存储 `sessionStorage` & `localStorage`

- `sessionStorage` 最多存 5M
  - 生命周期 ：关闭浏览器窗口数据就会消失
  - 同一个窗口/页面可以共享
  - 以键值对存储
  - 刷新浏览器也不会消失

```js
sessionStorage.setItem("key", "value");
sessionStorage.getItem("key");
sessionStorage.removeItem("key");
sessionStorage.clear();
```

- `localStorage` 最多存 20M
  - 生命周期：永久有效，除非手动删除，关闭页面也存在
  - 可以多个页面共享，同一浏览器共享
  - 以键值对存储

```js
localStorage.setItem("key", "value");
localStorage.getItem("key");
localStorage.removeItem("key");
localStorage.clear();
```
