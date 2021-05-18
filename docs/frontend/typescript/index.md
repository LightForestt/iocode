## typescript 基础知识

### 1. 变量声明

##### 基本类型

- number

```ts
//number 类型
let num: number = 1;
let ten: number = 20; //10
let hex: number = 0x14; // 16
let oc: number = 0o24; //8
let bin: number = 0b10100; //2
```

- string

```ts
//string 类型
let str: string = `hello ${num}`; // 兼容模板字符串
```

- boolean

```typescript
//boolean 类型
let str: boolean = true; // 兼容模板字符串
```

- any | unknown

> unknow 这个类型表示在创建的时候并不明确类型，但是当使用者使用这个类型的变量时必须将变量断言成某个类型，断言的风险将交给使用者
> 这要求使用者必须清楚自己在写什么代码。

```typescript
//any 类型
let a: any = 4;
a = "string";
let list2: any[] = [1, true, "free"];
list2[0] = "123";
// unknown 类型 不允许对类型为 unknown 的值执行任意操作
let ax: unknown = 123;
ax = " 123 ";
ax.trim(); //Error
```

- void

```typescript
//void 类型 表述没有任何类型 表示当前没有返回值
function f2(): void {
  console.log(1);
}
//不可赋值为其他类型 但是可以赋值给null/undefined
let u: void = null;
let u2: void = undefined;
```

- null 和 undefined

```typescript
//null 和 undefined
//null undefined 是所有类型的子类型 子类型可以赋给父类型  反之不行
let n: number = 1;
n = null;
n = undefined;
// 也可以相互赋值
let a: null = undefined;
let b: undefined = null;
```

- never 
> 具体用法详见尤雨溪知乎。

```typescript
//never类型 最奇怪的类型 同样可以做为任何类型的子类型
//使用never作为返回值的函数必须抛出一个异常或者永远循环运行不到最后一个花括号 不同于void
function err(msg: string): never {
  throw new Error("123");
} // 花括号运行不到
function loop(msg: string): never {
  while (true) {}
} // 同样运行不到
```

- object

```typescript
// object类型
// 不同于java 这个并不是所有类型的父类型 只代表非原始类型
declare function crt(o: object | null): void;
crt({ prop: 0 });
crt(null);
crt(1); // Error
crt("123"); // Error
crt(false); // Error
```

##### 元组 tuple

```typescript
// 元组定长定类型 固定长度 注意对比和数组的区别
let t: [number, string] = [2, "str"];
// 元组解构赋值 一一对应
function f([first, second]: [number, string]): void {}
f(t);
```

##### 数组 [ ]

```typescript
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

// 数组解构赋值
// 对应index赋值 相当于是key相同则赋值给value
let a1 = [2, 2, 3, 4, 5];
let [a3, ...b] = a1;

// 数组展开
let arr1 = [1, 2];
let arr2 = [3, 4];
let arr = [0, ...arr1, ...arr2];

//定义只读数组
let roa: ReadonlyArray<number> = [1, 2, 3];
roa[0] = 3; // Error

// 对象数组
let x: {}[] = [{}];
let x: { a: string; b: number }[] = [{ a: "1", b: 123 }];
```

##### 对象 { }

```typescript
let o = {
  v1: "123",
  v2: "456",
  v3: "789",
  x: "1",
  y: "2",
};
//对象解构 对应key值 如果key值相同就赋值  剩余没有找到key值得键值对通过...操作符封装到一个新的对象
let { v1, ...o2 } = o;

//对象展开
let person = {
  name: "zhasngsan",
  age: 18,
  job: "xxxxx",
};
let p = {
  //会被...解构覆盖
  age: 20,
  ...person,
  f() {
    console.log(this.age);
  },
};
p.f();
```

- 对象中的冒号含义

