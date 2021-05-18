#### `SEO` 优化

Search Engine Optimization 搜索引擎优化。

> 建议一个网站中只有一个 h1 元素，最重要的信息展示到 h1 中 多个 h1 会被搜索引擎被认为是 K 站，最后起到反作用，无法起到搜索提高排名的作用。

#### `<p>` 标签不能包含 `<div>` 标签

```html
    <p>
        <div>123</div>
    </p>
<!-- 渲染如下 引起样式错乱-->
    <p></p>
        <div>123</div>
    <p></p>
```

#### `<dl> <ul> <ol>`元素

> - ol>li 有序
> - ul>li 无序
> - dl>dt+dd 定义列表

```html
<dl>
  <dt>水果：</dt>
  <dd>西瓜、苹果</dd>
  <!-- dd 自带40px缩进-->
</dl>
```

#### `list-style-type` 列表左侧符号类型

> - 改变无序列表的列表左侧符号样式`disc`实心圆 `cir`空心圆 `square`方块

```less
div {
  list-style-type: none;
}
```

#### `list-style-image` 列表左侧图片

> - 设置左侧符号为图片

```less
div {
  list-style-image: url(a.jpg);
}
```

#### `list-style-position` 左侧符号位置

> - 左侧符号的大小是否计算到`content`盒子

```less
div {
  list-style-position: inside | outside;
}
```

#### `list-style` 列表左侧符号缩写

> - 缩写样式 一般都设置`none`去除左侧默认样式

```less
ul {
    //通过设置p0+m0可以将左侧符号位置删除
    padding: 0;
    margin: 0;
    list-style：none;
}
```

#### `<table>` 表格

```html
    <table class="table">
        <caption></caption>
        <thead>
            <th>
                <td></td>
            </th>
        </thead>
        <tbody>
            <tr>
                <td></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
            </tr>
        </tfoot>
    </table>
```

#### `border-collapse` 边框是否合并

> - 边框合并,默认是边框分离的

```less
table {
  border-collapse: separate;
}
```

#### `border-spacing` 单元格间距

> - 设置单元格之间的间距 (水平间距 垂直间距)|(间距)

```less
.table {
  border-spacing: 10px 20px;
}
```

#### `<from>`表单

```html
<form action="">
  <!-- fieldset 表单字段集 -->
  <fieldset>
    <!-- 字段说明 -->
    <legend>表单字段集说明</legend>
    <!-- input也是行内替换元素 -->
    text 文本: <input type="text" name="" id="" /><br />
    button 按钮: <input type="button" value="button" /><br />
    checkbox 复选框: <input type="checkbox" name="" id="" /><br />
    color 选择颜色: <input type="color" name="" id="" /><br />
    file 文件: <input type="file" name="" id="" /><br />
    image 图片: <input type="image" src="" alt="" /><br />
  </fieldset>
  email: <input type="email" name="" id="" /><br />
  number: <input type="number" name="" id="" /><br />
  password: <input type="password" name="" id="" /><br />
  radio: <input type="radio" name="" id="" /><br />
  range: <input type="range" name="" id="" /><br />
  search: <input type="search" name="" id="" /><br />
  tel: <input type="tel" name="" id="" /><br />
  url: <input type="url" name="" id="" /><br />
  time: <input type="time" name="" id="" /><br />
  date: <input type="date" name="" id="" /><br />
  week: <input type="week" name="" id="" /><br />
  month: <input type="month" name="" id="" /><br />
  datetime: <input type="datetime" name="" id="" /><br />
  datetime-local: <input type="datetime-local" name="" id="" /><br />
  hidden 隐藏（需要附加在表单中去提交但是不需要展示）:
  <input type="hidden" name="" /><br />
  submit: <input type="submit" value="" /><br />
  reset: <input type="reset" value="" /><br />
</form>
```

#### `text-indent` 字符缩进

```less
.txt-it(@l:20px) {
  text-indent: @l;
}
```

#### `text-decoration` 文字装饰线

```less
// 上划线overline 下划线underline  删除线line-through 波浪线wavy underline
.txt-dec(@s:solid,@l:underline,@c) {
  text-decoration: @arguments;
}
// <u> 默认下划线标签
```

#### `letter-space / word-space` 文字或者词语空间

```less
.txt-spc(@ll:0,@wl:10px) {
  letter-spacing: @ll;
  // 设置负数会默认挤在一起
  word-spacing: @wl;
}
```

#### `text-transform` 大小写转换

```less
// 1-首字母大写 2-小写 3-大写 4-无效果
@txt-trans-list: capitalize, lowercase, uppercase, none;
.t-t(@f:4) {
  text-transform: extract(@txt-trans-list, @f);
}
```

#### `text-align` 元素内容（不只只是文本）在元素内的水平对齐方式

```less
// 块级元素独占一行 设置居中无效 设置为行内盒子才会居中
.t-a(L) {
  text-align: left;
}
.t-a(R) {
  text-align: right;
}
.t-a(C) {
  text-align: center;
}
.t-a(J) {
  // 左右对齐 但对最后一行无效 当文字只有一行无效
  text-align: justify;
  // 可以通过如下属性去设置最后一行样式
  text-align-last: center;
}
```

