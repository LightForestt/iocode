## Node 简介

## 环境配置

### Node 的安装

- 安装包安装
  - 官网下载对应的安装包
  - 一路 next
- nvm 安装(有一个类似的工具：n)
  - Node Version Manager（Node 版本管理工具）
  - 由于以后的开发工作可能会在多个 Node 版本中测试，而且 Node 的版本也比较多，所以需要这么款工具来管理

### 相关版本

- node 版本常识
  - 偶数版本为稳定版 （0.6.x ，0.8.x ，0.10.x）
  - 奇数版本为非稳定版（0.7.x ，0.9.x ，0.11.x）
  - LTS（Long Term Support）
  - [LTS 和 Current 区别](https://blog.csdn.net/u012532033/article/details/73332099)
- 操作方式：
  - 重新下载最新的安装包；
  - 覆盖安装即可；
- 问题：
  - 以前版本安装的很多全局的工具包需要重新安装
  - 无法回滚到之前的版本
  - 无法在多个版本之间切换（很多时候我们要使用特定版本）

### 常见问题

- Python 环境丢失

* Node 中有些第三方的包是以 C/C++源码的方式发布的，需要安装后编译,确保全局环境中可以使用 python 命令,python 版本推荐 2.7.0

- 环境变量丢失

* 部分电脑安装完毕之后没有环境变量需要手动配置
* Windows 中环境变量分为系统变量和用户变量
* 环境变量的变量名是不区分大小写的
* PATH 变量：只要添加到 PATH 变量中的路径，都可以在任何目录下
* 目的可以在任何地方调起 node 命令

## 模块,包 commonjs

### commonjs 规范

前端模块化：AMD,CMD,Commonjs

Node 应用由模块组成，采用 CommonJS 模块规范。

##### 定义 module

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

##### 暴露接口

CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。

```javascript
let x = 5;
let addX = function(value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
```

##### 引用

require 方法用于加载模块。

```js
let example = require("./example.js");
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

### 模块的分类

- 内置模块

```js
const process = require("process");
const path = require("path");
console.log(process.version);
console.log(path.resolve("../"));
```

- 第三方模块

```js
const request = require("request");
request.get(
  "http://api.douban.com/v2/movie/in_theaters",
  (err, response, body) => {
    if (!err) {
      // console.log(body);
      console.log(JSON.parse(body));
    } else {
      console.log(err);
    }
  }
);
```

- 自定义模块

### npm 使用入门

官网:[https://www.npmjs.com/](https://www.npmjs.com/)

安装：安装 node 后就有了

查看当前版本：

```powershell
$ npm -v
```

更新：

```powershell
$ npm install npm@latest -g

```

初始化工程

```powershell
$ npm init

$ npm init --yes 默认配置
```

安装包

使用 npm install 会读取 package.json 文件来安装模块。安装的模块分为两类
dependencies 和 devDependencies，分别对应生产环境需要的安装包和开发环境需要的安装包。

```powershell
$ npm install

$ npm install <package_name>

$ npm install <package_name> --save

$ npm install <package_name> --save-dev
```

更新模块

```powershell
$ npm update
```

卸载模块

```powershell
$ npm uninstall <package_name>

$ npm uninstall --save lodash
```

配置 npm 源

- 临时使用, 安装包的时候通过--registry 参数即可

      $ npm install express --registry https://registry.npm.taobao.org

- 全局使用
  `$ npm config set registry https://registry.npm.taobao.org // 配置后可通过下面方式来验证是否成功 npm config get registry // 或 npm info express`

### 常用的内置模块

node 常用内置 api

(1) URL 网址解析
解析 URL 相关网址信息
url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
url.format(urlObject)
url.resolve(from, to)
(2) QueryString 参数处理
querystring.escape(str)
querystring.unescape(str)
querystring.parse(str[, sep[, eq[, options]]])
querystring.stringify(obj[, sep[, eq[, options]]])
(3) HTTP 模块概要
http.createServer([options][, requestlistener])
http.get(options[, callback])
简易的爬虫
代理跨域处理
(4) 事件 events 模块
(5) 文件 fs 模块
打印目录树
(6) Stream 流模块
歌词播放
音乐下载
(8) request 方法

2、Node.js 基础应用
1、应用 HTTP 模块编写一个小爬虫工具
(1) 利用爬虫获取“拉勾网”首页列表数据
(2) 通过 npm 安装 cheerio 模块获得数据
2、后端表单的提交
要求:
(1) 应用 request post 模拟提交表单

### 文件读取

Node 中文件读取的方式主要有：

> `fs.readFile(file[, options], callback(error, data))`

```javascript
fs.readFile("c:\\demo\1.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

> fs.readFileSync(file[, options])

```javascript
try {
  const data = fs.readFileSync("c:\\demo\1.txt", "utf8");
  console.log(data);
} catch (e) {
  // 文件不存在，或者权限错误
  throw e;
}
```

> fs.createReadStream(path[, options])

```javascript
const stream = fs.createReadStream("c:\\demo\1.txt");
let data = "";
stream.on("data", (trunk) => {
  data += trunk;
});
stream.on("end", () => {
  console.log(data);
});
```

> _由于 Windows 平台下默认文件编码是 GBK，在 Node 中不支持，可以通过[iconv-lite](https://github.com/ashtuchkin/iconv-lite)解决_

### Readline 模块逐行读取文本内容

```javascript
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("sample.txt"),
});