```typescript
// **************************此处特别注意START**************************
// 在对象中冒号有两种含义
// 1. 声明新的变量 例如 let{ v1:value1,v2:value2} 这种写法标识先将v1从obj中解构出来 然后赋值给value1
// 2. 是指定类型 就如 let{v1,v2} :{v1:string,v2:number} 由于直接在变量声明处使用冒号会导致重新赋值（也就是上述原因） 所以只能通过为整个对象指定类型的方式来检测类型
// 如下：
//指定对象中的值类型
let { x, y }: { x: string; y: string } = o;
//重新赋值x给str
let { x: str, y: num } = o;

// 举例如下
function f3(obj: { v1: string; v2?: number }) {
  //设置默认值解构
  let { v1, v2 = 100 } = obj;
}
f3({ v1: "123", v2: 123 });

// 折磨人的例子
// 定义类型+转赋值+解构赋值+双重默认值验证
function f6(
  { a: c, b: d = 10 }: { a: string; b?: number } = { a: "xxx", b: 333 }
): void {
  //转赋值之后当前函数作用域就没有a 和 b 了
  console.log("c:" + c);
  console.log("d:" + d);
}
//a的类型判断没有问号? 则必传 b?:number 可以不传 为undefined 指定默认值之后为10
f6({ a: "123" }); // c:123  d:10
//如果什么都不穿 就会取对象的默认值 = { a: 'xxx', b: 333 }
f6(); //c: xxx  d:333
//如果传入对象 就不会取对象的默认值 直接报错
f6({}); //Error
// **************************此处特别注意END**************************
```

##### 类型 type

```typescript
//定义一个type 就相当于直接指定一个对象的类型
//type 会给一个类型起个新名字 起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型。
type Name = string; // 基本类型
type NameResolver = () => string; // 函数
type NameOrResolver = Name | NameResolver; // 联合类型
type C = {
  a: string;
  b?: number;
};
function f5({ a, b }: C): void {}
//同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入：
type Container<T> = { value: T };
//也可以使用类型别名来在属性里引用自己 一下是个二叉树结构
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};
// 通过交叉类型创造个链表
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person {
  name: string;
}
//指定people类型是个链表 就可以通过链式调用
var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
//然而，类型别名不能出现在声明右侧的任何地方。
type Yikes = Array<Yikes>; // Error
```

##### 方法 function

```typescript
function add(x: number, y: number): number {
  return x + y;
}
//可选参数和默认参数
function getName(first: string = "well", last?: string): string {
  return last ? first + last : first;
}

// 方法的参数个数和类型都必须匹配  也可以设置可选参数  添加问号
console.log(getName("zhang"));
console.log(getName("zhang", "san"));
console.log(getName(undefined, "san"));

// rest参数
function rest(first: string, ...rest: string[]): string {
  // 此处rest是个数组
  return first + rest;
}
console.log(rest("zhang", "1", "2"));
```

- 方法中的箭头含义

```typescript
//****************************此处特别注意START*****************************
// 在函数中箭头的两种用法
// 第一个箭头后边指定返回值类型
// 第二个标示箭头方法 两部分用等号链接
// 这样做的好处是 在别人使用时可以看到更加合理的参数名称
let add_2: (first: number, next: number) => number = (x, y) => {
  return x + y;
};
// 这种写法和上边的效果相同  只不过将箭头函数换成了普通函数
let add_3: (first: number, next: number) => number = function(x, y) {
  return x + y;
};
//****************************此处特别注意END*****************************
```

##### 枚举 Enum

```typescript
//枚举 enum
enum Color {
  //默认编号从0开始  也可以修改
  red /* 0 */,
  green,
  blue = "123",
}
let c: Color = Color.blue;
```

- 枚举中的双向调用

```typescript
// 枚举间可以双向调用
Color.blue; // 123
Color.red; // 0
Color[0]; // red
// 原因是枚举被编译成如下js
var Color;
(function(Color) {
  //默认编号从0开始  也可以修改
  Color[(Color["red"] = 0)] = "red"; /* 0 */
  Color[(Color["green"] = 1)] = "green";
  Color["blue"] = "123";
})(Color || (Color = {}));
```