#### `font-size` 文字大小

```less
#id {
  font-size: 16px;
}
// 首先继承父元素的font-size属性
// em 也是相对于父元素的font-size
// rem 是相对根元素的font-size
// 百分比 也是相对于父元素的font-size
```

#### `font-family` 字体名称

```less
#id {
  // 英文字体仅适用英文 中文字体同时适应中文和英文 可以写多个
  // 另外注意 ***将英文字体写在前边，中文字体写在后边*** 中英文字体区分开
  // 以下是淘宝字体
  font-family: tahoma, arial, "Hiragino Sans GB", "\5b8b\4f53", sans-serif;
}
```

#### `font-weight` 文字粗细

```less
#id {
  // 加粗字体 100-900 | bold | bolder | normal=400
  font-weight: bold;
}
```

#### `font-style` 文字样式

```less
#id {
  font-style: italic;
  // italic - 要求字体本身支持斜体 如果文字样式本身不支持斜体 则无效
  // oblique - 将文字倾斜 总能达到效果
}
```

```html
<!-- 默认斜体标签 -->
<i class="txt">hello hello hello </i>
<cite class="txt">hello hello hello </cite>
<var class="txt">hello hello hello </var>
<dfn class="txt">hello hello hello </dfn>
<address class="txt">hello hello hello</address>
<em class="txt">hello hello hello </em>
```

#### `font-varinet` 小写样式

```less
#id {
  font-variant: small-caps;
}
```

#### `line-height` 行高

![baseline](C:\Users\Mr.Xu\Desktop\CODE\note.md\css\css.learn.imgs\baseline.png)

```less
#id {
  // line-height 行高是两行文字 baseline 之间的间距，也就是行距 + 文字高度
  // 多用于单行文字的居中 height = line-height
  line-height: <length>;
  // height 是元素的整体高度
}
```

#### `font` 缩写

> - `font-style font-variant font-weight font-size/line-height font-family`
> - `font-style font-variant font-weight` 顺序任意 可有可无
> - `font-size/line-height`中的`/line-height`可省略,如果写`line-height` 必须要上斜线`/` 另外注意，当`line-height`不带单位的时候，代表`line-height`值为当前`font-size`的多少倍。
> - `font-size 和 font-family不可倒换位置 也不可能省略`

```less
#id {
  font: italic small-caps bold 20px/50px "宋体";
}
```

#### 动态伪类

```less
// 设置禁用元素的样式
:disabled {
  color: red;
}
//设置选中无背景颜色
::selection {
  background: none;
}
//选中状态
:checked {
  //...
}
:target {
}
// 链接状态伪类
a:hover {
}
a:active {
}
a:visited {
}
a:link {
}
// 其他元素可设置hover伪类
div {
  background-color: blue;
  &:hover {
    background-color: red;
  }
}
// 获取焦点 可以通过鼠标点击或者使用tab键去获取焦点
// 可以通过设置tabindex属性来调整tab选中元素的顺序 设置为-1 标志当前不可用tab选中
input {
  color: blue;
  &:focus {
    background-color: red;
  }
}
```

#### 结构伪类

```less
// 任何元素中的第三个子元素
:nth-child(3) {}

// 交集选择器  选择第三个元素且第三个元素是p  前两个元素无需是p元素 也就是说 p p p  和 div div p 和 p div p 中的第三个p元素都能选中 如果第三个元素不是P 则当前样式无效
p:nth-child(3) {}

// 带n的就是 讲n从0开始代入
:nth-child(n) // 选择所有元素
:nth-child(2n) //选择 2 4 6 8
:nth-child(2n+1) //选择 1 3 5 7
:nth-child(3-n) //选择 3 2 1 个元素 也就是3之前的元素
:nth-child(n+3) //选择 3之后的元素
:nth-last-child//就是反向选择

//类型选择
:nth-type-child
p {
    &:nth-of-type(3) { // 选P类型中的第三个 仅仅匹配P元素
        color: red;
    }
}

//代表根元素
:root
//匹配没有兄弟节点的节点
:only-child
//匹配空节点
:empty
```

#### 否定伪类

```less
:not(div) // 选中所有非div元素
body :not(div) {
  // 先选中body的后代元素 在进行筛选
  color: orange;
}
```

#### 伪元素

```less
//选中一行
::first-line {
  color: red;
}
//选中首个文字
::first-letter {
  font-size: 100px;
}

//前边插入内容 ::before和::after不支持设置宽高 但是可以通过改变display来设置宽高
::before {
  content: ""; //content属性绝对不可省略 可以是url()
  font-size: 0;
  background-color: red;
  margin: 10px;
  overflow: hidden;
}
//后边插入内容
::after {
}
```

#### css 的特性

- 继承

```less
inherit from div.box// 继承自 div.box 谷歌浏览器中样式提示
比如font-size color font-weight 等等都是可以继承
如果自元素中有同样属性 会对父元素属性进行覆盖 
// 罗列下可继承的样式
MDN - 搜索font-size => The font-size CSS property

css属性继承的是计算值，并不是当初编写属性时的指定值（字面值）。 如下解释
div {
  font-size: 20px;
  span {
    font-size: 0.5em;
    p {
      // 此处继承的是计算之后font- size  也就是说继承的是20px*0.5em = 10px
      // 而不是吧0.5em继承过来
    }
  }
}
```

