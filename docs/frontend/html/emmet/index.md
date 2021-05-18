[toc]

## Emmet 语法

##### HTML

###### `!` 感叹号生成 html5 代码

###### `>` 生成子代元素

```emmet
div>p
```

###### `+` 生成兄弟元素

```emmet
div+p
```

###### `*` 生成多个元素

```emmet
div*3+p*2
div>p*3
```

###### `^` 回到上一层

```emmet
div>p>span+h2^input*2 // input和p在div下   h2和span在p下
```

###### `()`分组

```emmet
div>(p>span)+h2+a // 小括号括起来之后  p和h2和a是兄弟
```

###### `#` id 属性

```emmet
div#header
```

###### `.`class 属性

```emmet
div.header
```

###### `[key="value"]` 普通属性

```emmet
div[title="some"]
div[title=some] // 双引号可以省略
```

###### `{}` 内容

```emmet
div{ok}
```

###### `$` 自增符号

```emmet
div.class${ok$}*3
```

###### ``隐式标签

```emmet
.class => 就等于 div.class
#id => 就等于 div#id

ul>.class => 就等于 ul>li.class 因为ul中只放li 故可以省略
ol>.class => 就等于 ol>li.class 同上

table>#row>.item => 就等于 table>tr#row>td.item
```

##### CSS

```emmet
w10 => width: 10px;
h10 => height: 10px;
m10 => margin:10px;
p10 => padding:10px;
fz20 => font-size:20px;
fw700 => font-weight: 700;
t0+b0+r0+l0 => top: 0;bottom: 0;right: 0;left: 0;
lh50px => line-height: 50px;
bgc => background-color
df => display:flex;
dib => display:inline-block;
db => display:block;
```