rl.on("line", (line) => {
  console.log("Line from file:", line);
});
```

### 文件写入

Node 中文件写入的方式主要有：

> fs.writeFile(file, data[, options], callback(error))

```javascript
fs.writeFile("c:\\demoa.txt", new Date(), (error) => {
  console.log(error);
});
```

> fs.writeFileSync(file, data[, options])

```javascript
try {
  fs.writeFileSync("c:\\demoa.txt", new Date());
} catch (error) {
  // 文件夹不存在，或者权限错误
  console.log(error);
}
```

> fs.createWriteStream(path[,option])

```javascript
let streamWriter = fs.createWriteStream("c:\\demoa.txt");
setInterval(() => {
  streamWriter.write(`${new Date()}\n`, (error) => {
    console.log(error);
  });
}, 1000);
```

### node 中的异步操作

- fs 模块对文件的几乎所有操作都有同步和异步两种形式
- 例如：readFile() 和 readFileSync()
- 区别：
  - 同步调用会阻塞代码的执行，异步则不会
  - 异步调用会将读取任务下达到任务队列，直到任务执行完成才会回调
  - 异常处理方面，同步必须使用 try catch 方式，异步可以通过回调函数的第一个参数

```javascript
console.time("sync");
try {
  let data = fs.readFileSync(
    path.join("C:\\Users\\iceStone\\Downloads", "H.mp4")
  );
  // console.log(data);
} catch (error) {
  throw error;
}
console.timeEnd("sync");

console.time("async");
fs.readFile(
  path.join("C:\\Users\\iceStone\\Downloads", "H.mp4"),
  (error, data) => {
    if (error) throw error;
    // console.log(data);
  }
);
console.timeEnd("async");
```

### 路径模块

在文件操作的过程中，都必须使用物理路径（绝对路径），path 模块提供了一系列与路径相关的 API

```javascript
console.log("join用于拼接多个路径部分，并转化为正常格式");
const temp = path.join(__dirname, "..", "lyrics", "./友谊之光.lrc");
console.log(temp);

console.log("获取路径中的文件名");
console.log(path.basename(temp));

console.log("获取路径中的文件名并排除扩展名");
console.log(path.basename(temp, ".lrc"));

console.log("====================================");

console.log("获取不同操作系统的路径分隔符");
console.log(process.platform + "的分隔符为 " + path.delimiter);

console.log("一般用于分割环境变量");
console.log(process.env.PATH.split(path.delimiter));

console.log("====================================");

console.log("获取一个路径中的目录部分");
console.log(path.dirname(temp));

console.log("====================================");

console.log("获取一个路径中最后的扩展名");
console.log(path.extname(temp));

console.log("====================================");

console.log("将一个路径解析成一个对象的形式");
const pathObject = path.parse(temp);
console.log(pathObject);

console.log("====================================");

console.log("将一个路径对象再转换为一个字符串的形式");
// pathObject.name = '我终于失去了你';
pathObject.base = "我终于失去了你.lrc";
console.log(pathObject);

console.log(path.format(pathObject));

console.log("====================================");

console.log("获取一个路径是不是绝对路径");
console.log(path.isAbsolute(temp));
console.log(path.isAbsolute("../lyrics/爱的代价.lrc"));

console.log("====================================");

console.log("将一个路径转换为当前系统默认的标准格式，并解析其中的./和../");
console.log(path.normalize("c:/develop/demo\\hello/../world/./a.txt"));

console.log("====================================");

console.log("获取第二个路径相对第一个路径的相对路径");
console.log(path.relative(__dirname, temp));

console.log("====================================");

console.log("以类似命令行cd命令的方式拼接路径");
console.log(path.resolve(temp, "c:/", "./develop", "../application"));

console.log("====================================");

console.log("获取不同平台中路径的分隔符（默认）");
console.log(path.sep);

console.log("====================================");

console.log("允许在任意平台下以WIN32的方法调用PATH对象");
// console.log(path.win32);
console.log(path === path.win32);

console.log("====================================");

console.log("允许在任意平台下以POSIX的方法调用PATH对象");
console.log(path === path.posix);
```