- 层叠

```less
同时给一个div设置多个的color样式
// 1.基本层叠：相同的选择器 比如都用class选择器  后边的一定会把前边的color样式层叠掉
// <div class="class1 class2 class3"></div>

.class1 {
    color:red;
}
.class2 {
    color:blue;
}
// 2.权重层叠 不同选择器
!important(10000) >
内联样式(1000) >
id(100) >
class(10)|属性选择器(10)|伪类(10) >
元素选择器(1)|伪元素(1) >
统配选择器* (0)
```

- css 失效原因
  1. css 选择器优先级太低
  2. 选择器书写错误
  3. css 使用错误 浏览器无法识别属性值 或者当前属性不包含当前设置值

#### html 中的元素类型及其 css 特性

```less
//根据盒子排列方式
//块级元素： block-level elements
1. 独占父元素一行
div p pre h1-h6 ul ol li dl dt dd table form article aside footer header
//行内级元素：inline-level elements
2.多个行内级元素可以在父元素的同一行中显示
a img span strong code iframe canvas input

//根据浏览器的渲染行为
//替换元素：replaced elements
1.元素本身没有实际内容，浏览器会根据元素的类型和属性，来决定元素的具体显示内容
img input iframe video embed canvas audio object
//非替换元素：non-replaced elements
1.元素本身室友内容的，浏览器会直接将其内容显示
span div p pre ...

```

![块级元素](C:\Users\Mr.Xu\Desktop\CODE\note.md\css\css.learn.imgs\块级元素.png)

#### 行内非替换元素`(display:inline)`的注意点 ：

- 以下属性不起作用

  > 1. width
  > 2. height
  > 3. margin-top
  > 4. margin-bottom

- 以下属性有特殊效果
  > 以下属性虽然会多出部分区域 实际上这部分区域不会占据 html 中的空间。
  >
  > 1. padding-top
  > 2. padding-bottom
  > 3. border-top
  > 4. border-bottom
  >    解决：通过将当前元素设置为`display:inline-block`来避免这些特殊的效果。

#### `border-radius`

> 设置盒子圆角

```less
div {
  // 其中第一个值代表的是椭圆的水平半径 第二个值代表椭圆的垂直方向半径
  // 如果只传入一个值 默认是圆
  border-top-left-radius: 50px 10px;
  // 分别代表    上  左  上  右  / 下 右 下 左
  border-radius: 10px 20px 30px 40px/15px 25px 35px 45px;
}
```

#### `outline`

> outline 不占据 html 空间。
> 主要应用：去除`<a> <input>`等元素的 focus 轮廓

```less
a,
input,
textarea {
  // 去除默认选中样式
  outline: none;
}
```

```less
* {
  // 查看当前网站结构
  outline: 1px solid red;
}
```

#### `box-shadow`

> 每个阴影用一个`<shadow>`来表示 ，可以设置多个阴影，用逗号分隔开，从前到后叠加
> `<shadow> = inset? && <length>{2,4} && <color>?`

```less
div {
  // inset 代表向元素内扩散阴影还是外
  // 前两个<length>代表的是偏移的像素（也有正负）
  // 第三个<length>代表是模糊程度
  // 第四个<length>代表的是延申距离（向四周伸缩）
  // color 代表阴影具体的颜色
  box-shadow: inset 10px 0 5px skyblue, -10px 0 5px skyblue, 0 10px 5px skyblue;
}
```

#### `text-shadow`

> 字体阴影 没有`inset且<length>{2,3}` > `<shadow> = <length>{2,3} && <color>?`

```less
div {
  text-shadow: 5px 5px 5px red;
}
```

#### `box-sizing`

> 默认 `content-box` 内容盒子 设置宽高的时候指定的是内容的宽高
> `border-box` 边框盒子 设置宽高时包含 border 和内边距

#### css 水平居中及原理

- 普通文本 `div{text}`

```less
div {
  text-align: center;
}
```

- 行内元素 `div>span`

```less
div {
  text-align: center;
}
```

- 行内替换元素 `div>img`

```less
div {
  text-align: center;
}
```

- 行内块级元素 `div>span[style="display:inline-block;"]`

```less
div {
  //inline-block的元素也是内容 也用text-algin来控制居中
  text-align: center;
}
```

- 块级元素 `div>div`
  > 原理：`margin-left的属性为auto`浏览器会将没有占满的父元素的剩余空间分配给`margin-left`,反之,`margin-right:auto`会将剩余空间全部分配给`margin-right`,如果两者同时设置如`margin:0 auto`,就代表左右`margin`均分剩余空间,也就是元素居中显示。

> 注意：`margin-top`和`margin-bottom`是无效的，除非父元素高度为`auto`，但是父元素如此设置会使父元素包裹子元素，实际上也是无效的。

```less
div {
  height: 100px;
}
div > div {
  //在需要居中的元素上设置
  margin: 0 auto;
  width: 20%;
  height: 100px;
}
```

#### `background` 背景 缩写