##### 类 Class

```typescript
class User {
  //默认public
  name: string;
  age: number;
  job: string;
  constructor(name: string, age: number, job: string) {
    this.name = name;
    this.age = age;
    this.job = job;
  }
}
// 如何简便的获取一个类 基于已存在的类
class Base {
  static age: string = "zhangsan";
}
// typeof Base ***代表将Base类的类型赋值给Extension***
let Extension: typeof Base = Base;
Extension.age = "asdasd";
console.log(typeof Base); // function
console.log(Base); // Function ： Base
```

- 抽象类 abstract class

```typescript
//抽象类 无法直接new 可以包含抽象方法 也可以包含非抽象方法
abstract class Department {
  static s: string = "123";
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  logName(): void {
    console.log(this.name);
  }
  abstract logSt(): void;
}
// 继承抽象类 必须实现其抽象成员
class part extends Department {
  constructor(name: string) {
    super(name);
  }
  logSt(): void {}
}
new Department("456"); // Error
console.log(Department.s); // 123
// 可以new他的派生类
new part("s");
```

- 属性描述符

```typescript
class Person {
  constructor() {}
  //默认public属性 可省略public不写
  //可继承，实例可访问，类不可访问，等同于实例属性
  public publicProperty: string = "public property";
  public publicFunction(): string {
    return "public function";
  }

  // static 静态属性和方法
  // 可继承，实例可以通过使用类名调用的方式访问，类外部也可以使用类名调用的方式访问
  static staticProperty: string = "static property";
  static staticFunction(): string {
    return "static function";
  }

  //protect 属性
  //可继承，实例不可访问，类不可访问
  protected protectedProperty: string = "protected property";
  protected protectedFunction(): string {
    return "protected function";
  }

  //private 私有属性
  //不可继承，实例不可访问，类不可访问，只能通过声明类中的方法进行访问
  private privateProperty: string = "private property";
  private privateFunction(): string {
    return "private function";
  }

  //public test private
  test(): string {
    console.log(this.privateFunction());
    return `test console private => ${this.privateProperty}`;
  }
}
```

##### 接口 Interface

```typescript
interface Sq {
  color: string;
  area: number;
}
interface SqConf {
  color?: string;
  wid?: number;
}
//限定入参和返回值类型
function getSq(conf?: SqConf): Sq {
  conf && (conf.color = conf.color || "red");
  conf && (conf.wid = conf.wid || 10);
  return conf
    ? {
        color: conf.color,
        area: conf.wid ** 2,
      }
    : {
        color: "white",
        area: 100,
      };
}
```

- 构造器接口

```typescript
//构造器接口的使用
//普通接口
interface ClockInterface {
  second: number;
  logTime(): number;
}
// 构造器接口 用来限定构造器类型
interface ClockCtr {
  // 指定构造器返回接口类型 并指定一个入参
  new (second: number): ClockInterface;
}
//使用工厂方法 传入构造器接口 限定构造器类型
function clockFactory(ctor: ClockCtr, time: number): ClockInterface {
  // 工厂函数返回指定构造器类型对应的实例
  return new ctor(time);
}
//实现实例接口 实现接口是不检查静态部分 仅仅检查实例部分
class ClockImpl implements ClockInterface {
  constructor(date: number, str: string) {
    this.second = date;
  }
  second: number;
  logTime() {
    console.log(this.second);
    return this.second;
  }
}
// Error 报错 因为ClockImpl的构造器和声明的构造器接口类型不兼容
// 如果ClockImpl构造器为空或者没有默认构造器不会报错
clockFactory(ClockImpl, Date.now()).logTime();
```

- 只读属性接口

