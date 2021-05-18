# Promise & 生成器 & await async

##### 0.异步编程核心：程序中现在运行的部分和将来运行的部分之间的关系。

##### 1.异步操作，例子：`log`

```js
const a = { idx: 1 };
console.log(a.idx); //  2 (少数情况下)
a.idx++;
```

> 打印是 IO 操作，打印到控制台是低速的阻塞操作。浏览器一般采用异步形式去打印，在后台异步处理控制台的 IO 操作能够提高性能。 也就是说`a.idx++`有先执行的可能性，然后`log`出来的就是 2，在某些情况下是缺乏准确性的，更为精确地调试方法是断点调试。

##### 2.浏览器的`eventloop`

> 如果发出一个 Ajax 请求，并在一个回调函数中设置好响应代码，JavaScript 引擎会暂停（当前）执行，等待宿主“唤醒”回调， 然后浏览器就会监听来自网络的响应，一旦完成网络请求，就会 **把回调函数插入到事件循环**，
> 以此实现对这个回调的调度执行。那什么是事件循环？

```js
// V8运行环境下 有微任务队列 垃圾回收 ui渲染队列...
const global = {
  micro() {},
  gc() {},
  ui() {},
};
const eventLoop = [];
let event;
while (1) {
  // tick 每个事件循环就是一个tick
  if (eventLoop.length > 0) {
    event = eventLoop.shift(); //FIFO
    try {
      event();
      global.micro();
      global.gc();
      global.ui();
      //global...
    } catch (e) {
      // errHandler..
    }
  }
}
```

> JavaScript 引擎本身所做的是在需要的时候执行程序中的单个代码块。JavaScript 引擎并不是独立运行的，它运行在宿主环境中，浏览器或是`Node.js`或者其他的环境。但是，所有这些环境都有一个共同点,它们都提供了一种机制来处理程序中多个块的执行, 宿主决定 js 引擎如何为我所用，这种机制被称为事件循环。换句话说,JavaScript 引擎本身并没有时间的概念，只是一个按需执行 JavaScript 任意代码片段的**工具**。事件调度总是由包含它的环境进行，任务是宿主环境定义调用时机的，`promise.then, timeout, web worker,raf,gc`，也就是说 js 引擎什么时候开始执行代码，宿主说了算，不同环境下的事件循环机制不同，例如`node`或浏览器。 如下：浏览器事件循环机制：
>
> event loop 的每一步：`整个脚本作为第一个宏任务 --> 宏任务入栈 --> 同步代码直接执行 --> 当前宏任务执行完毕 --> 检查微任务队列并清空微任务队列 --> 执行ui渲染进程或检查webworker --> 宏任务入栈 --> 执行下一个宏任务知道清空宏任务栈`
>
> web 下宏微任务：
>
> 微队列 => 由微任务算法创建的队列：`promise MutationObserver fetch-API`
> 宏队列 => `主进程 setTimeout raf I/O`

##### 3.1 回调地狱

> 经典回调，整个流程中需要不断跳来跳去查看代码运行流程，代码复杂度越高，追踪难度越大

```js
function data(param, response) {
  setTimeout(() => {
    response({
      url: "url2",
    });
  }, 1000);
}

data("url1", (ret1) => {
  data(ret1.url, (ret2) => {
    data(ret2.url, (ret3) => {
      //....
    });
  });
  data(ret1.url, (ret4) => {
    data(ret4.url, (ret5) => {
      //....
    });
  });
});
```

##### 3.2 Zalgo in hell 地狱中的恶魔 - 信任问题

> 回调等同于是将自己代码交给工具、库去代理执行，也就是平时说的控制翻转 (IOC),库内部的代码对你是不可见的。当存在信任问题的时候，将需要自己去确认很多安全检查去避免异常，避免导致很严重的问题。

- 不信任的很多种情况：

  1. 回调使用过早甚至同步代
  2. 回调使用过晚甚至不会调用
  3. 回调次数不合理甚至多次调用(尤其对于某些付款交易)
  4. 参数传递问题不回传重要参数导致程序报错
  5. 潜在的 bug 未作处理，异常处理脆弱，回调的某一级出错之后，后续任务将会永远跑不到，为了避免这种情况，需要在每一个步骤中添加异常处理代码。前提是：你得知道哪报错，并且明白怎么处理这些异常，当然存在某些极端情况下某些代码会报错，当编码者并不清楚某个地方存在 bug 的时候将无法通过硬编码去捕获这个错误，直到线上出现重大问题，对于这些没有处理的潜在的 bug，就是你放出的恶魔。 （release Zalgo）