> - 设置元素的背景 1.颜色 2.图片 3.平铺和重复 4.`attachment`5.定位等等缩写形式
> - 常用格式 `image position/size repeat attachment`
> - 注意：`size`可以省略,如果不省略必须加`/`并且放在`position`后边 例如 `red url() center center/500px 500px no-repeat -100px`

```less
div {
  background-color: red;
  background-image: url(@{url});
}
```

#### `background-repeat` 背景平铺

> 背景图片重复

```less
div {
  //  repeat-x / repeat-y / no-repeat
  background-repeat: repeat;
}
```

#### `background-size` 背景大小

> - 默认 auto 图有多大就展示多大
> - cover 拉伸至当前元素大小
> - contain 拉伸但不改变图片宽高比
> - `<length>`一个水平方向占据空间 两个代表水平和垂直方向

```less
div {
  background-size: auto;
}
```

#### `background-position` 背景位置

> - `<length>| key` 设置背景位置
> - `key => left center right top bottom`
> - 如果只设置一个方向的值 另外一值默认 `center`

```less
div {
  background-position: 100px 200px;
}
```

#### `CSS Sprite` 精灵图 和 `background-position`

> 使用精灵图的好处：减少请求数量，加快网页响应速度,减小服务器压力

#### `cursor` 指针样式

> 设置光标位于元素上的样式
>
> - `auto` 浏览器根据上下文决定样式
> - `defalut` 默认 由系统决定
> - `pointer` 小手
> - `text` 一条竖线
> - `none` 没有指针

#### `position` 定位

> - `static` 静态定位 就是标准流中
>   **在静态定位时设置`top right left bottom` 没有效果**

> - `relative` 相对定位 相对于元素本身在常规流中的位置
>   **可以通过`top right left bottom`定位，定位之后依然占据标准流中的空间，原来占据的位置不会有任何改变，也不会影响别的元素的布局，这是`margin padding`所做不到的。**

```less
div {
  position: fixed;
  // top left百分比相对于父元素计算
  top: 50%;
  left: 50%;
  // transform百分比相对于元素本身计算
  transform: translate(-50%, -50%);
}
```

#### 绝对定位技巧及公式

> - 对于绝对定位元素(`absolute fixed`)的元素
> - 定位参照对象的宽度 = `left + right + margin-left + margin-right + 绝对定位元素的实际占用宽度`。
>   - `margin-left` 默认为 `0`
>   - `margin-right` 默认为 `0`
>   - `right` 默认为 `auto`
>   - `left` 默认为 `auto`

```less
// 就是说 outer 宽度等于inner的 left + right + margin-left + margin-right + inner实际宽度。

.outer {
  position: relative;
  .inner {
    position: absolute|fixed;
  }
}
```

- 定位参照对象的高度 = `top + bottom + margin-top + margin-bottom + 绝对定位元素的实际占用高度`。
  - `margin-top` 默认为 `0`
  - `margin-bottom` 默认为 `0`
  - `top` 默认为 `auto`
  - `bottom` 默认为 `auto`
- 公式应用

```less
// 应用一  设置定位元素的宽和高
.outer {
  position: relative;
  width: 500px;
  height: 500px;
  .inner {
    position: absolute; // fixed
    // 当设置以下四项的时候就会通过套用公式 0+0+0+0+绝对应为元素的宽/高 = 参照元素的宽/高
    // 得出当前绝对定位元素的宽和高就会等于当前参照物的高度！！
    // 当position设置为fixed就会充满整个视口！！！(前提是当前元素未设置margin或者margin为0)
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

//应用二 设置定位元素的居中效果
.outer {
  position: relative;
  width: 500px;
  height: 500px;
  .inner {
    position: absolute; // fixed
    // 当设置以下三项的时候就会通过套用公式 ，假设未设置left right的时候 默认是auto，而margin-right和margin-left 也要通过设置auto来居中，浏览器计算margin值时候无法确定如何分配剩余空间的。因为不确定需要均分多少空间。当设置了left：0 right：0 的时候， 根据公式及可以计算出当前剩余可以分配的空间，所以能够均分，最终达到居中的效果。
    // 垂直方向同理。
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
```

> 对于非绝对定位的块级非替换元素宽度的计算公式
>
> - `父级元素的宽度（包含块） = 非替换块级子元素的content + margin + padding + border`
> - 通过上述公式，如果`margin`为负值时，父元素宽度一定且子元素的`border`和`padding`为 0，子元素的宽度会变大。
>   应用：消除边缘元素的个`margin`占据的空间,例子如下。

公式应用：假设现有父元素`.outer`宽`490px`,10 个子级`.inner`宽`90px`浮动到左侧，需要设置之间的间距`10px`达到美观。

- 方案 1：需要设置`margin-right:10px`,使用伪类选中第 5n 个元素设置`margin-right:0`，但是伪类并不支持 IE8，兼容性较差。
- 方案 2：`margin`负值应用 1：解决最左/右一列或者最上/下一行外边距溢出父元素宽度问题.设置一层中间层`.middle`,`margin-right`为`-10px`。这样做就相当于`.middle`的宽度 = `.outer`的宽度 - (-10px) = `490px + 10px` = `500px` = (`.inner`的宽度+`.inner`的`margin`) \* 5 . 兼容性很好，利用公式来实现特殊处理右侧边缘的`.inner`。

