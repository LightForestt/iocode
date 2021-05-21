## `stylus`  - 用最接近js的方式去书写css

### 注释

- 单行注释
 ```stylus
 // I'm a comment!
 ```
- 多行注释 多行注释看起来有点像 CSS 的常规注释。只有在 compress 选项未启用的时候才会被输出。
```stylus
/*
 *  i am a comment
 */
```
- 可输出注释 上述两种在生产环境下都不会编译到css文件中去，可输出注释都会编译到css中去
```stylus
/*!
*  i am a comment
*/
```

###   变量 用等号连接变量名和值 更贴近JavaScript
- 一般变量
```stylus
 w = 20px
 h = 20px
 c = red
 list = red , blue , yellow
 $name = width
 
 // 使用变量
div
  {$name} w
  height h
  background c
```
- 变量内联赋值和内部查找,在语句内部直接定义变量并直接赋值给后续属性
``` stylus
div
  width w = 150px
  height h = 80px
  margin-left -(w / 2)
  margin-top -(h / 2)
  
// 在未定义的情况下使用变量
div
  width 150px
  height 80px
  margin-left -(@width / 2)
  margin-top -(@height / 2)
  
// 上述两种写法编译结果
// css
div {
  width: 150px;
  height: 80px;
  margin-left: -75px;
  margin-top: -40px;
}
```

- 变量冒泡查找
```stylus
body
  color: red
  ul
    li
      color: blue
      a
        background-color: @color

// 最终将会渲染成蓝色 如果为定义蓝色 会继续冒泡查找成红色

// css

#logo2 body {
  color: #f00;
}
#logo2 body ul li {
  color: #00f;
}
#logo2 body ul li a {
  background-color: #00f;
}
```

###   选择器 极为灵活的选择器 完全可以应付所有复杂场景

```stylus 
//并集选择器
div
p
  color c

//--------------------------------

//代表父级
textarea
input
  color #A7A7A7
  &:hover
    color #000

//如果需要在选择器中单纯地使用&符，通过转义符\来转义：
.bar[name*='\&'] // => .bar[name*='&']

//--------------------------------
//级别选择器 将这个深度的选择器用栈的形式来模拟 [body,div,p] => ^[0]即body
body
  div
    p
      ^[0]  // 代表第一级别选择器 
        color c

// css
body {
  color: #f00;
}

//--------------------------------

body
  div
    p
      ^[-1] // 也可以为负数 即在父级的基础上反向向上查找一级 为div
        color c

//css
body div{
  color: #f00;
}

//--------------------------------
// 范围选择器 实际上就是按照层级吧选择器截取出来  ^[ .-2] 为div p 从第二个到倒数第二个

body
  div
    p
      input
        ^[ .-2] 
          color c
//css
div p {
  color: #f00;
}

// 根选择器

body
  div
    p
      /.foo 
        color c
//css
.foo {
  color:#f00;
}

//获取当前的选择器名称 调试可用
body
  div
    p
      input
        ^[ .-1]::after 
          content: selector()
          
//css
div p input::after {
  content: 'div p input::after';
}
```

###   运算符，很接近JavaScript  但也引入了部分python风格的运算符

```stylus 
// ---------------------------------true flase 判断
!0
// => true

!!0
// => false

!1
// => false

!!5px
// => true

-5px
// => -5px

--5px
// => 5px

not true
// => false

not not true
// => true
// -----------------------------数组操作
list = 1 2 3
list[0]
// => 1

list[-1]
// => 3
// -------------------------------范围
 .5
// => 1 2 3 4 5

 ..5
// => 1 2 3 4

 .1
// => 5 4 3 2 1
// ----------------------------------数学计算
15px - 5px
// => 10px

5 - 2
// => 3

5in - 50mm
// =>  031in

5s - 1000ms
// => 4s

20mm + 4in
// => 12 6mm

"foo " + "bar"
// => "foo bar"

"num " + 15
// => "num 15"

2000ms + (1s * 2)
// => 4000ms

5s / 2
// =>  5s

4 % 2
// => 0

2 ** 8
// => 256

font (14px/ 5)
// => font:  333333333333334px;

font 14px/ 5
// => font : 14px/ 5;

// -----------------------------真值
0% 
0px
1px 
-1
-1px
hey
'hey'
(0 0 0)
('' '')
// ---------------------------- 假值
0 
null
false
''

// 守护符和短路符的应用
5 && 3
// => 3

0 || 5
// => 5

0 && 5
// => 0

//------------------------------in
nums = 1 2 3
1 in nums
// => true

5 in nums
// => false

words = foo bar baz
bar in words
// => true

HEY in words
// => false

// ----------------------------三元表达式及其简写
color := white
color ?= white
color = color is defined ? color : white

// -----------------------------color操作
#888 + 50%
// => #c3c3c3

#888 - 50%
// => #444

#f00 + 50deg
// => #ffd500

#f00 - rgba(100,0,0,0.5)
// => rgba(155,0,0,0.5)
```

