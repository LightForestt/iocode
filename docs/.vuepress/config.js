module.exports = {
    title: " Best Programming Language ？ 😈 JAVASCRIPT",
    description: "Just learn and run",
    themeConfig: {
        sidebarDepth: 2,
        nav: [
            { text: "Home", link: "/" },
            {
                text: "JavaScript",
                items: [
                    { text: "dom/bom", link: "/frontend/javascript/dom_bom/" },
                    { text: "promise_await_async", link: "/frontend/javascript/promise_await_async/" },
                ],
            },
        ],
        sidebar: [
            ['/frontend/javascript/dom_bom/', '浏览器相关'],
            ['/frontend/javascript/dom_bom/vue_dom', '源码中用到的 dom 操作'],
            ['/frontend/javascript/promise_await_async/', '异步 - 逃离地狱'],
        ]
    },
};
