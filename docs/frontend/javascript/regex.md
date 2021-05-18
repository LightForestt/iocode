#### 匹配模式

- g 全局匹配
- i 忽略大小写
- m 每一行都单独处理，将开始(^)和结束(\$)字符视为在多行上工作

```js
let str = `
    1 xcf
    2 xcf
    3 xcf text
    4 xcf
`;
let res = str.match(/^\s*\d+\s+xcf$/gm);
console.log(res);
```

- s 匹配任何字符 把所有行都视为同一行
- 多个匹配模式可以混合使用，顺序无所谓 `/gi`
- u 将模式视为 unicode 序列点的序列
  - 用来匹配宽字符
  - 结合`\p{L}`字母
  - 结合`\p{P}` 符号
  - 结合`\p{sc=Han}`匹配汉字

```js
let str = `xcf.,=徐长帆`;
console.log(str.match(/\p{sc=Han}+/gu));
```

- y 连续匹配，如果在匹配时候遇到不符合条件的字符，立即停止匹配。使用 y 模式后如果从 lastIndex 开始匹配不成功就不继续匹配了，不会忽略不满足条件的字符。

```js
let str = "xuxchangfan";
let reg = /x/y;
console.log(reg.exec(str)); // x
console.log(reg.lastIndex); // 1
console.log(reg.exec(str)); // null
console.log(reg.lastIndex); // 0
```

#### 创建正则对象

```js
// 字面量
let r1 = /u/g;
// new 对象        字符  匹配模式
let r2 = new RegExp("u", "g");
```

#### 或 |

- 左右两边任意满足一个条件

```js
let str = "xx@163.com";
// 或 | 左右两边任意满足一个条件
let r3 = /xcf|.cm/;
console.log(r3.test(str)); // false
```

#### 原子表 []

- 匹配数组中的任意一个字符,就相当于把当前数组中的串拆成一个个单独的字符，每个字符之间是或的关系，使用 match 方法的时候，会匹配字符串中所有符合原子表中的每一项(全局匹配的情况下)。
- `/[a-z]/` 区间匹配，匹配 a-z 的字母
- `/[0-9]/` 匹配 0-9,区间匹配的时候只能升序不能降序
- `/[^xu]/`排除匹配
- `/[().+]/`在原子表中的括号就代表括号本身。不代表原子组，原子表中的字符`().+`是字符本意。
- 匹配所有字符 `/[\s\S]/` `[\d\D]`

```js
let str = 'xuxuxchangfan'
let r4 = /[xu]/g  代表取出所有的xu

let r5 = /[^xu]/g 代表取出除了xu所有的
str.match(r4) //["x", "u", "x", "u", "x"]
str.match(r2) //["c", "h", "a", "n", "g", "f", "a", "n"]

```

#### 原子组 ()

- 使用原子组的方式
  - `\0`就代表整个匹配内容
  - 在正则表达式用通过`\1`来取出第 1 原子组的内容
  - 在`String.prototype.replace`中通过`$1`解析第一个原子组的内容，`$&`代表当前匹配内容，\$\`代表内容前一个字符，`\$'`代表当前匹配内容后一个字符。
  - 为原子组其别名`/(?<name>xu)/`，在使用的时候通过别名使用，`'xu'.replace(reg,'<h1>$<name></h1>')`，别名可以在`exec()`方法返回来的数据中使用（`groups`中的`key`值）。

```js
// 别名
let str = `
    <span id='id1'>lightforestt<span>
    <h1 id='id2'>nice<h1>
    <div id='id3'>cool<div>
`;
let reg = /(?<els><(span|h1|div)[\s\S]*?>)(?<content>[\s\S]*?)<\2>/g;
for (const iterator of str.matchAll(reg)) {
  console.log(iterator);
}
```

- 在`String.prototype.replace`方法中的回调方法，回调方法中会传入参数，通过参数获得原子组中的内容，默认会把所有的原子组按顺序传入回调方法
  - replace 方法回调方法入参详解：

```js
content.innerHTML.replace(
  reg, // 正则表达式
  (
    // 回调方法
    search, //匹配到的字符
    p1, //第一个原子组
    p2, //第二个原子组
    index, //匹配正则的子串索引位置
    source //原字符串
  ) => {
    return `
    <${p1} class="hot">${p2}</${p1}>
    `;
  }
);
```

- 不记录分组，通过`(?:com|org|cn)`忽略当前分组，不会记录到匹配出来的对象中(`match()`),也就无法使用`$1 \1 p1`等获取原子组

```js
let date = `2020-04-06`;
let date_2 = `2020/04/06`;
let date_3 = `2020-04/06`;
// 使用原子表和原子组 \1就代表第一个原子组
let reg = /^\d{4}([/-])\d{2}\1\d{2}$/;
console.log(date.match(reg)); // 2020-04-06
console.log(date_2.match(reg)); // 2020/04/06
console.log(date_3.match(reg)); // null

// $2解析原子组
let els = `
    <div>
        xcf
    </div>
    <h1> nice </h1>
    <h5> cool </h5>
