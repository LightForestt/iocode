## 响应式布局原理，结论：

- 不同的分辨率使用的 dpr 不同 ，最终达到了 1px 在不同设备看起来相同的目的。 viewport 并不影响各设备的 1px 的等价关系（缩放前后各设备间的 1px 始终是相等的），造成的影响是设备上的 1px 的视觉效果大了还是小了。也就是相当于操作了 dpr（实际上大家都默认缩放比率 1，同时设置 width 为设备宽度，同时不允许缩放）。rem 以 px 为单位，以当前设备宽度为分母，以设计稿为分子，计算出设计稿与当前设备的比例，最终利用比例计算出适合当前设备的 fontsize 赋予给 html，在进行编码的时候直接使用 rem，最终，达到了响应式的目的。

## 基本概念大全

### Viewport

```html
<!-- 只对移动端生效 -->
<!-- 当设置初始缩放值为0.5时相当于css像素包含的物理像素缩小到原来的0.5 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- width：控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
- height：和 width 相对应，指定高度。
- initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
- maximum-scale：允许用户缩放到的最大比例,注意，此处放大或者缩放的比例都是相对于设备宽度。
- minimum-scale：允许用户缩放到的最小比例，同以设备宽度为基准。
- user-scalable：用户是否可以手动缩放。

```html
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
  /* 
      设置了 缩放 = 1 就相当于设置了width=device-width  同时设置两者是为了兼容性更好、要把当前的viewport宽度设为ideal viewport的宽度，既可以设置 width=device-width，也可以设置nitial-scale=1，但这两者各有一个小缺陷，就是iphone、ipad以及IE 会横竖屏不分，通通以竖屏的ideal viewport宽度为准。所以，最完美的写法应该是，两者都写上去，这样就 initial-scale=1 解决了 iphone、ipad的毛病，width=device-width则解决了IE的毛病
 
     注意：在不设置width=device-width的前提下设置缩放才会改变html尺寸                          以下尺寸均在未设置width-device-width的情况下取到
     缩放为1 各设备 HTML宽度(css px) ： 
      IP6/7/8 :375 | IP5 : 320 | IPX : 358 | IPAD : 768 | IPAD PRO : 1024
     缩放为0.5 各设备 HTML宽度(css px) ： 
      IP6/7/8 :750 | IP5 : 640 | IPX : 750 | IPAD: 1536 | IPAD PRO : 2048
     缩放为2 各设备 HTML宽度(css px) ： 
      IP6/7/8 :187 | IP5 : 160 | IPX : 187 | IPAD: 384 | IPAD PRO : 512
      
注：经过真机测试 iphone x在缩放达到1.7之上就无效了他的缩放有效范围是在(0-1.7]具体原因不得而知
故真机测试时只进行缩放系数为 0.5 | 1 | 1.5 的情况。
     */
  * {
    margin: 0;
    padding: 0;
  }
