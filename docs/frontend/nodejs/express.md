## express 搭建服务器

```js
const express = require("express");
//获取 app 对象
const app = express();
//监听post 接口
app.post("/user/getData", (req, res) => {
  req.body;
  res.send("test post");
});
// 监听get 接口
app.get("/user/login", (req, res) => {
  res.send({
    code: "0",
    data: {
      value: "get value",
    },
  });
});
//监听10010 端口
app.listen(10010, () => {
  console.log("start");
});
```

## express 路由

```js
//server.js
//服务器中引入路由  采用use中间件的方式
//引入路由会截取'/user'
const route_1 = require("./router");
app.use("/user", route_1);

//router.js
//路由中截取剩余path
const express = require("express");
//获取路由实例
const router = express.Router();
router.get("/get1", (req, res) => {
  res.send("get");
});
router.post("/post2", (req, res) => {
  res.send("post");
});

module.exports = router;
```

## middlewear 中间件

- 自定义中间件

  1. 全局中间件

  ```js
  // 全局中间件 所有的接口都会先走这个中间件
  app.use((req, res, next) => {
    let { token } = req.query;
    if (token) {
      next(); // 是否继续往下执行  类似axios拦截器 必须return 不然拦截
    } else {
      res.send("需要token");
    }
  });
  ```

  2. 局部中间件

  ```js
  // 局部中间件 写在接口中的中间件
  app.get(
    "/test1",
    (req, res, next) => {
      let { password } = req.query;
      if (password) {
        next(); // 是否继续往下执行  类似axios拦截器 必须return 不然拦截
      } else {
        res.send("需要 password");
      }
    },
    (req, res) => {
      res.send("connecting");
    }
  );
  ```

- 内置 static 中间件

  ```js
  //制定一个绝对路径
  let root = path.join(__dirname, "./static");
  let root2 = path.join(__dirname, "./static");
  //内置static中间件 也就是静态资源目录 制定一个目录
  app.use("/public", express.static(root));
  app.use("/public2", express.static(root2));
  //express.static(root2) 特定url指定静态目录
  //前端访问静态资源的时候就需要在路径上添加use的第一个参数后边跟上静态资源名称
  ```
