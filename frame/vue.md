### vue 框架

使用 vue 开发项目之前，需要安装 vue 的开发环境。官方网站提供了安装环境的脚手架工具 vue-cli。使用命令 `npm install -g @vue/cli` 全局安装脚手架工具。工具安装好之后就可以搭建 vue 的开发环境了。有两种搭建方式。

- 第一种：vue create 命令，在想要创建项目的文件夹下执行 `vue create pro-name`.
- 第二种：图形化界面工具。任意位置执行`vue ui` 在浏览器中调出图形化界面，创建 vue 项目。
  - 选择上方的创建按钮
  - 选好小项目所要创建的位置
  - 选择默认的预设模板
  - 创建
  - 创建完成后，选择任务--->serve-->运行-->启动 app
  - 此时 vue 基础项目建成

#### vue 初始项目结构

- node_modules 该项目是依赖包的存放位置
- .gitignore 作为 github 仓库忽略上传的记录
- package.json 记录了 node 项目的基本配置，和一些 vue 项目的基本配置- package-lock.json 详细记录项目所用到的包
- README.md 项目介绍 文件
- public 该文件下存在的是项目的 html 模板，意思就是自己所有的 vue 代码其实都是以改模板为基础的，一般不需要修改，偶尔可能会引入一些文件(css js 等工具类的)
- babel.config.js babel 的配置文件，babel 是一个 js 编译工具，作用是编译新版本的 js 语法。
- src 文件夹是 vue 项目的源代码
  - assets 存储静态文件的文件夹，一般存放一些公共的 css 图片等
  - components 存放 vue 组件的，文件夹名称可以更改
  - app.vue 该文件就是 vue 的最外层组件
  - main.js 该项目的入口文件， webpack 会将该文件打包编译。该文件里写的是 vue 的一些全局设置。

#### spa 单页面应用