```typescript
//只读属性接口
interface ReadOnlyPoint<T> {
  readonly x: T;
  readonly y: T;
}
//一旦定义就是只读的 不可改变
let p1: ReadOnlyPoint<number> = {
  x: 10,
  y: 20,
};
p1.x = 30; // Error 这里改变x就报错 无法编译成js
```

- 函数类型接口

```typescript
//函数类型的接口
interface IsSearched {
  (source: string, subs: string): boolean;
}
let mySearch: IsSearched = function(source: string, subs: string): boolean {
  return source.search(subs) > -1;
};
```

- 混合类型接口

```typescript
//混合类型接口 不是用来实现的 而是用来断言的 （ts中的接口实现的目的也是这样  只是类型约束）
//因为ts解析到js，在js中function 本身也是一个类  js类作为方法可以执行 作为类又可以赋值  而混合接口匹配的就是这种类（函数）
//这个接口规定了一个即是对象又是函数的实例
interface CounterInterface {
  (param: number[]): string;
  time: number;
  reset(p: number[]): string;
}

function getCount(): CounterInterface {
  let counter = function(p: number[]) {
    return p.join("*");
  } as CounterInterface;
  counter.time = 1;
  counter.reset = (param) => {
    return param + "nice";
  };
  return counter;
}
console.log(getCount()([1, 2, 3]));
console.log(getCount().reset([1, 2, 3]));
console.log(getCount().time);
```

- 索引签名接口

```typescript
//索引签名
interface StringArray {
  //数字签名 相当于创建了一个字符串数组
  [index: number]: string;
}
let myArr1: StringArray = ["bob", "fred"];
let str: string = myArr1[0];

interface StringObj {
  //字符串签名 相当于创建一个对象
  [prop: string]: number;
}
let myArr2: StringObj = {
  name: 1,
  test: 1,
};
let num2: number = myArr2["name"];
// console.log(num2);

//****************此处特别注意START****************************
//使用混合索引签名
class Father {
  name: string;
}
class Son extends Father {
  age: number;
}
// 关于数字签名和字符串签名混用的注意点
// 数字索引返回值必须是字符串返回值的子类型
interface SignMix {
  [key: string]: Father;
  [index: number]: Son;
  // 当通过索引查找值的时候 数字类型会转换成字符串类型 [0]=>['0'] 找到的是Father类型
  // 当调用数字索引都会发生向上转型 Son可以向上转型成Father值 但是Father不能转型成Son
}
//****************此处特别注意END****************************
```

- 接口的实现和断言

```typescript
interface shape {
  size: number;
}

interface color {
  color: string;
}
// 一个class可以实现多个接口
// 一个class只能继承一个类
// 一个接口可以继承多个接口
class S implements color, shape {
  size: number;
  color: string;
  chief: string;
}

// 如果想调用接口中的属性有三种方式
// 1. 实例化继承类S的方式去使用S的属性
let s = new S();
s.color = "red";
s.size = 100;
s.chief = "fcx";

// 2. 创建空类并断言成类型S去使用S的属性
let s2 = {} as S;
s2.color = "red";
s2.chief = "fcx";
s2.size = 200;

// 3. 继承方接口 + 断言
// 构建一个新的接口SI然后多继承所需接口 然后创建一个空对象断言成SI类型进行使用
interface SI extends shape, color {
  chief: string;
}
let s3 = {} as SI;
s3.size = 300;
s3.color = "red";
s3.chief = "fcx";
```

- 接口继承类（反向继承）

```typescript
// ts 里面可以interface 继承 class
// 当interface继承class时做了一个脱壳操作，只继承成员，不继承实现
// private 类型的内容会全部继承到接口中 这是类的继承中不能达到的效果
class Con {
  private state: string = "1";
}

// 此时接口MyCon已经拿到了Con的state的定义
interface MyCon extends Con {
  select(p: number): string;
}

// 如果此时没有继承Con就会报错 因为 RealCon含有未实现的项（从Con继承过来的 私有属性 state）
// 但是Con的私有属性state是无法在不继承Con的情况下实现的
// （如果把state换成public属性或者protect属性都可以通过直接在RealCon中声明来实现 唯独私有属性特殊）
// 结合接口继承类的用法来看ts接口的设计模式
class RealCon extends Con implements MyCon {
  select(p: number): string {
    return p + "";
  }
}
```

