module.exports = {
  title: " Best Programming Language ？ 😈 JAVASCRIPT",
  description: "Just learn and run",
  themeConfig: {
    sidebarDepth: 2,
    sidebar: [
      {
        title: "frontend",
        children: [
          {
            title: "javascript",
            children: [
              [
                "/frontend/javascript/promise_await_async/",
                "promise的前世今生",
              ],
              ["/frontend/javascript/regex", "正则表达式"],
              ["/frontend/javascript/base", "js基础"],
            ],
          },
          //   {
          //     title: "html",
          //     children: [
          //       ["/frontend/browser/dom_bom/", "基本 dom bom 操作"],
          //       ["/frontend/browser/dom_bom/vue_dom", "源码中用到的 dom 操作"],
          //     ],
          //   },
          {
            title: "css",
            children: [
              ["/frontend/css/base_css_html/", "css 常用基础知识"],
              ["/frontend/css/css_preprocesser/less", "less"],
              {
                path: "/frontend/css/css_preprocesser/stylus",
                title: "stylus",
                sidebarDepth: 1,
              },
            ],
          },
          {
            title: "browser",
            children: [
              ["/frontend/browser/dom_bom/", "基本 dom bom 操作"],
              ["/frontend/browser/dom_bom/vue_dom", "源码中用到的 dom 操作"],
            ],
          },
          {
            title: "typescript",
            children: [["/frontend/typescript/", "typescript 基础"]],
          },
          //   {
          //     title: "build_tools",
          //     children: [

          //     ],
          //   },
          //   {
          //     title: "native",
          //     children: [
          //     ],
          //   },
          {
            title: "nodejs",
            children: [
              ["/frontend/nodejs/", "node 基础知识"],
              ["/frontend/nodejs/express", "express 基础知识"],
              ["/frontend/nodejs/nvm", "nvm 版本控制"],
            ],
          },
          {
            title: "vuejs",
            children: [
              ["/frontend/vue_vuex_vue-router_nuxt/vcode/1", "new vue()之前都发生了什么？（一）"],
              ["/frontend/vue_vuex_vue-router_nuxt/vcode/2", "new Vue(options) 中的options合并处理（二）"],
              ["/frontend/vue_vuex_vue-router_nuxt/vcode/3", "在new Vue(options)中是如何为options进行初始化（三）"],
              ["/frontend/vue_vuex_vue-router_nuxt/vcode/4", "initState与响应式原理（四）"],
              ["/frontend/vue_vuex_vue-router_nuxt/vcode/5", "从$mount到虚拟dom（五）"],
              [
                "/frontend/vue_vuex_vue-router_nuxt/vcode/diff",
                "diff 源码 注释版",
              ],
            ],
          },
          //   {
          //     title: "reactjs",
          //     children: [

          //     ],
          //   },
        ],
      },
    //   {
    //     title: "backend",
    //     children: [
    //       {
    //         title: "mysql",
    //         children: [],
    //       },
    //     ],
    //   },
    //   {
    //     title: "basic",
    //     children: [
    //       {
    //         title: "浏览器相关",
    //         children: [
             
    //         ],
    //       },
    //     ],
    //   },
    ],
  },
};
