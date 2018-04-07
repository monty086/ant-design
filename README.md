

## 安装

create-react-app  myapp

## 打开配置文件【不可逆】

npm run eject

## 模块安装

yarn add less less-loader antd babel-plugin-import axios react-router-dom

## 文件配置

webpack.config.dev.js

js模块
```js
plugins:[
     ['import',[{ libraryName: "antd", style: true }]]
],

```
less模块
跟css模块一样，只显示修改地方
```js

use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
...

{
      loader: require.resolve('less-loader'),
      options: {
        modifyVars:{ //默认样式修改
          "@primary-color":"#1DA57A"
        },
        javascriptEnabled: true
      }
}
```

webpack.config.prod.js配置和dev配置一样 