##### get set 特性

```ts
// get set 特性
class Person {
  _name: string = "";
  get name(): string {
    return this._name;
  }
  set name(v: string) {
    if (v == "isme") {
      this._name = "yeah";
    } else {
      throw new Error("wrong");
    }
  }
}

const p = new Person();
p.name = "isme";
console.log(p.name);
```

##### 类型断言 as | < >

```typescript
// 类型断言 打破类型约束 或者指定类型为了方便引用被指定的类型的方法和属性
let a2: any = "is str";
// 定义为any类型 转换为字符串类型 两种语法
let a3 = <string>a2;
let a4 = a2 as string;
// 断言为string才有length属性 合理使用
console.log(a3.length);
```

### 2. 属性修饰符 [比对 es5 es6 ts]

##### ES5

```javascript
function Person() {
  //类,实例的构造器
  //私有属性和方法
  var privateProperty = "私有属性";
  var privateFunction = function() {
    return "私有方法";
  };
  //通过实例方法取获取私有的属性和方法
  this.getPrivate = function() {
    return {
      privateProperty: privatePeoperty,
      privateFunction: privateFunction,
    };
  };
  //实例属性和方法
  this.newEeProperty = "实例属性";
  this.newEeFunction = function() {
    return "实例方法";
  };
}
//静态属性和方法
Person.staticProperty = "静态属性";
Person.staticFunciton = function() {
  return "静态方法";
};
//原型属性和方法
Person.prototype.protoProperty = "原型属性";
Person.prototype.protoFunction = function() {
  return "原型方法";
};
```

##### ES6

```js
class Person {
  constructor() {
    //构造器中创建实例方法和私有方法
    //私有属性和方法
    var privateProperty = "私有属性";
    var privateFunction = function() {
      return "私有方法";
    };
    //实例属性和方法
    this.newEeProperty = "实例属性";
    this.newEeFunction = function() {
      return "实例方法";
    };
    //通过实例方法取获取私有的属性和方法
    this.getPrivate = function() {
      return {
        privateProperty: privateProperty,
        privateFunction: privateFunction,
      };
    };
  }
  //静态方法
  static staticFunciton() {
    return "静态方法";
  }
  //静态属性
  static staticProperty = "静态属性";
  //不写static 就是原型链方法
  prototypeFunction() {
    return "原型链方法";
  }
  prototypeProperty = "原型链属性";
}
```

##### TS

```typescript
class Person {
  constructor() {}
  //默认public属性 可省略public不写
  //可继承，实例可访问，类不可访问，等同于实例属性
  public publicProperty: string = "public property";
  public publicFunction(): string {
    return "public function";
  }

  // static 静态属性和方法
  // 可继承，实例可以通过使用类名调用的方式访问，类外部也可以使用类名调用的方式访问
  static staticProperty: string = "static property";
  static staticFunction(): string {
    return "static function";
  }

  //protect 属性
  //可继承，实例不可访问，类不可访问
  protected protectedProperty: string = "protected property";
  protected protectedFunction(): string {
    return "protected function";
  }

  //private 私有属性
  //不可继承，实例不可访问，类不可访问，只能通过声明类中的方法进行访问
  private privateProperty: string = "private property";
  private privateFunction(): string {
    return "private function";
  }

  //public test private
  test(): string {
    console.log(this.privateFunction());
    return `test console private => ${this.privateProperty}`;
  }
}
```

