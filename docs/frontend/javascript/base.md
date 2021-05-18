## 在 javascript 中移位运算

- 要求右边的运算数在 0 到 31 位之间,通过舍弃运算数的小数部分或高于 32 位的数位来将运算数限制在 32 位的整数这个范围内

  例如 -1 >>> 0 => 1111 1111 1111 1111 1111 1111 1111 1111 >>> 0

  最终得到移位后数字 0111 1111 1111 1111 1111 1111 1111 1111 即十进制的 4294967295

  负数的无符号右移首先把符号位变为 0

## 数组中的对象替换规则

- 数组和对象中存储的对象被替换。

  ```js
  let obj = {
    name: "FC",
    learn: { one: "vue", twe: "react", three: "angular" },
  };
  let arr = [obj];
  arr[0] = null;
  console.log(obj);
  console.log(arr);
  //obj = null;
  //console.log(arr);
  ```

- 首先描述上述过程：

  1. 首先创建对象 obj

  2. 将 obj 赋值给 arr[0]

  3. 将 arr[0] 置为空

  4. 最后运行结果 ：

     - {name:'FC',learn:{one:'vue',twe:'react',three:'angular'}}

     - [null]

- 结论: 上述代码中，obj 首先赋值给 arr[0]，故 obj 为源，arr 为被赋值对象,得到结论如下：

  1. 内存中的某个对象或值（源）同时被两个地址所引用，当通过某个引用去替换该对象时，不会修改源对象，而是先将**当前源对象拷贝**一份然后交给想要替换的引用，然后再进行替换操作。
  2. 对于上述现象就是，当 null 想要替换 arr[0]时，而 arr[0]存储的是源对象 obj 的内存地址，故先将 obj 拷贝一份，并将拷贝后的 obj 对象的新的内存地址再赋给 arr[0]，然后将 null 替换到 arr[0]；故不会相互影响，因为他们已经不是**同一个内存地址**了。
  3. 当源对象 **中的属性** 被值 value（任何类型均可）替换时，不会进行源对象的拷贝，而是直接在源对象上进行操作，此时操作的是**同一个内存地址**，故两者都会变化。

## 常规的可迭代对象

- Set Map arguments arr 等任何实现了 Symbol.Iterator 接口的类，该接口要求：

1.  要求返回一个迭代器对象。
2.  要求迭代器拥有 next()方法，用于访问下一个可遍历元素 。
    - next 方法返回两个值 {当前值:any，当前是否完成遍历:boolean }

- ```javascript
  //方案1
  let obj = ({ a, b } = {
    items: {
      a: 2,
      b: 10,
      c: 20,
    },
    [Symbol.iterator]() {
      let iterator = {};
      let curIndex = 0;
      const keys = Object.keys(this.items);
      const items = this.items;
      const len = keys.length;
      iterator.next = () => {
        let _iterator = {
          value: null,
          done: false,
        };
        if (curIndex >= 0 && curIndex < len) {
          let temp = {};
          temp[keys[curIndex]] = items[keys[curIndex]];
          _iterator.value = temp;
          curIndex++;
        } else {
          _iterator.value = undefined;
          _iterator.done = true;
        }
        return _iterator;
      };
      return iterator;
    },
  });

  //方案二 使用生成器 generator *FunctionName
  let obj = ({ a, b } = {
    items: {
      a: 2,
      b: 10,
      c: 20,
    },
    *[Symbol.iterator]() {
      for (const key in this.items) {
        if (this.items.hasOwnProperty(key)) {
          const element = this.items[key];
          yield {
            a: element,
          };
        }
      }
    },
  });
  ```

## javascript 中属性的 get set 特性

- 首先明确 get set 特性都是属性 类似于 vue 框架中的 computed 计算属性，虽然写的是方法，但是调用时不会添加开括号。 举个例子：

```javascript
const obj = {
  _value: "zs",
  get value() {
    return this._value + "ls";
  },
  set value(value) {
    this._value = value;
  },
};
console.log(obj.value); //zsls
obj.value = "zss";
console.log(obj.value); //zssls
//当像常规方式调用value属性时，触发get方法，当为value属性赋值，触发set方法。
```

## JavaScript 的运算符

### 运算符

1. +：字符串的链接，数据的计算， 类型的强制转换，如果 + 运算中的两个操作数中有一个是字符串，就会执行字符串拼接，否则执行数字运算。

