## 关于项目

这是一个为了学习vue和webpack实现的一个todo-list demo。

### 本项目webpack的版本为4.36.1

因为教程中很多知识都比较老了，很多包现在都被弃用。为了与时俱进，我用了最新版本的webpack，并使用了官方文档推荐的新npm包，来代替已经被弃用的包，具体包的配置，请大家参考[package.json](https://github.com/carrieguo/vue.js-todolist/blob/master/package.json)

将项目克隆到本地之后，可通过以下三种方式下载项目依赖的包
1. 通过npm 命令，但是由于国内网速限制，很容易失败(在国外或者有VPN的同学可以使用)
```sh
npm install
```
2. 通过cnpm命令, 需要安装淘宝镜像 http://npm.taobao.org/ 
```sh
cnpm install
```
3. yarn (推荐使用yarn,需要先安装yarn https://yarnpkg.com/lang/zh-hans/docs/install/#windows-stable)
```sh
yarn
```

运行命令
```sh
npm run dev
```

如果遇到问题，欢迎给我留言。


以下是我的学习笔记，欢迎大家参考：

# vue

vue相对于react，使用起来会更简单，因为vuex, vue router都是官方在维护，比react第三方维护要好很多。
### 学习目标
1. 重点学习核心实用方法
2. 配置开发时前端工程
3. webpack优化配置,网络优化，减少http请求，压缩静态资源文件，实用浏览器的长缓存让应用的流量变小，加快加载速度。

### 前端的价值：
学习一门技术，考虑工程化问题，
1. 搭建前端工程
2. 网络优化 http的理解，缓存http请求
3. API定制，前后端分离之后，与后端的交流借助于api接口
4. nodejs层 前端工程的搭建，基本上都是围绕nodejs, webpack, grunt, gulp 工具都是在nodejs环境中去运行；很多公司在前端和后端的api层之间加一个node js层，用node做转发或数据处理。

### 作为初学者要了解vue架构，自己手动搭建项目
因为vue-cli生成的项目，没有办法直接投入到生产环境中，它是一个广泛适用的模板，不同的项目有不同的定制需求，vue-cli是基于webpack的前端工程。

webpack 用于打包前端资源, 前端资源有很多不同的类型 js, css, img, font 通过http请求加载，开发webapp时都是一整个js加载到浏览器端之后再把所有的内容渲染出来，很多时候都可以以js文件作为入口
vscode 打开命令行 ctrl+`

### 目录结构
```
vue todo project
│   README.md
│   package.json
|   package-lock.json   
|   webpack.config.json 
|   yarn.lock
|   .babelrc
|   .gitignore
│
└───dist
│     bundle.js
│   
└───node_modules
|     
|
└───src
    |   app.vue
    │   index.js
    |
    └───assests
        │   
        └───images
        │       a.jpg
        │       b.jpg
        └───styles
        |       a.css
        |       style.styl
        └────todo
                footer.jsx
                header.vue
                item.vue
                tabs.vue
                todo.vue
```

### 初始化项目
```sh
npm init 
```
### 安装依赖包
```sh
npm install webpack vue vue-loader
```
`WARN 提示， vue-loader需要peer第三方依赖 css-loader vue-template-compiler`
```sh
npm install css-loader vue-template-compiler
```

### `app.vue`
```js
//.vue文件是vue的开发方式，位于根目录src文件夹下
//vue要显示出来的模板
<template>
  <div id="test">{{text}}</div>
</template>

//控制显示内容如何变化
<script>
  export default {
    data() {
      return {
        text: 'abc'
      }
    }
  }
</script>

<style>
  #test {
    color: red;
  }
</style>
```

### `index.js 入口文件` 
```js
import Vue from 'vue';
import App from './app.vue';

import './assests/styles/test.css';
import './assests/image/bg.jpeg'

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  render: (h) => h(App)
}).$mount(root)
```

### `webpack.config.js`
```js
const path = require('path');

module.exports = {
  target: 'web',
  //入口， __dirname 是当前文件所在目录
  entry: path.join(__dirname, 'src/index.js'),
  //输出
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist');
  },
  //webpack原生只支持js文件类型，只支持ES5语法，我们使用以.vue文件名结尾的文件时，需要为其指定loader
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      //将css写入到HTML
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      //将小于1024d的图片转为base64，减少http请求
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024，
              name: '[name].[ext]'
            }
          }
          ]
      }
    ]
  }
}