</style>
```

简单的理解，viewport 是严格等于浏览器的窗口。在桌面浏览器中，viewport 就是浏览器窗口的宽度高度。但在移动端设备上就有点复杂。
移动端的 viewport 太窄，为了能更好为 CSS 布局服务，所以提供了两个 viewport:

1. 虚拟的 viewport - visual viewport

   visual viewport 就是显示在屏幕上的网页区域。通过前面的说明你应该已经知道 visual viewport 了：它往往只显示 layout viewport 的一部分。visual viewport 就像一台摄像机，layout viewport 就像一张纸，摄像机对准纸的哪个部分，你就能看见哪个部分。你可以改变摄像机的拍摄区域大小（调整浏览器窗口大小），也可以调整摄像机的距离（调整缩放比例），这些方法都可以改变 visual viewport，但是 layout viewport 始终不变。

   **visual viewport 用 css 像素来衡量尺寸，表示有多少个 css 像素能够被用户看到。**

2. 布局的 viewport - layout viewport

   layout viewport 是网页布局的区域，它是\<html\>元素的父容器。只要你不在 css 中修改\<html\>元素的宽度，\<html\>元素的宽度就会撑满 layout viewport 的宽度。很多时候浏览器窗口没有办法显示出 layout viewport 的全貌，但是它确实是已经被加载出来了，这个时候滚动条就出现了，你需要通过滚动条来浏览 layout viewport 其他的部分。

   **layout viewport 用 css 像素来衡量尺寸，在缩放、调整浏览器窗口的时候不会改变**。**缩放、调整浏览器窗口改变的只是 visual viewport。**

### DP 物理像素

又称为设备像素。 比如 iPhone 6 的分辨率为 750 x 1334px，指设备能控制显示的最小物理单位，意指显示器上一个个的点。从屏幕在工厂生产出的那天起，它上面设备像素点就固定不变了。

### CSS 像素

1. 虚拟像素，可以理解为“直觉”像素，CSS 和 JS 使用的抽象单位，浏览器内的一切长度都是以 CSS 像素为单位的，CSS 像素的单位是 px。在 CSS 规范中，长度单位可以分为两类，绝对(absolute)单位以及相对(relative)单位。px 是一个相对单位，相对的是设备像素(device pixel)。

2. 由于不同的物理设备的物理像素的大小是不一样的，所以`css`认为浏览器应该对`css`中的像素进行调节，使得浏览器中 1css 像素的大小在不同物理设备上看上去大小总是差不多 ，目的是为了保证阅读体验一致（通过 dpr）。

- 举个例子理解 css 像素：假设我们用 PC 浏览器打开一个页面，浏览器此时的宽度为 800px，页面上同时有一个 400px 宽的块级元素容器。很明显此时块状容器应该占页面的一半。但如果我们把页面放大（通过“Ctrl 键”加上“+号键”），放大为 200%，也就是原来的两倍。此时块状容器则横向占满了整个浏览器。吊诡的是此时我们既没有调整浏览器窗口大小，也没有改变块状元素的 css 宽度，但是它看上去却变大了一倍——这是因为我们把 CSS 像素放大为了原来的两倍。
- CSS 像素 =设备独立像素 = 逻辑像素

### DPR 设备像素比

设备像素比(dpr) 是指在移动开发中 1 个 css 像素占用多少设备像素，如 2 代表 1 个 css 像素用 2x2 个设备像素来绘制。DPR(设备像素比 DevicePixelRatio) = 设备像素/CSS 像素。获得设备像素比（dpr）后，便可得知设备像素与 CSS 像素之间的比例。每个设备有默认的 dpr。

```CSS
/*
  各设备 DPR: ： IP6/7/8 :2 | IP5 : 2 | IPX : 3 | IPAD: 2 | IPAD PRO : 2
*/
```

### dip 设备独立像素

- CSS 像素 =设备独立像素 = 逻辑像素

- 在移动端浏览器中以及某些桌面浏览器中，window 对象有一个`devicePixelRatio`属性，它的官方的定义为：设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。

### dpi

每英寸多少点

### ppi

每英寸多少像素数，放到显示器上说的是每英寸多少物理像素及显示器设备的点距

- 在显示器上 dpi 等于 ppi

### 媒体查询 `@media` (响应式布局核心)

```css
/*
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
关键字：四个
and：链接查询规则
only：处理浏览器兼容问题，老浏览器不采用响应式
,:
not:
*/
@media screen and (max-width: 300px) {
  body {
    background-color: lightblue;
  }
}
@media screen {
  body {
    font-size: 13px;
  }
}

@media screen, print {
  body {
    line-height: 1.2;
  }
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (resolution: 150dpi) {
  body {
    line-height: 1.4;
  }
}
```

##### 关键字

- and：链接查询属性
- only：处理浏览器兼容问题，老浏览器不采用响应式。
- , ：连接查询规则
- not：取反

##### 媒体类型

| 值     | 描述                                 |
| :----- | :----------------------------------- |
| all    | 用于所有设备                         |
| print  | 用于打印机和打印预览                 |
| screen | 用于电脑屏幕，平板电脑，智能手机等。 |
| speech | 应用于屏幕阅读器等发声设备           |

##### 媒体属性

| 值                     | 描述                                                      |
| :--------------------- | :-------------------------------------------------------- |
| device-pixel-ratio     | css 像素比。 css 像素/物理像素。必须加 webkit 前缀。 数字 |
| max-device-pixel-ratio | css 像素比。 css 像素/物理像素。必须加 webkit 前缀。      |
| min-device-pixel-ratio | css 像素比。 css 像素/物理像素。必须加 webkit 前缀。      |
| device-height          | 定义输出设备的屏幕可见高度。\<length\>                    |
| max-device-height      | 定义输出设备的屏幕可见的最大高度。                        |
| min-device-height      | 定义输出设备的屏幕的最小可见高度。                        |
| device-width           | 定义输出设备的屏幕可见宽度。                              |
| min-device-width       | 定义输出设备的屏幕最小可见宽度。                          |
| max-device-width       | 定义输出设备的屏幕最大可见宽度。                          |
| height                 | 定义输出设备中的页面可见区域高度。                        |
| max-height             | 定义输出设备中的页面最大可见区域高度。                    |
| min-height             | 定义输出设备中的页面最小可见区域高度。                    |
| width                  | 定义输出设备中的页面可见区域宽度。                        |
| max-width              | 定义输出设备中的页面最大可见区域宽度。                    |
| min-width              | 定义输出设备中的页面最小可见区域宽度。                    |
| resolution             | 定义设备的分辨率。如：96dpi, 300dpi, 118dpcm              |
| max-resolution         | 定义设备的最大分辨率。                                    |
| min-resolution         | 定义设备的最小分辨率。                                    |
| orientation            | 屏幕方向 横屏：landscape 竖屏 portrait                    |