```less
.outer {
  width: 490px;
  height: 500px;
  background-color: #ff0;
  .middle {
    // 设置负值之后相当于wrapper宽度= 490 + 10  此时刚好能够放下.inner及其margin 这样也不会影响.outer和.inner 就达到了效果
    margin-right: -10px;
    [class^="inner"] {
      float: left;

      width: 90px;
      height: 50px;
      margin-right: 10px;
      background-color: #00f;
    }
  }
}
```

> -`margin`负值的应用 2 : 解决边框合并

```less
.outer {
  width: 500px;
  height: 500px;
  background-color: #ff0;
  .wrapper {
    [class^="inner"] {
      box-sizing: border-box;
      border: 1px red solid;
      float: left;
      width: 100px;
      height: 50px;
      margin-left: -1px;
      margin-top: -1px;
      background-color: #00f;
    }
  }
}
```

> 3. `position` 绝对定位 首先检测父级元素 如果父级元素不是非`static`元素，就相对于父级元素左上角定位，如果父元素是`static`会继续向向上寻找，直至找到非`static`元素，再相对它定位，如果找到最终没有找到`static`元素，会根据视口定位
>
> - **可以通过`top right left bottom`定位，元素会脱离标准流。**
> - 绝对定位参照对象是最邻近的定位元素（非`static`）
> - 开发时经常会用到 **_子绝父相_**，来达到相对于直接父元素进行定位。也就是子元素绝对定位，父元素相对定位。
> - `子绝父相`的情况下，想让子元素居中需要设置`left:0; right:0; margin: 0 auto;`， 或者同时给`left right`一个相同长度，非 0 也是可以达到居中的效果。

> 4. `fixed` 固定定位 相对于视口定位
>    **可以通过`top right left bottom`定位，元素会脱离标准流。**

#### 脱离标准流元素的特点

> - 可以设置高度和宽度 即使是行内非替换元素
> - 宽高默认由内容决定
> - 不再受标准流的约束
> - 不在影响父元素的宽高（父元素的不会再考虑脱标元素）

#### **`float display position`之间的关系：**

> - `display:none` 此时，`float 和 position`失效
> - `position:absolute|fixed` ，或者`float:right|left`，只要是设置浮动或者定位的元素都默认会将其`display`属性改变，具体规则如下表：

| 被影响的初值         | 影响后的值                           |
| -------------------- | ------------------------------------ |
| `inline-table`       | `table`                              |
| `inline`             | `block`                              |
| `inline-block`       | `block`                              |
| `table-row`          | `block`                              |
| `table-row-group`    | `block`                              |
| `tabel-cell`         | `block`                              |
| `table-column`       | `block`                              |
| `table-column-group` | `block`                              |
| `table-caption`      | `block`                              |
| `tabel-header-group` | `block`                              |
| `table-footer-group` | `block`                              |
| `flex`               | `flex` 浮动对弹性布局元素不起作用    |
| `inline-flex`        | `inline-flex` 浮动对弹性布局不起作用 |
| other                | 不会改变                             |

#### `left top right bottom` 配合实现定位元素

> - `left` 距离参照元素的左侧距离
> - `right` 距离参照元素的右侧距离
> - `bottom` 距离参照元素的底部距离
> - `top` 距离参照元素的顶部距离

#### `normal flow` (标准流，普通流，常规流，文档流)

> - 默认情况下，元素都是按照标准流排布的
> - 默认情况下，兄弟元素互相不层叠
> - 在标准流中可以通过`margin padding`来对元素进行定位 `margin`还可以设置负值
> - 注意：**`padding margin`通常会影响到其他元素的定位效果。**

#### `z-index` 层叠等级

> - 仅仅对定位元素有效
> - 父子关系 子覆盖父
> - 非父子关系且为兄弟元素
>   - 同样是定位元素 后覆盖前
>   - 一方是定位元素 定位元素覆盖非定位元素
>   - 定位元素通过`z-index`设置层叠关系，`z-index`越大,离用户越近（越在上层）
> - 非父子关系且不为兄弟元素
>   - 找到相邻定位的祖先元素（当不是定位祖先元素，说明相邻祖先就在标准流中，此时比较元素是绝对不会重叠的）按照上述兄弟比较法去比较。层叠等级也是自包含的。

#### `float` 浮动

> 在 css 中有三种常用法对元素进行定位和布局
>
> - `absolute position` 绝对定位
> - `float` 浮动
> - `normal flow` 标准流
> - **注意：浮动和绝对定位都会脱离文档流**