`;
let reg = /^\s*<(h[1-6])>([\s\S]*)<\/\1>\s*$/gm;
let rs = els.replace(reg, `<p>$2</p>`);
console.log(rs);

// 通过方法的默认传参获得原子组
let els = `
    <div>
        xcf
    </div>
    <h1> nice </h1>
    <h5> cool </h5>
`;
let reg = /^\s*<(h[1-6])>([\s\S]*)<\/\1>\s*$/gm;
let rs = els.replace(reg, (p0, p1, p2) => `<p>${p2}</p>`);
console.log(rs);

// 邮箱验证使用原子组
//原子组 验证邮箱
let email = `lightforestt@qq.com`;
let email_2 = `xxx@163.com.cn`;
let email_3 = `xxx@qq.com`;
let reg = /^[\w]+@(\w+\.)+(com|cn|org)$/i;
console.log(
  reg.test(email),
  reg.test(email_2), // true true true
  reg.test(email_3)
);
```

#### 正则中的转义

- `.` 点在正则中代表除了换行外的所有字符
- `\d` 代表数字
- `'\d' '\.'`字符串中的单个反斜是无效的，需要`'\\d' '\\.'`

```js
let price = "10.5";
let r5 = /\.\d+/;
let r5str = "";

r5.test(price); // true
price.match(r5); // .5
```

#### 边界限定

- `^` 限定起始位置
- `$` 限定结束位置

```js
let r6 = /^\d{0,1}\.\d{3,6}$/;
document.querySelector('[name="test"]').addEventListener("keyup", function(e) {
  document.querySelector("span").innerText = this.value.match(r6)
    ? "nice"
    : "填入数字，整数0-1位 小数3-6位";
});
```

#### 元字符 （大小写字母都是相对的 反向的）

- `` 空格也是基本字符 同 abcd 一样
- `\d` 0-9 的数字
- `\D` 除了数字
- `\s` 空格 换行符（\n）
- `\S` 除了 空格 换行符（\n）
- `\w` 字母，数字，下划线 （囊括了`\d`）
- `\W` 除了字母数字和下划线
- '.' 除了换行符的任意字符 囊括了 `\d \w`,也能匹配空格键，但是不能匹配换行键，和`\s`有区别。

#### 汉字与字符属性

- 结合`\p{L}` 表示字母
- 结合`\p{P}` 表示符号
- 结合`\p{sc=Han}` 表示匹配汉字

#### `lastIndex`属性

> 标志当前正则执行匹配(结合`exec()`方法使用)的位置

- 每次 exec 都执行一次正则匹配
- lastindex 记录上次匹配结束的位置，当且仅当匹配模式为全局匹配时生效
- 整个过程类似生成器的 next()方法。这里是每 exec 一次，lastindex 都会向后挪动一位。
- 和 String.prototype.match 方法的区别是，match 会一次性将所有匹配的内容全都返回来，并且没有 index 属性，不方便操作。

```js
let str = "lightforestt";
let reg = /\w/g;
console.log(reg.exec(str)); // x
console.log(reg.lastIndex); // 1
console.log(reg.exec(str)); // u
console.log(reg.lastIndex); // 2
```

#### 重复匹配

- 描述数量，都是贪婪匹配，如果同时满足，会尽可能的多匹配字符，如果跟在原子组后，会影响整个原子组
  - `*` 0-n
  - `+` 1-n
  - `?` 0-1
  - `{1,5}` 1-5
- 禁止贪婪 `/hd*?/`，在设置重复匹配时加上问号会禁止贪婪，尽可能匹配最少的数量

```html
<body>
  <main>
    <span>lightforestt</span>
    <span>nice</span>
    <span>cool</span>
  </main>
  <script>
    let main = document.querySelector("main");
    // 禁止贪婪匹配,可以尽可能匹配少的内容，这样就能匹配<span>xuichanfan</span>,否则将匹配多个<span>
    main.innerHTML = main.innerHTML.replace(
      /<span>([\s\S]+?)<\/span>/gi,
      `<h4 style='color:red;'>$1-test</h4>`
    );
  </script>
</body>
```

#### 多个正则校验一个 str

```js
document.querySelector('[name="test"]').addEventListener("keyup", function(e) {
  let regs = [/^[a-z]{2,5}[0-9]{1,3}/i, /[A-Z]/, /\d/];
  let state = regs.every((value) => value.test(this.value));
  console.log(state);
});
```

#### `matchAll`及其`polyfill`

- `matchAll()`方法可以配合全局匹配模式获得一个当前所有匹配内容的迭代器,这样就可以通过获取每个迭代中的原子组内容，这是`match()`中得不到的，`match()`之中只有当前匹配的串。

```js
let str = `
    <span>lightforestt<span>
    <h1>nice<h1>
    <div>cool<div>
`;
let reg = /(<(?:span|h1|div)>)([\s\S]*?)\1/g;
for (const iterator of str.matchAll(reg)) {
  console.log(iterator[1]);
}
```