### 3. ts 中的 this（和 js 中的 this 类似）

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
interface Fy {
  persons: Person[];
  // 指定函数的返回值还是一个函数
  getP(this: Fy): (idx: number) => Person;
  // this:void 代表当前函数中this不可用
  disabled(this: void): void;
}
let p1 = new Person("zhangsan", 15);
let p2 = new Person("lisi", 10);

let fy: Fy = {
  persons: [p1, p2],
  //传入this:Fy 这样就可以告知当前函数作用域呢的this执行的是一个fy对象 就有代码提示了  除此之外没有别的用处
  getP: function() {
    // 使用正常方法，this调用报错，因为这个函数在global环境下执行 而global对象中不存在一个persons属性
    // return function(idx: number) {
    //   return this.persons[0]
    // }
    //  可以通过修改成箭头函数或者保存this再使用来解决
    return (idx: number) => {
      // 此处的this需要向上寻找 则找到getP的this 即 fy
      return this.persons[0];
    };
  },
  disabled: function() {
    console.log(this.Person[0]); // Error 因为接口中定义了this：void
  },
};
fy.disabled();
```

- 方法中的 this 和编译成的 js 代码中的 this

```typescript
class Test {
  name = 1;
  // 直接声明式
  method1() {
    return this.name;
  }
  // 表达式声明且非箭头函数
  method2 = function() {
    return this.name; // check error
  };
  // 表达式声明使用箭头函数
  method3 = () => {
    return this.name;
  };
}
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
var Test = /** @class */ (function() {
  function Test() {
    var _this = this;
    this.name = 1;
    // 表达式声明的非箭头函数的this就是调用者
    this.method2 = function() {
      return this.name;
    };
    // 表达式声明的箭头函数的this保存的是父级作用域的this 也就是实例
    this.method3 = function() {
      return _this.name;
    };
  }
  // 直接声明式的方法挂在原型链上的 this指向的是调用者  也就是实例
  Test.prototype.method1 = function() {
    return this.name;
  };
  return Test;
})();
```

### 4. 函数重载

```typescript
// 实现写在最后
function funcTest(x: { name: string }, y: number): void;
function funcTest(x: { name: string; age?: number }, y?: number): void;
function funcTest(x: any, y: number) {
  console.log(typeof x);
  if (typeof x === "object") {
    console.log(x);
  } else {
    console.log(y);
  }
}
funcTest({ name: "zhangsan" }, 15);
```

### 5. 泛型

- 泛型变量

  - 泛型方法

  ```typescript
  // 泛型方法
  function genericFunc<T>(param: T): T {
    return param;
  }
  ```

  - 泛型类型

  ```typescript
  // 声明一个泛型类型的方法
  let func: <T>(param: T) => T = genericFunc;

  // 使用对象自变量来定义泛型方法 和使用泛型方法接口类似
  let func2: { <T>(param: T): T } = genericFunc;

  // 泛型方法接口
  interface GenericInterface<T> {
    <T>(param: T): T;
  }
  let func3: GenericInterface<number> = genericFunc;
  ```

- 泛型类

```typescript
//泛型类
class genericClass<T> {
  value: T;
  getT: () => T;
}
//通过指定类型来检查泛型中使用泛型的值和方法
let g = new genericClass<string>();
g.value = "1";
g.getT = (): string => {
  return g.value;
};
```

- 泛型约束

```typescript
//泛型约束 可以使用一些特定类型来约束泛型
interface Limit {
  length: number;
}
// 使用接口约束泛型类
// 当Clazz创建实例时并调用getlength方法时传入的类型也应该是Limit的子类型
class Clazz<T extends Limit> {
  getLength(param: T): number {
    // 可以使用length  如果不继承约束接口  就会报错
    return param.length;
  }
}

// 使用接口约束泛型方法
function getLength<T extends Limit>(param: T): number {
  return param.length;
}

console.log(getLength({ length: 10 }));