```

### `安装相应的loader, url-loader 依赖 file-loader`
```sh 
npm i style-loader url-loader file-loader
```

### `package.json`
```json
//调用项目下的webpack， 如果不设置，运行webpack命令会调用全局环境的webpack
"scripts": {
  "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
  "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
}
```

```sh
npm run build
```

webpack 帮我们 生成一个dist目录，里面生成 bundle.js，前端项目希望把一些零碎的js打包到一起，减少http请求。使用模块依赖，可复用。

webpack 配置中需要添加 Vue Loader 的插件
参考 https://vue-loader.vuejs.org/zh/guide/#vue-cli

## webpack-dev-server cross-env 
webpack-dev-server 是一个webpack的包
cross-env 在不同的环境上设置不同的环境变量不一样，cross-env解决了这个问题
`安装`

```sh
npm install webpack-dev-server
npm install cross-env
```

## html-webpack-plugin


## vue2

`数据绑定框架`    将js数据绑定到html中

`vue文件开发方式`   vue是一个组件化的框架。react有jsx,它很好的处理了在JavaScript中去书写HTML，html是通过render方法动态生成的，每次数据变化都回去执行render方法。vue对jsx支持不好，所以自创了这种.vue文件，直观，方便

`render方法`  组件中有数据变化，都会重新执行render方法，产生新的HTML，并更新。
.vue 文件中的`<template>`转化成js中的render方法，render方法中的`createElement()`方法会一层层的遍历template中的标签，属性，值，以这样的方式创建一个个的节点，最终得到组件树。

## VUE2 API重点
生命周期方法
computed 是对reactive的深度使用。 vue是一个reactive的框架，reactive是指声明好的一些数据一旦去改动，会影响到依赖于这些数据的地方，比如template中依赖于data里的数据。
computed是指我们在一个组件中声明了一个对象个体具有姓和名两个属性，输出内容为姓名，我们不想在template中做字符串拼接，我们可以声明computed方法，return 姓+名，一旦用户输入姓或者名，computed会重新进行计算，得到一个新的值，我们的template里面只需要直接调用这个值就可以了，不用去执行方法。

## 配置VUE的jsx写法以及postcss
```sh
npm i post-css-loader autoprefixer babel-loader babel-loader 
```
有些依赖需要自己装

根目录下新建 .babelrc 和 postcss.config.js

## 关于 Babel Plugin 和 Babel Preset

Babel插件一般尽可能拆成小的力度，开发者可以按需引进。比如对ES6转ES5的功能，Babel官方拆成了20+个插件。

这样的好处显而易见，既提高了性能，也提高了扩展性。比如开发者想要体验ES6的箭头函数特性，那他只需要引入transform-es2015-arrow-functions插件就可以，而不是加载ES6全家桶。

但很多时候，逐个插件引入的效率比较低下。比如在项目开发中，开发者想要将所有ES6的代码转成ES5，插件逐个引入的方式令人抓狂，不单费力，而且容易出错。

这个时候，可以采用Babel Preset。

可以简单的把Babel Preset视为Babel Plugin的集合。比如babel-preset-es2015就包含了所有跟ES6转换有关的插件。

可以同时使用多个Plugin和Preset，此时，它们的执行顺序非常重要。

先执行完所有Plugin，再执行Preset。

多个Plugin，按照声明次序顺序执行。

多个Preset，按照声明次序逆序执行。

比如.babelrc配置如下，那么执行的顺序为：

Plugin：transform-react-jsx、transform-async-to-generator

Preset：es2016、es2015

```js
{
  "plugins": [ 
    "transform-react-jsx",
    "transform-async-to-generator"
  ],
  "presets": [ 
    "es2015",
    "es2016"    
  ]
}
```

footer 使用了jsx, jsx在JS中写HTML，可以进行任意js计算，更开放。
vue结构更清晰。

## todo 应用的业务逻辑

在试用vue和react框架进行业务开发时，尽量把顶层数据声明在集中的地方，便于管理数据

### 父子组件的数据交互

父组件通过props传给子组件，子组件通过触发事件的方式告诉父组件，要进行什么操作。在vue里有很多方法，我们可以在props声明一个方法，然后父组件通过props把对应的delete方法传给子组件，然后子组件触发delete事件，调用父组件的delete方法。另外一种现在更流行的方法就是，`this.$emit`,父组件会监听所有子组件触发的事件，一旦触发这个事件，父组件就可以通过`@del`做相应的操作。在vue中，组件内实现的任何事件触发的一个操作，在父组件内都能通过`@(v-on)`方式监听，实现了父子组件的解耦

### 数据

尽量把所有的数据操作放到顶层，数据在哪里声明，就在哪里操作，不要在子组件操作父组件的数据。

## 项目优化

### webpack配置css单独分离打包
项目打包之后一些css也在bundle.js中加载，这样会影响加载速度，我们将css单独分离打包.

extract-text-webpack-plugin 已经被弃用，我们用`mini-css-extract-plugin`。
```sh
npm install --save-dev mini-css-extract-plugin
```
`mini-css-extract-plugin` [链接](https://github.com/webpack-contrib/mini-css-extract-plugin)

从4.0版本开始CommonsChunkPlugin被移除且被optimization.splitChunks和optimization.runtimeChunk配置项代替.

## 总结

构建工具 `webpack` 现在的前端开发基本上很多框架都会配合webpack一起使用

> * `vue` 的 `vue-loader` 适用 `.vue`文件的开发模式
> * `vue` 和 `react` 的 `babel-loader` 适用 `jsx`语法
> * 处理静态资源，加`hash`后缀，提供浏览器长缓存，合理更新浏览器缓存
> * 文件打包，合并，压缩
> * 强大的loader体系和plugin体系

vue 开发已经离不开webpack,前端开发不仅仅是业务开发,学习vue不仅仅是api,要学习整个vue生态环境， vue-router, vuex, 组件开发，webpack配置。

`vue`渲染过程，通过`jsx`可以更好的了解vue的渲染过程。每次调用`render()`方法，才能得到真正想要的结果。`.vue`文件的template部分最终是用`vue-loader`解析成`render()`方法，然后放到对象中，每次vue里面有数据更新时，都会重新去调用`render()`方法，生成新的HTML结构，插入到DOM结构中。

github 中搜关键词
`start-kit`, `best-practice` 可以搜到很多围绕一个框架搭建完整的工程