##### 3.3 promise 模式以前的信任问题解决方案：

> 这两种方案未从根本上解决问题，分离模式甚至需要用户传入两套代码去应对不同的情况，err-first 也同样需要去做 node 风格的 err 校验。 **繁琐。**

```js
// - 1. 成功、失败分离模式
function data(param, success, failed) {
  setTimeout(() => {
    if ("...") {
      success("success");
    } else {
      failed("err");
    }
  });
}

// - 2. error-first 风格（nodejs风格）
function data(param, cb) {
  setTimeout(() => {
    let err;
    if ("...") {
      err = new Error("zalgo");
    }
    cb(err, "success"); // 将错误作为第一个参数传入
  });
}
```

##### 4.1 promise

> promise 本质上也是回调，只不过修改了回调的传入和使用方式

- 接下来具体看一下 promise 是如何处理传统回调中的信任问题的:

  1. 调用过早：永远异步调用，永远通过 `Promise.resolve()` 进行一次标准化。

  2. 调用过晚或者根本没有调用：设置超时时间及应对方案`Promise.race([timeoutPromise,Promise])`

  3. 调用次数过多：单决议，每个 promise 只能进行一次决议，且状态无法回退。

     对于不可信任的 thenable，也可以通过 Promise.resolve()去进行标准化。

     ```js
     const thenable = {
       then(res, rej) {
         res("我决议了");
         rej("我又拒绝了"); // 这个不标准的thenable对象会决议两次 这是不符合promise规范的
       },
     };
     thenable.then(
       (res) => {
         console.log(res);
       },
       (err) => {
         throw err; //这里也会执行到
       }
     );
     // ***************把 thenable 转换成仅仅能决议一次的规范化的promise*********************
     Promise.resolve(thenable).then(
       (res) => {
         console.log(res);
       },
       (err) => {
         throw err; //这里绝对不会执行到
       }
     );
     new Promise((res, rej) => {
       thenable.then(res, rej);
     }).then(
       (res) => {
         console.log(res);
       },
       (err) => {
         throw err;
       }
     );
     ```

  4. 参数传递：同一封装到一个决议值，未传就是 undefined

  5. 潜在的 bug 处理：使用 catch，通过错误冒泡去处理错误。

##### 4.2 究其原理 手写 promise

