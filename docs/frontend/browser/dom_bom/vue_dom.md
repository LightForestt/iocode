## vue

> 等待添加

## vue-router

- `window.history.pushState` adds a state to the browser's session history stack.在历史栈添加一个路由状态。

举个例子：假设初始 url`http://mozilla.org/foo.html`,执行代码`history.pushState({foo:bar}, "page 2", "bar.html")`，将导致显示 URL 栏`http://mozilla.org/bar.html`，但**_不会_**导致浏览器加载 bar.html,也不会检查 bar.html 是否存在。现在假设现在用户再次跳转到http://google.com。对比如下两种回退操作的区别： - 首次单击上一步按钮。此时，URL 栏将显示`http://mozilla.org/bar.html`并且`history.state`包含{foo:bar}这个对象。popstate 事件不会被触发，因为是页面被重新加载而不是在 mozilla 内部进行跳转,是从 google 跳转到 mozilla。 - 如果用户再次点击上一步，此时是在 mozilla 内部进行回退，此时`history.state`栈顶元素弹出，这时候会触发 popState 事件。 - 每个 state 对应一个对应的 url。

- `window.history.replaceState` modifies the current history entry, 修改当前历史栈栈顶元素 。
  举个例子：假设现在地址栏 `https://www.mozilla.org/foo.html`，然后使用 `history.pushState({foo:bar}, "page 2", "bar0.html")`添加 bar0.html 到地址栏中 地址栏变为 `https://www.mozilla.org/bar0.html`此时调用`history.replaceState(stateObj, '', 'bar2.html')` 会让路由地址`https://www.mozilla.org/bar2.html` 如此展示，同样的，也不会检测 bar2.html 是不是存在更不会加载它，然后点击返回上一步或者 go(-1) 会发现页面并没有回到 bar0 ，而是直接跳转到了 foo 。

* `window.location.assign`方法会触发窗口加载并显示指定的 URL 的内容,栈顶添加一条历史记录。
* `window.location.replace`方法以给定的 URL 来替换当前的资源。 与 assign() 方法 不同的是，调用 replace() 方法后，当前页面不会保存到会话历史中（session History），这样，用户点击回退按钮时，将不会再跳转到该页面。替换当前栈顶元素。

- `window.scrollTo` 滚动到特定元素点
- `window.scroll` 同上
- `window.scrollBy` 滚动特定距离
  上述三个方法都接受同样的参数 - (options)配置 包含三项{x,y,isSmooth} - (x,y) x y 要滚动的像素数，表示你想要置于文档左上角的像素点的横纵坐标。 - 对于 scrollBy 就代表滚动的 x y 的距离。

* `window.addEventListener('popstate',()=>{})`当活动历史记录条目更改时，将触发 popstate 事件。如果被激活的历史记录条目是通过对 history.pushState（）的调用创建的，或者受到对 history.replaceState（）的调用的影响，popstate 事件的 state 属性包含历史条目的状态对象的副本。也就是第二个参数，保存了当前 url 对应的特定数据。需要注意的是调用 history.pushState()或 history.replaceState()不会触发 popstate 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在 Javascript 代码中调用 history.back()或者 history.forward()方法，go(-1)）

- `window.addEventListener('hashChange',()=>{})`当 URL 的片段标识符更改时，将触发 hashchange 事件 (跟在＃符号后面的 URL 部分，包括＃符号),

* `window.pageXOffset` scrollX 的别名 水平方向已经滚动的距离
* `window.pageYOffset` scrollY 的别名 垂直方向已经滚动的距离
* `Element.scrollTop`属性可以获取或设置一个元素的内容垂直滚动的像素数。一个元素的 scrollTop 值是这个元素的内容顶部（卷起来的）到它的视口可见内容（的顶部）的距离。
  - 当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为 0。
  - 如果一个元素不能被滚动（例如，它没有溢出，或者这个元素有一个"non-scrollable"属性）， scrollTop 将被设置为 0。
  - 设置 scrollTop 的值小于 0，scrollTop 被设为 0
  - 如果设置了超出这个容器可滚动的值, scrollTop 会被设为最大值。

- `HTMLElement.getBoundingClientRect`方法返回元素的大小及其相对于视口的位置。

## vue-lazyLoad

> 等待添加