> `float:left|right|none` 浮动的规则
>
> 1. 一旦浮动之后就会脱离标准流（不反馈给父元素高度，父元素高度坍塌）且只在当前行浮动，可以通过`overflow:hidden`等任意创建 bfc 的方式来使父元素强行获取浮动元素的高度（根据 bfc 的自包含属性）。或者通过添加`::after`伪元素来进行清除浮动并通知父元素获得高度。
> 2. 朝左或者向右方向移动，直到紧贴父元素边缘或者其他浮动元素边缘，兄弟元素都浮动情况下，在 html 中的元素顺序，先浮动的元素贴近父元素边缘，剩下的依次排列。
> 3. 定位元素会层叠在浮动元素上边，浮动元素在标准流元素上边
> 4. 浮动元素不能与行内级元素重叠，虽然脱离了标准流，但是没有发生层叠，其他行内元素会被挤出去（被挤出的元素，比如：`inline-block,<a>,<strong>,文字内容`等等，这么做的初始目的就是了做图文环绕）
> 5. 浮动会触发 bfc，不遵循当前行的`baseline`对齐规则，行内元素、`inline-block`元素浮动后，其顶部与所在行顶部对齐。浮动元素的顶端不能超过包含块的顶端，同时也不能超过上一个兄弟浮动元素。
> 6. 块级元素与浮动元素的是可以发生层叠的，不会挤出去，（第四条相对）。当被层叠的块级元素中包含行内元素，这些行内元素会被挤出浮动区域。
> 7. 浮动元素之间不能层叠（因为各自包含 bfc）,如果一个元素浮动，另一个浮动元素已经在计算的位置了，后浮动的元素会紧贴着前一个浮动元素。左浮找左浮，右浮找右浮。如果当前行空间不足已放下当前浮动元素，就向下换行，直到空间足以显示当浮动元素。
> 8. 浮动元素如果是非替换元素，其宽度未设置的情况下也就是`auto`，会默认根据内容取宽度,官方说法`shink-ot-fit`，尽管他是`block`也是如此。解释：`shrink-to-fit width is: min(max(preferred minimum width, available width), preferred width).`也就是首选最小宽度。
> 9. 浮动元素会改变其本来的`display`的值,如表
> 10. 为什么使用浮动而不使用`inline-block`，因为`vertical-align`会影响行内块的布局，行内元素之间也会有空隙（因为回车）。

| 被影响的初值         | 影响后的值                           |
| -------------------- | ------------------------------------ |
| `inline-table`       | `table`                              |
| `inline`             | `block`                              |
| `inline-block`       | `block`                              |
| `table-row`          | `block`                              |
| `table-row-group`    | `block`                              |
| `tabel-cell`         | `block`                              |
| `table-column`       | `block`                              |
| `table-column-group` | `block`                              |
| `table-caption`      | `block`                              |
| `tabel-header-group` | `block`                              |
| `table-footer-group` | `block`                              |
| `flex`               | `flex` 浮动对弹性布局元素不起作用    |
| `inline-flex`        | `inline-flex` 浮动对弹性布局不起作用 |
| other                | 不会改变                             |

#### `clear` 清除浮动 配合伪元素使用

> - `left`要求元素的顶部低于之前生成的左右左浮动元素的底部。也就是说添加`clear`的元素是跳过浮动区域，重新按照标准流排布剩余的元素。相当于将浮动和标准流进行隔断。
> - `right` 同上。
> - `both` 两者相合。

```less
 .clear-fix() {
    &::after {
        content: "";
        clear: both;
        display: block;

        height：0;
        visibility:hidden;
    }
}

.outer {
    background-color: #ff0;
    .clear-fix();
    .wrapper {
        [class^='inner'] {
            box-sizing: border-box;
            border: 1px red solid;
            float: left;
            width: 100px;
            height: 50px;
            margin-left: 10px;
            margin-top: 10px;
            background-color: #00f;
        }
    }
}
```

#### `transform` 转换 对`inline`元素无效

> - `translate(x,y)`平移 百分比参照物的是元素本身`bounding-box`
> - `skew(x,y)` 扭曲 扭曲原点受 `transform-origin`影响。
> - `scale(x,y)` 缩放，当只写一个值代表`x轴y轴`同时缩放相同大小，不支持百分比 缩放原点受 `transform-origin`影响。
> - `rotate(deg)` 旋转原点受 `transform-origin`影响。

#### `transform-origin` 转换的原点

> - 默认位置是当前图形的中心点
> - 可以设置 x 轴和 y 轴的原点 `<length> <percentage> key`
>   关键字：`key => center right bottom top left`

#### `transition` 动画过渡

> - `transition-property` 需要动画的属性
> - `transition-duration` 动画时长
> - `transition-timing-function` 运动的贝塞尔时间曲线
> - `transition-delay` 延迟时间

#### `vertical-align` 以及行盒模型的理解

> - 行盒的高度是由内容的高度决定的，行盒会包裹所有内容，而行盒中的内容是由内容的`line-height`行高决定，默认一个行盒中的所有行内级元素默认是`baseline`对齐的。
> - `vertical-align`影响行内级元素在一个**_行盒_**垂直方向的位置。`vertical-align`代表的是当前行的对齐方式，他的默认值就是`baseline`,更多取值`top middle bottom sub sup`
> - 各种情况下的`baseline`如下：
>   - 文本默认的`baseline`位于字母`x`下方
>   - `display:inline-block`的默认基线位置位于其`margin-bottom`的底部，如果没设置就默认盒子底部。
>   - `inline-block`有文本的时候，按照最后一行文本基线计算
> - 详解`middle`
>   - 字母`x`的特殊性：当设置元素对齐方式为`middle`，实际上是元素所在行盒中心点与父盒基线加上`x-height`一半的线对齐，实际上元素是没有居中的,为了消除文字的影响，需要在父盒上设置`font-size:0`才会真正的居中。