```js
// new ():IPromise
// then
// catch
// finally
// static resolve
// static reject
// static all
// static race
let id = 0;

function IPromise(fn) {
  const states = ["pending", "resolved", "rejected"];
  this.id = ++id;
  this.resfns = [];
  this.rejfns = [];
  this.stat = states[0];
  this.val = null;
  this.err = null;
  const self = this;

  function nextTick(fn) {
    setTimeout(fn, 0);
  }

  function res(val) {
    // 进行决议 然后去flush回调函数数组
    nextTick(() => {
      if (self.stat === "pending") {
        self.val = val;
        self.stat = states[1];
        self.resfns.forEach((fn) => {
          self.val = fn.call(self, self.val);
        });
      }
    });
  }

  function rej(err) {
    nextTick(() => {
      if (self.stat === "pending") {
        self.err = err;
        self.stat = states[2];
        self.rejfns.forEach((fn) => {
          fn.call(self, err);
        });
      }
    });
  }

  fn(res, rej);
}

IPromise.prototype.then = function then(
  onresd = (res) => res,
  onrejd = (e) => {
    throw e;
  }
) {
  const self = this;
  if (self.stat === "pending") {
    // 同步添加回调  异步等待回调 等待当前promise res()之后执行回调
    const temp = new IPromise((res, rej) => {
      // 如果self尚未决议 返回一个新的promsie
      // 当前self分别传入对应状态的回调函数 res rej
      // 当前self中传入的回调,回调首先执行当前then中传入的方法 onresd onrejd (promise 内部同步执行)
      // 将当前fn fn2的返回值 **透传** 给了当前新的promise temp的自己的回调函数（如果有的话）
      // temp.then('这里将获得fn的结果').catch('这里讲获得fn2的结果')
      // 以下内容同步执行
      self.resfns.push((val) => {
        // 传入self.res(val)时候执行的回调 ，回调中触发了temp.res() 实现链式调用
        if (val instanceof IPromise) {
          val.then((result) => {
            // 如果当前是 thenable 就通过 .then() 进行一次脱壳操作 取到返回值并透传 （如果返回值还是promise还需一直脱壳 懒得写 就先整一层脱壳）
            try {
              res(onresd(result));
            } catch (e) {
              rej(e);
            }
          });
        } else {
          try {
            let ret = onresd(val); // 此时执行self的then()中传入的第一个函数，得到返回值 ret
            res(ret); // 通过temp的res()去执行temp的回调,并且将ret传递给下一个 then(onresd(ret)) ,这就是值的透传 开启下一个then()
          } catch (e) {
            rej(e); // 执行过程中报错 就执行下一个promise的错误处理回调 这就是错误的冒泡
          }
        }
      });
      self.rejfns.push((err) => {
        // 传入错误处理回调
        try {
          let ret = onrejd(err); // 此处会不断将错误冒泡
          res(ret); // 执行错误处理方法 如果未传入 默认直接抛出当前错误 将错误处理结果传到下一个promise的then方法中去 也就是每次处理完错误都回归正常流程
        } catch (e) {
          // 如果未作处理 直接抛错 冒泡到下一个then(null,onrejd)或catch(onrejd)
          rej(e);
        }
      });
    });
    return temp;
  } else if (self.stat === "resolved") {
    onresd(self.val);
  } else {
    onrejd(self.err);
  }
  return this;
};

IPromise.prototype.catch = function cat(fn) {
  return this.then(null, fn);
};

IPromise.prototype.finally = function final(fn) {
  this.then(
    (val) => {
      fn();
    },
    (err) => {
      fn();
    }
  );
};

const isFunction = function isFn(a) {
  return typeof a === "function";
};

IPromise.resolve = function resolve(val) {
  if (val instanceof IPromise) {
    // 检查promise
    return val;
  } else if (val && val.then && isFunction(val.then)) {
    // 根据鸭子理论去检查thenable类型
    return new IPromise((res, rej) => {
      val.then(res, rej);
    });
  } else {
    return new IPromise((res) => {
      res(val);
    });
  }
};

IPromise.reject = function reject(err) {
  return new IPromise((res, rej) => {
    rej(err);
  });
};

IPromise.all = function all(arr) {
  const promises = arr.map((promise) => {
    return promise instanceof IPromise ? promise : IPromise.resolve(promise);
  });
  let len = promises.length;
  return new IPromise((res, rej) => {
    const resArr = [];
    try {
      promises.forEach((i, index) => {
        i.then((r) => {
          resArr[index] = r;
          if (--len === 0) {
            res([...resArr]);
          }
        });
      });
    } catch (e) {
      rej(e);
    }
  });
};

IPromise.race = function race(arr) {
  const promises = arr.map((promise) => {
    return promise instanceof IPromise ? promise : IPromise.resolve(promise);
  });
  let flag = false;
  return new IPromise((res, rej) => {
    try {
      promises.forEach((i, index) => {
        i.then((r) => {
          if (flag) {
            return;
          }
          flag = true;
          res(r);
        });
      });
    } catch (e) {
      rej(e);
    }
  });
};

const p1 = new IPromise(function f0(res) {
  // f0.res() => p1.res()
  setTimeout(() => {
    res("start");
  }, 500);
});

const p2 = p1.then(function f1(data) {
  // p1.then()返回新的promise p2，p1的回调会执行p2的res()
  console.log(data);
  return Promise.resolve("then 1");
});

const p3 = p2.then(function f2(data) {
  console.log(data);
  throw new Error("then 2");
});

const p4 = p3.then(function f3(data) {
  console.log(data);
  return "then 3";
});

const p5 = p4.catch(function f4(err) {
  console.log("err : " + err);
});

p5.finally(() => {
  console.log("shut src");
});

IPromise.all([
  new IPromise((res) => {
    setTimeout(() => {
      res("123");
    }, 2000);
  }),
  2,
  3,
]).then((res) => {
  console.log(res);
});

IPromise.race([
  new IPromise((res) => {
    setTimeout(() => {
      res("123");
    }, 2000);
  }),
  2,
  3,
]).then((res) => {
  console.log(res);
});
```

##### 4.3 promise 的局限性是什么