- `matchAll-polyfill`

```js
String.prototype.matchAll = function(reg) {
  let rs = [];
  let temp;
  while ((temp = reg.exec(this))) {
    rs.push(temp);
  }
  return rs;
};
```

#### 正则方法

- `RegExp.prototype.test`字符串是否通过正则检测，返回是否通过检测
- `RegExp.prototype.exec`执行一次匹配，返回匹配结果，匹配成功后`lastIndex`+1

#### 字符串方法

- `String.prototype.match`寻找匹配内容，获取匹配内容的每个原子组,当加入全局查找时，就会丢弃原子组的内容，返回每一个匹配的完整的字符串,如果即需要全局查找又需要获取每个院子组就可以通过使用 matchAll 达到目的,使用 exec 操作也是可以达到目的

```javascript
var str = "For more information, see Chapter 3.4.5.1";
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);

console.log(found);

//  [ 'see Chapter 3.4.5.1',
//        'Chapter 3.4.5.1',
//        '.1',
//        index: 22,
//        input: 'For more information, see Chapter 3.4.5.1' ]

// 'see Chapter 3.4.5.1' 是整个匹配。
// 'Chapter 3.4.5.1' 被'(chapter \d+(\.\d)*)'捕获。
// '.1' 是被'(\.\d)'捕获的最后一个值。
// 'index' 属性(22) 是整个匹配从零开始的索引。
// 'input' 属性是被解析的原始字符串。

var str = "For more information, see Chapter 3.4.5.1,see Chapter 3.4.5.2";
var re = /see (chapter \d+(\.\d)*)/gi; // 加入全局查找g
var found = str.match(re);

console.log(found);

//  ["see Chapter 3.4.5.1", "see Chapter 3.4.5.2"] 没有打印出匹配的每个原子组的内容
```

- `String.prototype.matchAll`

```javascript
const regexp = RegExp("foo[a-z]*", "g");
const str = "table football, foosball";
const matches = str.matchAll(regexp);

for (const match of matches) {
  console.log(
    `Found ${match[0]} start=${match.index} end=${match.index +
      match[0].length}.`
  );
}
// 获取每次匹配内容开始位置的索引
// expected output: "Found football start=6 end=14."
// expected output: "Found foosball start=16 end=24."

// 数组from方法会自动调用迭代器去获取每个元素然后形成一个数组  也可以使用...或者for...of去遍历
Array.from(str.matchAll(regexp), (m) => m[0]);
// Array [ "football", "foosball" ]
```

- `String.prototype.search`搜索符合正则的内容，返回内容索引
- `String.prototype.split`拆分字符串
- `String.prototype.replace`替换

#### 断言匹配

- 判断上下文环境的匹配，当字符串本身相同的时候，但是前后字符不同，可以通过断言匹配来检测。
- 注意：断言匹配虽然在括号中，但它不是原子组。
- `(?=)`匹配后侧内容是什么
- `(?<=)`匹配前面内容是什么
- `(?!)`匹配后侧不是该内容的字符串
- `(?<!)`匹配前边不是该内容的字符串

```js
let str = `
    lightforestt
    lightforesttnice
    lightforestt
    lightforesttnice123
`;
// 匹配后边紧跟着nice的字符串 尽管字符串本身相同 相当于判断上下文
let reg = /lightforestt(?=nice)/g;
console.log(reg.exec(str)); // 第二行
console.log(reg.exec(str)); // 第四行
//同时约束前后 仅有第二行满足条件
let reg2 = /(?<=ok)lightforestt(?=nice)/g;
console.log(reg2.exec(str)); // 第二行

// 替换域名
let str = `
    <a href='www.baidu.com'>百度</a>
    <a href='www.sougou.com'>搜狗</a>
`;
let reg = /(?<=href=(['"]))([\s\S]+?)\1/gi;
console.log(str.replace(reg, "nice"));

// 隐藏电话后四位
let users = `
  电话1: 12345678901
  电话2: 98745675603
`;
let reg = /(?<=\d{7})\d+\s*/g;
users = users.replace(reg, (str) => {
  return "*".repeat(4);
});
console.log(users); // 1234567**** 9874567****

let str = `
    lightforestt123
    lightforestt...
    lightforestt
`;
let reg = /[a-z]+(?!\d)/gi;
//贪婪匹配到a停止 因为n是最后一个不是数字的字符
console.log(str.match(reg)); //["xuchangfa", "lightforesttnice", "lightforestt"]

// 过滤违规字符 当输入框中输入的内容中包含任何违规字符 都会匹配失败
// 限定开始位置以后都不准出现违禁字符
let reg = /^(?!.*(fuck|cnm|nmsl).*)[\s\S]*/gi;
// 同理，同样可以设置结束位置前不准出现违禁字符
let reg2 = /[\s\S]*(?<!.*(fuck|cnm|nmsl).*)$/gi;
document.querySelector(".text").addEventListener("keyup", function(e) {
  console.log(this.value.match(reg));
  console.log(this.value.match(reg2));
});
```