```less
div {
  line-height: 100px;
  height: 100px;
  // 设置文字大小0 消除x-height影响 从而真正的居中
  font-size: 0;
}
```

> - 父盒基线指的是父盒中的文字的基线。父盒中的文字始终平分`line-height`。

- 通过设置图片或者`inline-block`元素的对其方式`middle` 去除元素底部因为基线对齐而产生的多余像素。

```less
img {
  vertical-align: middle;
}
```

#### 语义化元素

> `<header> <nav> <main> <footer> <section> <artical> <aside>`等等，这些不是特殊元素 只是个块级元素，只是增加了语义化。

#### `<video>` 和 `<audio>`

> `<video>`属性
>
> - `src` 源
> - `controls` 增加控制工具栏
> - `autoplay` 自动播放，但是存在兼容性问题
> - `muted` 静音，增加后不静音并且自动播放会生效
> - `loop` 循环播放

```html
<video src="" autoplay controls muted loop></video>
<!-- 可以通过写入多个source来解决格式不支持的问题 -->
<video src="">
  <source src="" />
  <source src="" />
  <source src="" />
</video>

<audio src="" autoplay controls muted loop></audio>
<audio src="">
  <source src="" />
  <source src="" />
  <source src="" />
</audio>
```

#### H5 对`<input>`的拓展

> - `<input placeholder="" multiple autofocus >`

#### `flex`布局 **_超级重要_**

> - `inline-flex` 使用后变成行内的弹性盒子
> - `flex` 使用后弹性盒子是块级的弹性盒子

- 模型中的各种概念

  > - 主轴 `main axis` 默认从左至右
  > - 交叉轴 `cross axis` 默认从上到下
  > - 主轴开始位置 `main start`
  > - 主轴结束位置 `main end`
  > - 交叉轴开始位置 `cross start`
  > - 交叉轴结束位置 `cross end`
  > - 主轴大小 `main size`
  > - 交叉轴大小 `cross size`
  > - 开启了弹性布局的元素是一个弹性盒子 `flex container`（也就是父元素）
  > - 弹性盒子的直接子元素都是`flex items`

- 应用到父级弹性盒子`flex container`的属性

> - `flex-flow` 是 `flex-direction` 和 `flex-wrap`的缩写属性

> - `flex-dircetion` 决定主轴方向
>   - 默认值`row`,代表`flex-items`都是沿着主轴从主轴开始位置到主轴结束位置
>   - `row-reverse` 反向主轴，就是从右至左，但还是从主轴开始位置到主轴结束位置。
>   - `column` ，主轴从上至下，但还是从主轴开始位置到主轴结束位置。。
>   - `column-reverse` ， 主轴从下至上，但还是从主轴开始位置到主轴结束位置。。
> - `flex-wrap` 是否换行
>   - 默认`nowrap`不换行无论多少元素都挤压到一行内
>   - `wrap`超过父元素的 100%就换行，换行后会将交叉轴的空余空间进行平分。
>   - `wrap-reverse`在交叉轴上反转(第一行和第二行反转)。

> - `justify-content` 决定了`flex items`在主轴上的对齐方式
>   - 默认值 `flex-start` 主轴开始位置对齐
>   - `flex-end` 主轴结束位置对齐
>   - `center` 居中对齐
>   - `space-between` 平分空余空间 左右不留白
>   - `space-evenly` 平分剩余空间 左右留白
>   - `space-around`元素间距相同，左右留白较小，且一个留白空间为元素间距的一半。

> - `align-items` 决定了`flex items`在交叉轴上的对齐方式
>   - 默认值`normal` 等同 `strech`
>   - `strech` 高度默认撑满弹性盒子
>   - `flex-start` 与交叉轴开始位置对齐
>   - `flex-end` 与交叉轴结束位置对齐
>   - `center`居中对齐
>   - `baseline` 基线对齐

> - `align-content`决定了多行`flex-items`在交叉轴上的对齐方式，（多行就代表`flex-wrap:wrap|wrap-reverse`）
>   - 默认值`stretch`通过拉伸占据整个弹性盒子。
>   - `flex-start` 位于交叉轴开始位置
>   - `flex-end` 位于交叉轴结束位置
>   - `center` 居中
>   - `space-between` 平分空余空间 不留白
>   - `space-evenly` 平分剩余空间 留白
>   - `space-around`元素间距相同，留白较小，且一个留白空间为元素间距的一半。

- 应用到`flex items`上的属性

> - `flex` `flex-grow、flex-shrink、flex-basis`的缩写属性，可以指定一个值两个值或者三个值
>   - 一个无单位值 等于设置 `flex-grow`
>   - 一个有效宽度值 等于设置 `flex-basis`
>   - 两个值,第一个值必须是无单位,代表`flex-grow`,第二个值有单位代表`flex-basis`
>   - 两个值，第一个值必须是无单位，同上，第二个值无单位会被做为`flex-shrink`
>   - 三个值 第一个无单位`flex-grow`,第二个无单位`flex-shrink`,第三个有单位`flex-basis`