1. 如果一开始就错误的使用 promise-API 就无法在 rej 中捕获错误 例如 new Promise(null) || Promise.race(1)。
2. 当同一个 promise 拥有多个 res 决议或者 rej 决议的时候，如果决议过程中报错，可能会造成有的回调执行了，有的回调没执行。
3. 无法取消的 promise，`Promise.race([timeoutPromsie,p])` 假设超时很自然会执行 timeoutPromise，但是 p 的执行不会中断，甚至还是执行 p.then()，这实际上和期望是不一致的。就像某个动作超时了，其后续动作应该停止！
4. 异步错误无法同步捕获（传统回调也有这个问题）。
5. 在 promise 链中的最后一步的报错无法预测，这实际上是个无底洞。
6. 顺序错误处理，promise 的链式调用，方便但同时定位具体某个链节出错的时候比较难。(以链式的编码习惯来说，无法为中间的每个链接去添加错误处理方法)。

##### 5.1 生成器 - 打破 function 完整运行的魔法

```js
function* gen(some) {
  let x = 0;
  while (1) {
    let ret = some + (yield ++x);
    console.log("ret : " + ret);
  }
}
const iterable = gen("pre***************");
let now = iterable.next("start"); // 启动这个生成器！ 但start将被丢弃。
console.log(now.value); // 1 yield将后边表达式的值传给了next()  { value: 1, done: false }
now = iterable.next("next 1");
console.log(now.value); // 2
now = iterable.next("next 2");
console.log(now.value); // 3

iterable.return(); // 停止迭代
iterable.throw(); // 抛出迭代器错误 error
```

> 关于生成器运行时的几个注意点
>
> 0. 生成器仅仅暂停了自身的代码，不影响整体运行。
> 1. gen()仅仅创建了一个迭代器 而不是运行生成器中的方法
> 1. 生成器将会建立 yield 和 next 之间的 **_双向数据通路_**
>
>    - next 将数据传递给 yield 所处的表达式
>    - yield 将数据回传给 next 方法的返回值
>
> 1. 迭代器的第一个 next 永远是开启这个生成器，运行到第一个 yield 停止（并把第一个 yield 后的表达式的运算值拿回来）.
> 1. 第一个 next(param)中的参数 param 会被丢弃。后续的 next 才会传递数据到 yield 所在的表达式中去。
> 1. 生成器可以永远不执行完毕 （永远处于一个暂停的状态）
> 1. 对于可执行完毕的生成器 最后一个 next 将拿到 return 的结果 未设置 返回值的 value 属性为 undefined
> 1. 外部通过调用迭代器的方法停止一个迭代器 iterable.return()
> 1. 外部通过调用迭代器的方法使迭代器抛出错误 iterable.throw()

##### 5.2 for - of 和生成器

> for of 会展开可迭代对象，可迭代对象有两个特点
>
> - \[Symbol.iterator\]() 返回一个迭代器用于 for-of 循环使用
> - next()方法 返回每一次迭代的结果

```js
// 手动去创建一个可迭代对象
const iterable = {
  val: 0,
  next() {
    // 去迭代当前的迭代器
    if (this.val < 500) {
      return {
        done: false,
        value: (this.val += 50),
      };
    } else {
      return {
        done: true,
        value: this.val,
      };
    }
  },
  [Symbol.iterator]() {
    // 获取一个迭代器
    return this;
  },
};

//用生成器去轻松创建一个可迭代对象
function* gen() {
  let val = 0;
  while (1) {
    if (val < 500) {
      yield (val += 50);
    }
  }
  return val;
}

for (let item of gen()) {
  console.log(item);
}
```

##### 6.promise + 生成器 -- 开启异步新纪元

> 同步捕获错误处理，试想以下两段代码：

```js
// 同步写法
function data$(p1, p2) {
  setTimeout(() => {
    try {
      return p1.toLowerCase() + p2.toLowerCase();
    } catch (e) {
      throw e; // 将错误从内部抛出
    }
  }, 1000);
}

function getData(p1, p2) {
  try {
    let text = data$(p1, p2);
    console.log(text); //undefined 不可能获取到异步数据
  } catch (e) {
    console.log(e.message); // 也不能捕获异步错误
  }
}

getData(3, "4");

// 回调写法
function data$(p1, p2, cb) {
  setTimeout(() => {
    try {
      cb(p1.toLowerCase() + p2.toLowerCase()); //回传数据
    } catch (e) {
      throw e; // 将错误从内部抛出
    }
  }, 1000);
}

function getData(p1, p2) {
  try {
    data$(p1, p2, (text) => {
      console.log(text); // 能得到数据
    });
  } catch (e) {
    console.log(e.message); // 也不能捕获异步错误
  }
}

getData(3, "4");

// promise
function data$(p1, p2) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        res(p1.toLowerCase() + p2.toLowerCase());
      } catch (e) {
        throw e; // 将错误从内部抛出
      }
    }, 1000);
  });
}

function getData(p1, p2) {
  try {
    data$(p1, p2).then((text) => {
      console.log(text);
    });
  } catch (e) {
    console.log(e.message); // 也不能捕获异步错误
  }
}

getData(3, "4");
```

