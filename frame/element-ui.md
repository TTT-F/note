## element ui

 Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库 

安装1：

```
npm i element-ui -S
```

main.js 中导入

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
//全局注册，之后所有组件都可以使用了
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

(标签使用)[ https://element.eleme.cn/#/zh-CN/component/installation]

安装2：

按需引入

```
npm install babel-plugin-component -D
```

将babel.config.js中添加

```js
 "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
```

main.js中写入

```js
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```