```javascript
//也可以用作强制类型转换 字符串转换成数字
//此处+"12"先将字符串12强制转换成数字 在完成加运算 最后输出20
console.log(8 + +"12"); // 20
console.log(8 + "12" * 1); // 20
console.log(8 + "12" / 1); // 20
console.log(8 + ("12" - 0)); // 20
// + 强制将date转换成毫秒格式
console.log(+new Date());
//关于隐式转换成字符串a+'' 以及显式转换字符串String(a)的重要区别
const a = {
  valueOf() {
    return 10;
  },
  toString() {
    return 20;
  },
};
// 根据ToPrimitive规则 a+'' 会对a对用valueOf方法。
// 而String(a)是直接调用toString()方法。
console.log(a + ""); //10
console.log(String(a)); // 20
```

2. ~ | 字位运算符：

```javascript
// |操作符的操作仅执行 ToInt32 操作 以下四项均无法以32位形式呈现 所以返回0
console.log(0 | -0); //0
console.log(0 | NaN); //0
console.log(0 | -Infinity); //0
console.log(0 | Infinity); //0
// 按位取反再+1就是2的补码，而只按位取反就是1的补码。
// ~ 操作符是首先将强制将类型转换为32位  然后再执行字位操作“非” 返回2的补码
console.log(~10); //-11
console.log(~11); //-12
console.log(~12); //-13
console.log(~13); //-14
// ~~ 截除数字的小数部分 和math.floor 比较
console.log(~~15.598); // 15
console.log(Math.floor(15.598)); // 15
// 在处理负数上边 两个方法效果不同 ~~ 直接丢弃  floor会进位
console.log(~~-15.598); //-15
console.log(Math.floor(-15.598)); // -16
//另外|也可以截取整数
console.log(15.598 | 0); //15
console.log(-15.598 | 0); //-15
```

3. && 和 || : && 和 || 运算符换回的不一定是布尔类型，，而是两个操作数其中一个的值。

```js
let a = 1,
  b = "abc",
  c = undefined,
  d = null;
// || 返回第一个真值 或者最后一个假值
console.log(a || b); // 1
console.log(c || b); // abc
console.log(a || c); // 1
console.log(d || c); // undefined
console.log(c || d); // null
// && 返回第一个假值 或者最后一个真值
console.log(a && b); // abc
console.log(c && b); // undefined
console.log(a && c); // undefined
console.log(d && c); // null
console.log(c && d); // undefined

// 同时|| 被称作短路符 &&被称作守卫符 如下
let a = 1,
  b = 0;
// ||前边是真值的时候 会短路到后边的表达式
a || console.log("cant resolve 执行不到");
b || console.log("resolve");
// 类似于
if (!b) {
  console.log("resolve");
}
// && 前边是真值的时候 会执行到后边的表达式
a && console.log("resolve");
b && console.log("cant resolve 执行不到");
//类似于
if (a) {
  console.log("resolve");
}
```

4. == 和 === ：== 允许在相等比较重进行强制类型转换，===不允许。

```js
// == 中的类型转换奥秘
let a = "10",
  b = 10;
// 类型转换的规则1：如果 两边有一方是字符串，将字符转转换成数字在进行比较
console.log(a == b); // true
console.log(a === b); // false

// 转换规则2：如果两边有一方是布尔类型， 先将布尔类型转成数字，在进行比较。
// true => 1  false => 0
let x = true,
  y = "12";
console.log(x == y); // false
console.log(x === y); // false

// 转换规则3：null 和 undefined 始终相等
let x = null,
  y = undefined;
console.log(x == y); // true
console.log(x === y); // false

//转换规则4： 如果有一方是对象类型参与比较，则对对象执行ToPrimitive操作
// 注意 会优先调用valueOf方法转成字符串在进行比较
// 如果调用不到valueOf方法会直接使用toString方法转成字符串进行比较
const a = {
  valueOf() {
    // a+''
    return 10;
  },
  toString() {
    // String(a)
    return 20;
  },
};
console.log(a == 10); // true
console.log(a == 20); // false
console.log(a === 20); //false

const b = {
  toString() {
    return 20;
  },
};
console.log(b == 10); //false
console.log(b == 20); //true
console.log(b === 20); // false
```