> 加入生成器，让生成器去代理代码的执行和错误的处理：**生成器 yield 暂停的特性意味着不仅能够从异步函数调用得到看似同步的返回值，还可以同步捕获来自这些异步函数调用的错误。**

```js
function data$(p1, p2) {
  setTimeout(() => {
    try {
      iterator.next(p1.toLowerCase() + p2.toLowerCase()); // 生成器将数据回传
    } catch (e) {
      iterator.throw(e); // 生成器将错误从内部抛到外层！
    }
  }, 1000);
}

function* getData(p1, p2) {
  try {
    let text = yield data$(p1, p2); // 可以看作是等待data$执行完成
    console.log(text); // 看似是同步的代码 没有回调 也没有promise.then
  } catch (e) {
    console.log(e.message); // catch到了！ 捕获到了异步的错误。
  }
}

const iterator = getData(3, "4"); // 获取迭代器
iterator.next(); // 启动 将代码的运行交给生成器
```

##### 6.2 `generator runner` - 是时候融合 pormise 和生成器了！！！

```js
// 把函数的返回值修改成返回promise的形式
// calc(1,2)=>3
// 通过wrap之后 Promise.wrap(calc) => calcWrapped
// calcWrapped(1,2).then(data => console.log(data) //3 )
if (!Promise.wrap) {
  Promise.wrap = function(fn) {
    return function() {
      let args = [].slice.call(arguments);
      return new Promise((resolve, reject) => {
        try {
          resolve(fn(args));
        } catch (e) {
          reject(e);
        }
      });
    };
  };
}

function calc([x, y]) {
  let sum = x + y;
  if (sum < 10) {
    return sum;
  } else {
    throw new Error("ERROR **** bigger than 10");
  }
}

/**
 * run 代理一個生成器,帮助拦截生成器返回结果并传入promise的决议值
 * 入参是一个生成器 返回一个promise，回传生成器***最终***的return值
 * @param {Generator}
 * @return {Promise}
 */
function run(gen) {
  let args = [].slice.call(arguments, 1); // 后续参数赋值给生成器 run(gen,param1,param2...)
  let it = gen.apply(this, args); // 得到当前迭代器

  function handleError(err) {
    // 这里将错误通过生成器的方法抛出 所以能在生成器内部同步catch到
    // 外层catch到错误处理完毕之后会继续运行到下一个yield处
    return Promise.resolve(it.throw(err)).then(handleResult);
  }

  function handleResult(next) {
    //  每次都拿到 {value:any,done:Boolean}
    // 非promise标准化成promise（主要是为了针对某些生成器内部没有yield关键字）
    next.value = Promise.resolve(next.value);
    if (next.done) {
      // 判断生成器状态 如果完成了 直接返回值
      return next.value;
    } else {
      // 否则继续迭代生成器 获取中间数据
      return Promise.resolve(next.value).then(handleNext, handleError);
    }
  }

  function handleNext(val) {
    // 核心
    // it.next(val)会首先把val传给yield所在的表达式 (启动时生成器会自动忽略该值)
    // 然后生成器会运行到下一个暂停处
    // 拿到yield的返回值赋值给nextItem
    let nextItem = it.next(val);
    return handleResult(nextItem);
  }

  return handleNext();

  // 如果不添加第45行代码 就需要添加如下几种方案去进行promise标准化
  //  return Promise.resolve(handleNext())
  //  return Promise.resolve().then(handleNext)
  //  return new Promise(res => {
  //      res()
  //  }).then(handleNext)
}

function* gen() {
  try {
    let res1 = yield Promise.wrap(calc)(1, 2); // 第一次启动生成器会运行yield后的表达式并拿到返回结果
    console.log("res1: ", res1); // 同步获取
    let res2 = yield Promise.wrap(calc)(5, 6);
    console.log("res2: ", res2);
  } catch (e) {
    console.log(e.message);
  }
  //  测试抛出异常后是否继续执行
  let res3 = yield Promise.wrap(calc)(3, 4);
  console.log("res3: ", res3);

  return "the end"; // 这个值将在生成器中所有内容执行结束之后传给 run(gen).then(res=> 的res)
}

run(gen).then((res) => console.log(res));

// generator runner 的浓缩写法
function _run(gen) {
  const args = [].slice.call(arguments, 1);
  const it = gen.apply(this, args);

  return Promise.resolve().then(function handleNext(value) {
    const next = it.next(value);
    return (function handleResult(next) {
      if (next.done) {
        return next.value;
      } else {
        return Promise.resolve(next.value).then(handleNext, function handleErr(
          err
        ) {
          return Promise.resolve(it.throw(err)).then(handleResult);
        });
      }
    })(next);
  });
}
```