> - `flex-grow`设置剩余留白如何分配到`flex-items`上
>   - `<number>` 正整数 小数 默认`0`
>   - 整数且各`flex-grow`和大于 1 会根据整数的大小按比例分配
>   - 小数且之和小于 1,扩大的内容为剩余留白乘上当前小数
>   - `flex-grow`扩展后的最终`size`不能超过`max-width|max-height`

> - `flex-basis` 决定主轴上`flex-items`的大小
>   - `<length>`默认`auto`,如果设置值会覆盖`width`
>   - 优先级顺序,`max/min-height/width> flex > width\height > 内容本身size`

> - `flex-shrink`内容超过父盒收缩的规则,和`flex-grow`相对。（当前父级弹性盒子`flex-wrap:wrap`）
>   - `<number>`,正整数,小数,默认`1`收缩比例相同
>   - 整数且各`flex-shrink`和大于 1 会根据整数的大小按比例收缩 数字越大缩的越多
>   - 小数且之和小于 1,缩小内容为超出内容的大小乘上当前小数
>   - `flex-shrink`收缩后的最终`size`不能超过`min-width|min-height`

> - `order` 决定`flex-items`的排布顺序，值越小越在前边
>   - `<number>` 任意整数 默认 `0`

> - `align-self`,`flex-items`可以通过设置此属性覆盖在弹性盒子中设置的`align-items`
> - 默认和父级弹性盒子中`align-items`设置值一致。

#### 网络字体

> - 常见字体类型 `.ttf .otf .eot .svg .svgz .woff` 设置多种字体来进行兼容性。

```less
@font-face {
  // 定义特殊字体
  font-family: "somefont";
  //标识当前文字资源去加载网络字体 一般是部署本地字体资源
  src: url(./somefont.ttf);
}
// 特定元素使用当前自定义字体
div {
  font-size: "somefont";
}
```

#### 字体图标原理,本质是也是字体，受`font-size`影响,不会失真。

> - 就是将字体变成图标的样子。首先下载各种格式的文字字体下载到本地，通过使用图标对应的编码进行应用。

- 图标使用方法 1

```less
@font-face {
  //定义图标
  font-family: "icon";
  src: url(./a.svg), url(./a.ttf);
}
//使用字体图标
div {
  font-size: "icon";
  //可以设置图标大小和颜色
  color: red;
  font-size: 100px;
}
```

- 图标使用方法 2

```html
<!-- 引入css 然后使用类 -->
<link rel="stylesheet" href="./font.css" />

<div class="font"></div>
```

```css
/*font.css*/
@font-face {
  font-family: "icon";
  src: url(./a.svg), url(./a.ttf);
}
.icon {
  font-family: "icon" !important;
  font-size: 16px;
  font-style: normal;
}

/* 在伪元素中使用字体前边是反斜线"\" */
/* 如果在html直接使用需要使用 "&#xe636;" */
.font::before {
  content: "\e636";
}
```

#### 关键帧动画 `animation && keyframe`

> - `transtion`过渡实际上是两帧
> - `from - 0% to - 100%`

```less
.animation {
  width: 100px;
  height: 100px;
  background-color: red;
  &:hover {
    animation: test 1s linear alternate;
  }
}

@keyframes test {
  0% {
    //transfrom可以写多个值 以空格分隔
    transform: translate(0, 0) rotate(45deg);
  }

  25% {
    transform: translate(0, 200px);
  }

  50% {
    transform: translate(200px, 200px);
  }

  75% {
    transform: translate(200px, 0);
  }

  100% {
    transform: translate(0, 0);
  }
}
```

#### 3D 动画

```less
body {
  // 父级元素开启视距
  perspective: 1000px;

  .box {
    margin: 0 auto;

    width: 100px;
    height: 100px;
    background-color: red;

    &:hover {
      // transform 开启3d
      transform-style: preserve-3d;
      // Z轴上移动 会放大元素
      transform: translateZ(100px);
    }
  }
}
```

#### 文字换行处理

> - `white-space`用于设置空白处理和换行规则
>   - `normal`，合并所有连续空白，允许单词超长自动换行
>   - `nowrap` 超出换行
> - `text-overflow` 设置文字溢出是的处理
>   - `clip`溢出的内容直接减掉，字符展示可能不完整
>   - `ellipsis` 溢出省略号展示
>   - `text-overflow`生效的前提是`overflow`不为`visible`

```less
.box {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
```

> - 设置多行省略号方案 以下属性缺一不可

```less
.box {
  width: 100px;
  height: 100px;
  // 设置行高刚好高度的一半 这样就能放下两行文字
  line-height: 50px;
  background-color: red;
  overflow: hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
```

#### `rem`的移动端适配

- 方案一 使用媒体查询

```less
@media screen and (min-width: 320px) {
  html {
    font-size: 9px;
  }
}
@media screen and (min-width: 375px) {
  html {
    font-size: 10px;
  }
}
@media screen and (min-width: 414px) {
  html {
    font-size: 11px;
  }
}
```

- 方案二 `webpack`打包插件