vue 项目创建的就是单页面应用。整个项目就在一个页面内。参考文档[单页面]((https://www.jianshu.com/p/0c32c85c668b)

#### vue 基础

##### 组件

整个 vue 项目是由各种组件组成的。组件可以理解成我们原来排版的某一结构部分。app.vue 组件是项目的外层结构。
在 vue 项目中，最简单组件写法是以 vue 为后缀名的文件，组件名称一般首字母大写，多个字母使用大驼峰方式命名。
划分组件===之前的画盒子
组件的构成：

- html 部分，使用 template 标签标示，里面写 html 代码就行，也可以嵌入其他组件，需要注意的就是 template 只能有一个子级(孙子级可以好多)
- script 组件的 js 部分。自己页面的逻辑处理，其他组件的注册。
- style 组件的 css 部分，默认的样式是全局的。

##### 整理初始项目(删除一些内容)，写 Hello world

App.vue 里只写

```vue
<template>
  <div id="app">Hello world</div>
</template>

<script>
// 在组件中必须
// vue 组件必须导出一个对象，且必须设置属性name ，属性值可以和组件名(也可以叫别的名字，但是不能和html标签名一样)

export default {
  name: "App",
};
</script>

<style></style>
```

##### 组件样式

组件的样式是全局的，引进来的其他组件里如果有同名的标签也受到影响

- 所以用 `scoped` 给这个 style 里的所有标签名添加一个唯一的编号(style 所有标签编号都是一样的,都添加了同一个属性选择器)，这样可以区分不同组件的样式了，使样式变成局部
- - 在 style 标签上加上 lang 属性，可以设置使用高级 css 扩展语法(less sass)

```css
<style scoped>
    .box{
      width: 200px;
      height: 200px;
      background-color: red;
      }
</style>
```

##### 组件嵌套

组件都放在 components 里面

- 父组件中导入子组件
- 在父组件的导出对象中使用 components 注册子组件

```js
import HelloWorld from "./components/HelloWorld";
// vue 组件必须导出一个对象，且属性name 为文件名，不需要导出任何也得有name 因为组件注册
export default {
  name: "App",
  // 组件注册 components
  components: {
    // HelloWorld:HelloWorld,
    HelloWorld,
  },
};
```

- 在父组件的 template 内引入 子组件的标签

```
<HelloWorld></HelloWorld>
```

##### 标签初始化（全局）

- 一般来说整个项目的整体初始化是不用来特地写的
- 也不会用\*来表整体，一般用 body
- 个别标签的初始化需在组件内完成
- 导入：因为 main.js 是入口，所以要在 main.js 中导入 `import './components/style.css'` 导入全局的 css

##### 组件的复用技巧 props

基础的 prop 使用
当一个组件需要在很多个组件内使用，并且根据需要对组件进行轻微改动的。其实可以借用 vue 的 props 处理。
props 使用

- 在父组件的标签内，直接自定义属性 传递

```html
<!-- <Button color='red' text="确定"></Button> -->
<button ele="warnng" :isActive="true" text="确定"></button>
```

- 在子组件中接受，接收时 template 部分

  - 标签文本处（标签中间）要用{{}}接收时
  - 接收的是设置属性的，用 `v-bind:` or `:`

```html
<!-- 两种添加color的方法 -->
<!-- <button :style="`background-color:${color}`">{{text}}</button> -->
<button :title="ele" v-bind:class='`btn ${isActive?"color":""}`'>
  {{text}}
</button>
<!-- 因为这是一个运算符，拆开就不对了 ${}中可以放运算符，或者值 -->
```

- 子组件的 script 部分 props 属性书写方法(两种方式)
  - 数组形式
  ```js
  export default {
    name: "Button",
    props: ["text", "color"],
  };
  ```
  - 对象形式(向对于数组形式的，多了校验)

```js
export default {
  name: "Button",
  // 数组形式
  // props:['text','color']
  // 对象形式
  props: {
    //text:String 可以只验证数据类型
    //text:[String,Number] 可以验证多个数据类型
    text: {
      // 可以设置类型
      type: String,
      // 设置默认值
      default: "按钮", //可以不设置传来的值
      //require:true
      //必须设置传过来的值，当它为true时和 default有冲突
    },
    isActive: {
      type: Boolean,
      default: false,
    },

    ele: {
      type: String,
      default: "success",
      // 可以自定义匹配校验
      validator: function (ele) {
        // 这里的ele,指的是父组件传来的
        // return 这里可以自定义，符合条件返回true 然后title就会使用传来的，不符合条件返回false console面板会报错，但是title还是会使用错误的
        return ["success", "warning", "danger"].indexOf(ele) !== -1;
      },
    },
  },
};
```

##### vue 的模板语法

在 template 中嵌入 js
分为两大类

- 在标签的尖括号之间使用 ，用双花括号{{}}
- 在标签的属性内使用,需要使用 vue 指令 `v-bind` 也可以直接省略使用 `:`

##### vue 组件的 data

**之前想要修改的话，都要获取原生的真是 dom 节点，那真正的 dom 节点修改的话会影响浏览器整个页面的重排和重排。vue 这种方法是拿到虚拟的 dom 节点 这样就不会影响整个页面了**

只要是组件的 HTML 内容（结构、样式等）发生改变的话，那么这个改变必须要 data 内的某个数据控制。
使用方法

- 需要将变化对应的内容设为 data

```js
  export default {
   name: 'App',
   data: function () {
     return {
       bgColor: 'red',
     }
   },
   ...
```

- data 的使用
- 在 template 中直接当变量，使用模板语法写到标签内即可
- 在 script 内使用 要用`this.名字`访问
- data 修改
  - 在 script 中使用 `this.name` 常用的
  - 在 template 中的函数内直接对 data 赋值即可
- 注意在实现功能是 data 的个数尽可能的少(因为定义一个 data，vue 就要针对这个 data 做一套虚拟的 dom 流程，有几个就做机会，所以越少运行速度越快)

  ###### data 只能在自己的组件内使用 `this.name` 修改，想要让其他人修改自己组件 data，那么需要在自己组件内定义好修改的方法，然后将该方法传递给其他组件执行

  ##### vue 组件内的事件绑定

  绑定事件：
  直接使用 v-on 指令绑定事件，也可以简写成 @

  - 所有 vue 指令内''引起来的都是 js 要想写字符需加引号 或 模板字符串
  - @事件名='事件函数' 这个事件函数可以使 methods 里面写好的，也可以是直接在这里写的函数

  ```html
  <br /><span>成绩:{{score}}</span><br />
  <!-- 方式1 -->
  <button @click="editScore">修改成绩</button>
  <!-- 方式2 -->
  <!-- <button @click="editScore(10)">修改成绩</button> 
      可以传参 这种的函数有返回值的，如果函数体内没有写return 则默认返回undefined-->
  <!-- 方式3 -->
  <!-- <button @click="()=>this.score=10">修改成绩</button>  这种不用methods了-->
  <!-- 方式4 是方法3的简化，但是只有写data操作时才可以简化 -->
  <!-- <button @click="score=10">修改成绩</button> 这种只适用于只对score操作，一条-->
  ```

  ````
  editScore 是一个函数名，该函数必须声明在组件导出的对象下的methods 属性内，注意的真是 template 内使用时直接使用方法名，而在 script 中使用的时候需要使用 `this.方法名`
  ​```js
    export default {
  name:'Header',
  components:{
      Button,
  },
  data:function (){
      return{
          score:100
      }
  },
  //methods 一般只能用普通函数，因为要用到 this
  methods:{
    //在这里面的函数可以比当做事件函数，也可以被当做普普通通的函数
      editScore(){
          this.score=10
         // this.score 指向的是组件实例本身
          //this 指向的是 VueComponent(组件实例)，可以通过this访问 data props等等

      }
  }
  ````

}

````
- event方式 拿事件函数
    - 因为直接传参有返回值，可以借助使用event方式，其实不加也可以，加上应该是更规范

​```html
<!-- 1、 -->
        <button @click="function(event){editScore(10,event)}">修改成绩</button>
        <!-- 2、 -->
        <button @click="function(){editScore(10)}">修改成绩</button>


````

```js
//1.
methods:{
        editScore(value,event){
            this.score=value
            console.log(event)

        }
  // 2.
   editScore(value){
            this.score=value
            console.log(event)

        }
```

##### 组件之间的通信

- 组件标签属性：1.props 2.自定义事件
- 父子组件
- 使用 props , props 一般用来传递值，也可以传递函数（一般不使用）

```html
<!-- 不推荐这样传函数 -->
<button :x="change" text="0" />
```

- 自定义事件，向子组件传递函数
  使用 v-on 传递函数 该做法称为自定义事件 ，事件名随便定义
  - 1.可以在子组件调用父组件函数时将参数传到父组件，

```html
<!-- 父组件 template 部分 -->
<button :isActive="ind === 0" @change="change(0)" text="0" />
<!-- 子组件 template 部分 -->
<button :class="isActive ? 'active' : ''" @click="handleClick"></button>
```

```js
//  子组件 method 中
methods: {
   handleClick() {
     // 调用父组件的自定义事件并传参
     this.$emit("change",4);
   }
 }
```

- 2.也可以在父组件就将参数传到子组件然后子组件接收调用函数

```html
<!-- 父组件 template 部分 -->
<button :isActive="ind === 0" @change="change(0)" text="0" />
<!-- 子组件 template 部分 -->
<button :class="isActive ? 'active' : ''" @click="handleClick"></button>
```

```js
//  子组件 method 中
methods: {
   handleClick() {
     // 传参的方式可以在父组件内直接传递也可以在子组件内传递
     this.$emit("change");
   }
 }
```

###### 若兄弟组件之间想要进行通讯，应该把所需 data 数据放到他们的父组件中。然后在父组件中进行操作

###### 事件修饰符 @事件.native 将原生事件绑定到组件上

给组件的根元素的 dom 节点绑定事件，可以将它归为自定义事件
在给嵌套的组件加事件是直接加不上的，加上他就可以了

```html
<li
  @mouseenter.native="()=>{getIndex(0)}"
  :isActive="change[0].active"
  text="绽灵花开之礼"
></li>
```

##### 列表渲染

将数组类型的数据循环渲染到页面上
使用 `v-for` 指令，必须加上 `key` 属性，改属性的属性值在当前的 for 内必须**唯一**

```html
<ul>
      <!-- data 中有 arr 数组 -->
      <li v-for="ele in arr" :key="ele">
        <span> {{ ele }} </span>
      </li>
    </ul>
    <ul>
    <!-- data 中没有数组，如果想获取索引值 要写（） 名字随便 -->
      <li v-for="(item, index) in 5" :key="item">{{ item }} --- {{ index }}</li>
    </ul>
  </div>
```

用在组件嵌套上

```html
<button
  v-for="(item, index) in 5"
  :key="index"
  @change="change(index)"
  :isActive="ind === index"
  :text="textList[index]"
>
  <button></button>
</button>
```

###### 图片的 src 地址如果写成 js 相关的值的形式，那么图不会解析在浏览器上，解决办法：1.将图片换成网络地址 2.将 js 生成的图片地址使用 require(地址)这个是在 JavaScript 标签内使用

##### style 和 class 绑定（样式的处理）

以前添加样式，需要判断一下
如：

```
更改行内样式：
<div :style="`background-color: ${isActive ? '#00b3d4' : '#ccc'}`" ></div>
   添加class形式：
    <div :class="`box ${isActive ? 'active' : ''}`"></div>
```

官方提供的更改样式

- 更改行内样式
  - 1.style 对象表示法 与 jq 中的 css 方法修改多个样式类似
  ```
   <div
      class="box"
      :style="{ 'background-color': isA ? '#ccc' : '#333' }"
    ></div>
  ```
  - 2. style 数组表示法 不推荐 麻烦
- class 形式
  - 对象表示法
  - 还有一些别的 详情 vue 官网

```
 <div :class="{ box: true, active: isA }"></div>
```

- 数组表示法

```
<div :class="['box', isActive ? 'active' : '']"></div>
```

- 数组和对象嵌套表示

```
 <div :class="['box', { active: isA }]"></div>
```

##### 表单输入绑定

vue 框架 只要页面有改变，都要通过 data 使用虚拟 dom

- 以前的用法
  将 username 设置成输入的值
  如何获取输入的内容
  先获取真实 dom 节点 event.target
  this.username = event.target.value;
  **可以使用 v-model 对表单中的`<input>`、`<select>`、`<textarea>`元素上创建双向数据绑定**
  `v-model 会自动找到data中对应的数据进行判断`
  双向数据绑定:data 中的数据改变，input 显示的内容跟着改变；input 中输入数据，data 中的数据也改变
  详情：vue-form 文件夹

- input:text|password|textarea

```
<!-- password 和 textarea 一样 -->
 用户名<input type="text" value="username" v-model="username" /><br />
 <!-- 这里面的value 最好要加上且和v-model中的名字一致 因为有些框架不加会有限制 -->
  <!-- change事件当状态发生改变触发，change事件对于这些文本框相当于blur事件 -->
    <!-- 文本框使用input事件 域触发时改变 -->
```

- 复选框

  - 单一复选框

  ```
    <input type="checkbox" v-model="isChecked" />
  ```

  - 组复选框
    _与单一不同的是：data 中是数组，且标签中要写 value，value 的值要和数组中的数据一一对应，v-model 直接等于数组名，它会自动根据 value 的值判断_

  ```
  <!-- template 部分 -->
  <h3>喜欢的英雄：</h3>
    虞姬<input type="checkbox" v-model="likeHeros" value="虞姬" />
    <br />
    孙尚香<input type="checkbox" v-model="likeHeros" value="孙尚香" />
    <br />
    小乔<input type="checkbox" v-model="likeHeros" value="小乔" />
    <br />
    吕布<input type="checkbox" v-model="likeHeros" value="吕布" />
  ```

  ```js
   data() {
    return {
      username: "lily",
      password: "",
      textarea: "hahahaha",
      isChecked: true,
      likeHeros: ["小乔", "吕布"],
    };
  ```

  - 单选按钮 radio

  ```
   <input type="radio" v-model="sex" value="男" />男
    <input type="radio" v-model="sex" value="女" />女
    <!-- value必须有和sex的值一致 -->
  ```

  - select 选择框

  ```
  <select v-model="words">
      <option value="a">a</option>
      <option value="b">b</option>
      <option value="c">c</option>
      <option value="d">d</option>
    </select>
    v-model认准value，value一定有
  ```

  ###### 表单的修饰符 给 v-model 指令使用的

  - .lazy v-model.lazy='xxx' 懒加载，在文本框类 ，而加上了 lazy 之后使用的就是 change 事件，是失去焦点在修改 data 视为失去焦点触发
  - .number 将相关 data 转为数字，文本框默认输入是字符串，想要得到数字就加上它 v-model.number='xxx'
  - .trim 去掉左右的空格 v-model.trim='xx'

##### vue 组件的计算属性 computed

想要对现有的 data 进行数据操作之后展示在页面上或者使用函数操作之后返回想要的值，可以将这些操作写成一个函数放在 computed 中，**返回值** **不可传参**
好处：有缓存，可以不用添加 data 了。用法和 data 一样

**可以计算 vue 实例中的很多属性，不是单单只对 data props**

```js
// 计算属性就是一个函数，该函数必须返回一个值，这个值就是计算属性
computed: {
    typeList() {
      return this.arr.reduce((res, item) => {
        if (!res.includes(item.category)) {
          res.push(item.category);
        }
        return res;
      }, []);
    }
  },


```

- 计算属性默认是 get 方法 可以给他加 setter 来更改数据来源的数据 详细**vue-ohters**

```html
<h2>计算属性的 setter</h2>
<div>
  姓: <input type="text" v-model.lazy="firstName" /> <br />
  名: <input type="text" v-model.lazy="lastName" /> <br />
  <!-- 计算属性时不可以被直接修改的 当你使用了 v-model 指令的时候，输入内容是 fullName 就会发生改变 -->
  <!-- 当你想要对计算属性直接修改的时候需要给计算属性设置 setter -->
  全称是: <input type="text" v-model.lazy="fullName" />
</div>
```

```js
 data() {
    return {
      firstName: "张",
      lastName: "三儿",

    };
  },
  computed: {
   fullName: {
     get() {
       return this.firstName + " " + this.lastName;
     },
     set(newValue) {
       // newValue 代表新的计算属性 或者叫更改之后的计算属性
       // setter 用来修改计算属性的来源 data 的

       this.firstName = newValue.split(" ")[0];
       this.lastName = newValue.split(" ")[1];
     },
   },
 },
```

##### vue 中的 watch 侦听器

当计算属性需要异步操作来计算时，但计算属性需直接返回，不可异步，则 watch 可以做这些操作

**可以计算 vue 实例中的很多属性，不是单单只对 data props**

```html
  <h2>watch 侦听器</h2>
   qustion: <input type="text" v-model.lazy="question" /><br />
   <!-- 当你将 answer 设置成计算属性的时候，answer 只能设置成同步函数获取，加不了异步操作 -->
   <!-- 那么就只能再设置一个 data 使用失去焦点事件去发送异步请求获取答案修改 data -->
   <!-- 针对于很平凡的操作修改data vue 提供了一个 watch 方法 -->
   anwser: <span>{{ answer }}</span>
 </div>
```

```js
  data() {
   return {
     answer: "请输入一个问题",
     question: "111",
   };
 },
//  watch可异步操作
  // handler() 监听对象发生变化时执行
  // immediate 进入页面初始化时执行一次
  // deep 为了发现监听对象内部值的变化 deep：true
   watch: {
    //  这里是监听谁就写谁的名字，这个question是data
   question() {
     // 监听 question 修改 answer
       handler() {
     // 当 question 发生变化是就会执行
     console.log("哈哈哈");
     if (this.question) {
       setTimeout(() => {
         // 向后台获取答案
         this.answer = Math.random();
       }, 100);
     }
       },
     // 进入页面就执行一次
       immediate: true,
   },
 },
```

##### vue 组件的 ref

用途：用来获取一个元素的真实 dom 节点，不用于修改
获取 dom 节点方法：原生、借助插件（还没讲）、ref

```html
<button ref="btnDom"></button>
```

```js
this.$refs.btnDom;
// 就是获取了 button 的原生 dom
```

- ref 可以用在组件上，这样就是获取该组件实例，进而可以获取组件内所有内容。可以实现父子组件之间的交互。

##### 组件中的 this

组件内使用 this 其实就是想要使用该组件下的 data props methods computed 自定义事件 ref ... 组件中的 this 通常指向 该组件实例

- 异步操作：
  - 异步中使用普通函数，在普通函数的 this 就是内作用域，谁调用 this 就是谁。
  - 异步中使用箭头函数， 在箭头函数中的 this 指向的是 组件实例，因为函数函数声明时，this 已经绑定了-->组件实例
- methods 将函数设置成普通函数，该函数的根作用域下的 this 就是组件实例.如果根作用域内的其他子作用域想要直接访问 this 那么请设置成箭头函数
- computed 跟上面 methods 一样

###### 一些知识点

- 对象拷贝的是地址，即使对他操作也是按地址找
- props 中的值：如果就是一个值，则不可以修改，如果是对象修改不报错，但是不建议
- every 方法：检测数组所有元素是否都满足条件
- map 方法 拷贝一个数组，可以对数组加上一些变化

##### 实例生命周期钩子

- 阶段 1：初始渲染阶段（页面刚进入时或刷新时）

  - `beforecreat()` 组件翻倍穿件，在初始化 data 之前执行的（它修改不了 data）

  - `create d（）` 都配置好了 此阶段最适合进入页面就修改 data，适用于发送请求获取后台数据

  - `beforeMount（）` 组件即将渲染（挂载开始前，就是变成浏览器认识的东西之前）

  - `mounted()` 被挂载后调用（渲染完毕了，都在浏览器中展示了） 适用于刚进入页面想要获取真实的 dom 节点，对其做一些操作 如加个 swiper 插件

  - `beforUpdate() `更新操作触发之前

  - `updated()` 更新操作完毕 每更新一次 beforeUpdate 和他都会被触发一次

  - `beforeDestroy()`组件销毁之前触发

  - ` destroyed()` 组件销毁完毕
  - `beforeDestroy()`和` destroyed()`是指组件的销毁，组件标签在页面中消失，使用 v-if 语句，`v-show`是隐藏标签相当于 opcity：0，` v-if`不可以在子组件中控制销毁，因为要销毁的是组件标签，而不是子组件内的普通标签。详情看`vue-demo下的vue-lifecircle `
  - `v-if` 销毁页面，

```js
 beforeCreate() {
    console.log("组件创建了，还没初始化data");
  },
  created() {
    console.log("配置完了");
  },
  beforeMount() {
    console.log("就差渲染了");
  },
  mounted() {
    console.log("渲染完毕");
  },
```

#### 下面的知识点在 项目：`vue-element-ui` 中

##### v-slot 插槽

缩写：#

slot 可以将父组件内部的引用子组件内部的东西传给子组件 类似 props

```html
子组件 Btn.vue：
<template>
  <button><slot></slot></button>
</template>
```

```html
父组件 app.vue
<Btn>哈哈哈</Btn>
这样字组件的按钮中的文字就是'哈哈哈'
```

- 具名插槽

  ```html
  父组件内部
  <!-- <template v-slot:list> -->
  <template #list>
    <div class="list">列表</div>
  </template>
  ```

- 默认插槽

```html
父组件内部
<template>
  <div class="sildeBar">侧边导航</div>
</template>
```

综上，子组件内部

```html
<template>
  <div>
    <div class="left">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="list"></slot>
    </div>
  </div>
</template>
```

##### 在组件身上直接使用 v-model

如果想要在子组件身上直接使用 v-model,那么子组件内部的 props 要接收 'value'，而且还要使用父组件传过去的 input 事件

v-model 就是简写了 value 和 input 事件

```html
<!-- 父组件 -->
<Btn v-model="isActive">哈哈哈</Btn>
<!-- v-model 用再子组件身上就相当于是简写了 这两个 -->
<!-- ===》<Btn :value="isActive" @input="function() {}"></Btn> -->
```

```html
<!-- 子组件  -->
<button @click="$emit('input', !value)" :class="value ? 'active' : ''">
  <slot></slot>//插槽 接受的是'哈哈哈'
</button>
```

### 在 vue 中安装依赖

``
分为两种：

- 运行依赖（必须依赖）--> 项目不安装它不会正确运行，`--save` 如：vue-router、element-ui、axios
- 开发依赖 ---> 工具类的，编译工具、插件类辅助工具，只是用一次的，辅助项目正常编译执行的或帮助搭建环境、配置的 如 scss、stylus。。。
  安装包的方式可能会影响项目成品大小