##### 7. ES7 之 async + await -- 传说中的异步终极解决方案 （babel 已经支持）

异步编程的最高境界，就是根本不用关心它是不是异步。 - 阮一峰

- async 函数就是生成器的语法糖。async 函数就是将生成器函数的（\*）替换成 async，将 yield 替换成 await。**而不需要借助 generator runner 辅助执行器**

关键字解析：

- async 声明一个方法内部是异步的

  > async 函数（包含函数语句、函数表达式、Lambda 表达式）会返回一个 Promise 对象，如果在函数中 return 一个非 promise，async 会把这个直接量通过 Promise.resolve()进行标准化

```js
async function testAsync() {
  const a = await $data();
  console.log(a);
}
console.log(testAsync()); // Promise{'...'}

testAsync().then((res) => {
  // Promise对象，就可以通过then来调用
  console.log(res);
});
```

- await 等待异步步骤，**await 只能出现在 async 内部**。(async 方法内部的异步操作）

  > 等待一个表达式的值，等待一个 promise 的决议值或者是其他值，await 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西。如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。

```js
async function some() {
  let a = (await Promise.resolve("i rejected")) + 1; // 等待一个表达式
  console.log(a);
}

async function some() {
  let a = await Promise.resolve("i rejected"); // 等待一个Promise的决议值
  console.log(a);
}

async function some() {
  let a = await 1; // 等待一个普通值
  console.log(a); // 1
}

async function some() {
  let a =
    (await 1) +
    (await new Promise((res) => {
      setTimeout(() => {
        res(100);
      }, 1000);
    }));
  console.log(a); // 101
}

async function some() {
  let a = await 1;
  let b = await new Promise((res) => {
    setTimeout(() => {
      res(100);
    }, 1000);
  });
  return a + b; // 也可以等待两个值分别结束
}

some().then((res) => {
  console.log(res); // 101
});
```

- 和辅助函数 generator runner 相同的同步错误捕获

  ```js
  function getDataWithTime(time) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (time <= 500) {
          res(time);
        } else {
          rej(new Error("too long"));
        }
      }, time);
    });
  }

  async function getData() {
    try {
      let data1 = await getDataWithTime(500);
      let data2 = await getDataWithTime(600);
      let data3 = await getDataWithTime(400);
      return data1 + data2 + data3;
    } catch (e) {
      console.log(e.message); // 我又catch到了
    }
  }

  getData().then((res) => {
    console.log(res); // too long
  });
  ```

##### 7.2 相对于 promise 有什么优势？

> 写异步代码就像再写同步代码一样轻松无负担，具体好处如下：
>
> 1. 书写习惯几乎跟同步代码一样
> 2. async 的变量是在同一个作用域中，而 promise 保存上次结果的时候需要借助数组或者是对象来保存

- async await 的写法

  ```js
  function getDataWithTime(time) {
    return new Promise((res) => {
      setTimeout(() => {
        res(time);
      }, time);
    });
  }

  async function getData() {
    let data1 = await getDataWithTime(500);
    let data2 = await getDataWithTime(600);
    let data3 = await getDataWithTime(400);
    return data1 + data2 + data3;
  }

  getData().then((res) => {
    console.log(res); //1500
  });
  ```

- promise 写法

  ```js
  function getDataWithTime(time) {
    return new Promise((res) => {
      setTimeout(() => {
        res(time);
      }, time);
    });
  }

  function getData() {
    return new Promise((res) => {
      res(getDataWithTime(500));
    })
      .then((data) => {
        return getDataWithTime([600, data]);
      })
      .then((data) => {
        return getDataWithTime([400, ...data]);
      });
  }

  getData().then((data) => {
    let result = data.reduce((pre, next) => {
      return pre + next;
    });
    console.log(result);
  });
  ```

##### 《完》
