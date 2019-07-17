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

`目录结构`
```
vue project
│   README.md
│   package.json
|   package-lock.json   
|   webpack.config.json 
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
```

`初始化项目`
```sh
npm init 
```
`安装依赖包`
```sh
npm install webpack vue vue-loader
```
`WARN 提示， vue-loader需要peer第三方依赖 css-loader vue-template-compiler`
```sh
npm install css-loader vue-template-compiler
```

`app.vue`
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

`index.js 入口文件` 
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

`webpack.config.js`
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

`安装相应的loader, url-loader 依赖 file-loader`
```sh 
npm i style-loader url-loader file-loader
```

`package.json`
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