###  真正的自定义函数 有返回值 书写形式和混入一致

```stylus
// --------------------------简单函数
add(a, b = a) // 可以通过等号来设置默认值 两值相加
   a + b

div 
  height add(10, 5px)
  // => 15
  width add(10px)
  // => 20
  
//css
div {
  height: 15px;
  width: 20px;
}


compare(a, b) // 比较ab 返回字符串
  if a > b
    'higher'
  else if a < b
    'lower'
  else
    'equal'

div
  &::after
    content compare(10, 1)
  &::before
    content compare(1,2)
    
//css
div::after {
  content: 'higher';
}
div::before {
  content: 'lower';
}


//---------------------------匿名函数@(){}

sort(list, fn = null) // 定义一个排序方法 
  // default sort function
  if !fn
    fn = @(a, b) { // 如果当前方法未传入 就默认一个匿名函数
      a > b
    }

  // 冒泡排序
  for i in  ..length(list) // 数组长度 左闭右开
    for j in 0...i // 内循环
      if fn(list[j], list[i]) // 根据传入的匿名函数或者默认函数进行比对
        temp = list[i]
        list[i] = list[j]
        list[j] = temp
  return list // 最终返回排序结果

div::after
  content sort('e' 'c' 'f' 'a' 'b' 'd')

div::before
  content sort(5 3 6 1 2 4, @(a, b){a < b})
//css
div::after {
  content: 'a' 'b' 'c' 'd' 'e' 'f' 's';
}
div::before {
  content: 99 6 5 4 3 2 1;
}

// --------------------用方法去操作哈希实例
hash = (1 'one')(2 'two')(13'three')

some(hash, key)
  return item[1] if item[0] == key for item in hash

div::before
  content some(hash,1)
  
//css
div::before {
  content: 'one';
}
```

###  内置函数 build-in-functions

```stylus
// ----------------------------路径常用函数
basename('images/foo.png') // 获取资源名
// => "foo.png"

basename('images/foo.png', '.png') // 第二个参数传入则去除后缀名
// => "foo"

dirname('images/foo.png') // 返回目录名
// => "images"

extname('images/foo.png') // 后缀名
// => ".png"

pathjoin('images', 'foo.png') // 合并路径并添加 / 
// => "images/foo.png"

// -------------------------------数组和hash表常用方法
nums = 1 2
push(nums, 3, 4, 5) // js:nums.push(3,4,5)
pop(nums) // js:pop
shift(nums)//js:shift
unshift(nums)//js:unshift
index(list, 5) // 获取对应元素的index值 js:indexOf
last(nums)//获取末尾值

obj = {
  name:'zahngsan',
  age:'12',
  job:'alg'
}
keys(obj) // js:Object.keys | Reflect.ownKeys
values(obj) // 遍历obj得到值的数组

list = a, b, c
list-separator(list) // 获取分隔符 => ','
length(list) // 获取长度

// ---------------------------------单位相关方法
type(12) // 判断类型
// => 'unit'

typeof(12)
// => 'unit'

typeof(#fff)
// => 'rgba'

type-of(#fff)
// => 'rgba'

unit(10) //获取单位
// => ''

unit(15in)
// => 'in'

unit(15%, 'px')
// => 15px

unit(15%, px)
// => 15px

//----------------------------------字符串方法
replace(i, e, 'griin') // 替换 i=>e
join(',',1 2 3) //用分隔符链接list
split(',',123) // 用分隔符分割str
substr('string', 1, 2) // 取子串

//----------------------------------其他方法
lookup('font-size-' + i) // 通过字符串查找变量值
p('test') // 打印
use("plugins/add.js") // 安装js插件用作拓展方法
```

###  条件判断表达式

```stylus
// if else 语句
box(x, y, margin-only = false)
  if margin-only // 如果没传或者传入false
    margin y x
  else
    padding y x
    
// unless 实际上为if语句的语法糖 
// unless exp 等同于 if(!exp)
unless false
     margin y x
```

###  迭代器

```stylus
foo = color width style

body
  for val,index in foo // 遍历一个数组
    border-{val}  index
    
//css
body {
  border-color: 0;
  border-width: 1;
  border-style: 2;
}
    
    
bar = {
  color:red,
  style:solid,
  width:10px
}

body
  for idx,val in bar // 遍历一个哈希表
    border-{idx} val
    
// css
body {
  border-color: #f00;
  border-style: solid;
  border-width: 10px;
}
```


###   css字面量

```stylus
@css {
    .ie-opacity {
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=25);
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=25)";
    }
}

//css

.ie-opacity {        
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=25);
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=25)";
}
```