// extends keyof约束
// 约束两个泛型间的关系，类型K是类型T的key（也就是属性值）
function getValue<T, K extends keyof T>(O: T, key: K): any {
  return O[key];
}
let x = {
  a: 1,
  b: 2,
  10: 3,
  d: 4,
};
getValue(x, 10);
getValue(x, "b");

// 工厂函数中的泛型 约束构造器的返回值为T
// 写法1
function factory<T>(ctor: { new (): T }): T {
  return new ctor();
}
//写法2 推荐
function factory2<T>(ctor: new () => T): T {
  return new ctor();
}
```

### 6. 高级类型

- 交叉类型

```typescript
// 交叉类型 T & U 相当于是TU合并的新类型 且的关系
function extend<T, U>(first: T, second: U): T & U {
  let rs = {} as T & U;
  for (const item in first) {
    if (first.hasOwnProperty(item)) {
      rs[item] = first[item] as any;
    }
  }
  for (const item in second) {
    if (second.hasOwnProperty(item)) {
      rs[item] = second[item] as any;
    }
  }
  return rs;
}
```

- 联合类型

```typescript
// 联合类型 相当于是 两个类型均可 或的关系
// 例1
function padLeft(value: string, padding: number | string): string | number {
  return typeof padding === "number"
    ? Array(padding + 1).join(" ") + value
    : typeof padding === "string"
    ? value + padding
    : "error";
}
// 例2
interface A {
  talk(): void;
  eat(): void;
}
interface B {
  fork(): void;
  eat(): void;
}
function test(): A | B {
  return;
}
let i = test();
i.eat(); // 不报错
i.fork(); // error 因为fork属性不是联合属性的共有方法
```

- interface 中的类型保护

```typescript
//接口中的类型保护 使用谓词is
interface A {
    talk(): void
    eat(): void
}

interface B {
    fork(): void
    eat(): void
}

function test(): A | B {
    return
}
//类型谓词 is连接
function isA(i: A | B): i is A {
    return (i as A).talk !== undefined
}
//类型谓词is连接的必须是联合类型中的一种或子类型
function isB(i: A | B): i is B {
    return (i as B).fork !== undefined
}
// 此时可以使用这种保护机制去判断类型
let i = test()
if (isA(i)) {
    i.talk() // 不报错
} else {
    i.fork() // 不报错
}

```

- class 中的类型保护

```typescript
// 类中的类型保护方式 instance类型保护
class A {
  eat() {
    console.log("eat");
  }
  talk() {
    console.log("talk");
  }
}
class B {
  eat() {
    console.log("eat");
  }
  fork() {
    console.log("fork");
  }
}
function getInstance(): A | B {
  return Math.random() > 0.5 ? new A() : new B();
}
let i = getInstance();
i.eat();
if (i instanceof A) {
  //使用instanceof判断类型
  i.talk();
} else {
  i.fork();
}
```

- 可以为 null 的类型

```typescript
// null和undefined即可以作为类型也可以做为值 任何值都可以赋值给null和undefined 但是这样不是足够安全的
// 因此在开发过程中通常需要严格控制null和undefined的类型检测

function f(x: number, y?: number): number {
  return x + (y || 0);
}
class C {
  a: number;
  b?: number;
}
let c = new C();
c.a = 0;
c.a = undefined; // 严格类型模式下报错 因为a是不可空 且传入类型为number
c.b = 0;
c.b = undefined; // 严格类型模式下不报错 因为b是可选参数
c.b = null; // 报错 因为null不能赋值给undefined
// 在执行编译 需要命令行 tsc .ts --strictNullChecks

// 使用叹号来告诉编译器 当前已经通过代码判断过str不为null/undefined
// （ps：我用的编译器目测可以自己判断 不用加感叹号了 ts官方升级了编译器）
function f(name: string | null): string {
  function f2(str: string): string {
    return str!.charAt(0) + "***" + str;
  }
  name = name || "str";
  return f2(name);
}
f(null);
```

- 字符串字面量类型

```typescript
// 指定Ease类型为三个字符串的联合类型
type Ease = "ease-in" | "ease-out" | "ease-in-out";
```

### 7. interface 和 type 的终极对比

- 描述对象或函数

```typescript
//两者都可以用来描述对象或函数的类型，但是语法不同。
//Interface
interface Point {
  x: number;
  y: number;
}
interface SetPoint {
  (x: number, y: number): void;
}

//Type
type Point = {
  x: number;
  y: number;
};
type SetPoint = (x: number, y: number) => void;
```

- type 描述其他类型

```typescript
// 与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。
// primitive 描述原始类型
type Name = string;

// object
type PartialPointX = { x: number };
type PartialPointY = { y: number };

// union 联合类型
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement("div");
type B = typeof div;
```

- 扩展方式

```typescript
//interface 通过继承拓展
interface PartialPointX {
  x: number;
}
interface Point extends PartialPointX {
  y: number;
}

//type 通过交叉拓展
type PartialPointX = { x: number };
type Point = PartialPointX & { y: number };

//interface拓展type
type PartialPointX = { x: number };
interface Point extends PartialPointX {
  y: number;
}
//type拓展interface
interface PartialPointX {
  x: number;
}
type Point = PartialPointX & { y: number };
```

- 类去实现 interface 或者 type

```typescript
//类可以以相同的方式实现接口或类型别名。
// 但是请注意，类和接口被认为是静态的。因此，它们不能实现/扩展命名联合类型的类型别名。 也就是说联合类型是不允许拓展的 究其原因就是 联合类型的不确定性
interface Point {
  x: number;
  y: number;
}
class SomePoint implements Point {
  x: 1;
  y: 2;
}
type Point2 = {
  x: number;
  y: number;
};
class SomePoint2 implements Point2 {
  x: 1;
  y: 2;
}
//无论是实现type还是interface 编译成的js代码都是完全相同的

type PartialPoint = { x: number } | { y: number }; //联合类型
// FIXME: can not implement a union type
class SomePartialPoint implements PartialPoint {
  x: 1;
  y: 2;
}
```

- interface 可以继承 class

```typescript
// 类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。
class Point {
  x: number;
  y: number;
}
interface Point3d extends Point {
  z: number;
}
//type不可以继承class
```

- 接口的默认合并

```typescript
//与类型别名不同，接口可以定义多次，并将被视为单个接口(合并所有声明的成员)。
interface Point {
  x: number;
}
interface Point {
  y: number;
}
//会默认合并成 interface Point { x: number; y: number; }
const point: Point = { x: 1, y: 2 };
```

- 映射字面量类型

```typescript
//type 能使用 in 关键字生成映射类型，但 interface 不行。
// 语法与索引签名的语法类型，内部使用了 for .. in。 具有三个部分：
//- 类型变量 K，它会依次绑定到每个属性。
//- 字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
//- 属性的结果类型（使用keys的类型）。
type Keys = "firstname" | "surname";
type DudeType = {
  [key in Keys]: string;
};
// 限定dudetype类型之后 里面的key值必须满足dudetype的索引要求
const test: DudeType = {
  firstname: "Pawel",
  surname: "Grzybek",
  // a:'asda' // error
};
// interface 不可使用映射关系
// interface DudeType2 {
//     [key in Keys]: string
// } //error
```

- 导出 interface 和 type 语法

```typescript
export default interface Config {
  name: string;
}
// export default type Config1 = {
//   name: string
// }
// type直接导出会报错

type Config2 = {
  name: string;
};
export default Config2; // 不报错
```

- 总结：

* 类型：对象、函数两者都适用，但是 type 更可以用于基础类型、联合类型、元祖。
* 自动合并：interface 支持，type 不支持。
* 字面量类型封装并映射：type 支持, interface 不支持。
