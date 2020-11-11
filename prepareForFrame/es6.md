#### EMAscript 6 新的js
### const 和 let
let const 和 var 的不同
- 不能重复声明
- 没有声明提升
- 存在块级作用域内(作用域被定义在{}内)

const 是声明常量的（不可更改）, 常量的名字全部大写。
let 声明变量的，可更改。
#### const 定义的对象可以更改 const a={}
原因：因为对象是引用类型的，因此a只保存了指针而不是保存的具体的值，所以内容可以改变
- 指针发生变化 不可以
```js
const lvbu = {
            name: '吕布',
            level: 20
        }
        lvbu.level = 18
        console.log(lvbu.level)//yes!!

        lvbu ={
              name: '吕布',
            level: 18,
            
        }
        // 这种不行，这相当于给lvbu赋了一个新的对象，这个和lvbu的指针不一样所以会报错（lvbu保存的指针发生了变化）
```
#### const 定义的普通类型不可以更改 
普通类型在内存中直接保存的是的数据 而不是指针，所以不可更改
#### 变量的解构赋值

对象解构赋值
```js
const obj = {
            username: 'lily',
            age: 18,
            level: 10
        }
        const {
            username,
            age
        } = obj
        // {}内的变量顺序可以变化，名字一致
        console.log(username, age)
```
数组解构赋值
```js
  let arr = [1, 2, 3]
        let [a, b, c] = arr
        console.log(a, b, c)
```
函数参数的解构赋值
```js
 const obj1 = {
            username: 'lily1',
            age: 18,
            level: 10
        }

        function show({
            username,
            level
        }) {
            console.log(`该人物名字${username}`, `level:${level}`)
        }
        show(obj1)
```

技巧：变量的调换
```js
let x=1
let y =2
[x,y]=[y,x]
```
### 字符串的扩展
模板字符串
```js
const name = 'lily'
console.log(`名字${name}`)
```
- 新增的一些字符串方法
    - includes() 返回布尔值，是否找到要找的字符串 
    - startWith('xxx') 返回布尔值，字符串是否以‘xxx’开始
    - endsWith() 返回布尔值，字符串是否以‘xxx’结束
    - trimStart() 去除最左边的空格
    - trimEnd() 去掉最右边的空格
    - padStart(n,'xx') 在字符串头部补字符,n:整个字符串长度，''：在头部补的字符串
    - padEnd()  在字符串尾部补字符,n:整个字符串长度，''：在尾部补的字符串，不写补空格
    - matchAll() 和 match()用法一样，用来匹配符合正则的字符(串)


### 函数扩展
#### 函数的默认值
 - 参数为普通类型
```js
 function fun(color = 'red', bgColor = 'black') {
            console.log(`字体颜色：${color}`)
            console.log(`背景颜色：${bgColor}`)
        }
        fun( 'yellow')
```
- 参数类型为对象
```js
 function fun1({
            color = 'red',
            bgColor = 'black'
        }) {
            console.log(`字体颜色：${color}`)
            console.log(`背景颜色：${bgColor}`)
        }
        fun1({})
            // 弊端：不能不传值，即使使用默认值也要传一个空对象

```   
#### 箭头函数

写法：
```js
const fun = (num1,num2)=>{
    return num1+num2
    }
```
- 必须要以赋值形式定义。
- 箭头左边是参数部分，用（），就一个参数时可以省略（）
- 箭头右边是函数体，用{}，只需返回值且不需其他操作内容时，可将{}去掉、return也可省略掉
```js
 const add = (num1, num2) => num1 + num2
        console.log(add(10, 20))
```
##### 箭头函数与普通函数的不同
- 函数体内的this对象，是在定义时的所在对象，而不是调用时的对象。
```js
 const obja = {
            name: 'lily',
            say: function() {
                console.log('this is say-->')
                console.log(this)
            },
            act: () => {

                console.log('this is act-->')
                console.log(this)

            }
        }
        obja.say()//返回 obja
        obja.act()//返回 window
``` 
#### ...rest 剩余参数
 - 剩余参数-->将剩余的实参变成数组传给rest 剩余参数的名字可以随意取但是 ... 必须有 
```js
        const fun2 = function(a, ...rest) {
            console.log(a)
            console.log(rest)
        }
        fun2(1, 2, 3, 4, 5, 6, 7)
```
#### ... 可以将类数组转成数组
    类数组:
```js
    const obj = {
        '0': 12312,
        '1': 98768,
        length: 2,
        // 随便
      }
      不只有数组的属性，还有一些其他的
      转换：
     const fun2 = function() {
    

            console.log(arguments)
            console.log([...arguments]) //转换
        }
        fun2(1, 2, 3, 4, 5, 6, 7)

```
#### Array.from(类数组) 也可以将类数组转为数组
```js
  const fun2 = function() {
            console.log(arguments)
            console.log(Array.from(arguments)) //转换
        }
        fun2(1, 2, 3, 4, 5, 6, 7)
```
数组新增方法： 
 - flat：将二维数组变成一维数组，只能变一级，多维数组需一层一层的变。会返回一个新的数组
 - flatMap：先执行map方法返回一个新的数组，然后再执行flat。最终得到一个新的数组
 
 #### 扩展运算符 ...
  作用：对象的拷贝，还有类数组转化数组
- 对象展开
- 数组展开

```js
// 对象展开
 const lvbu = {
            name: '吕布',
            level: 20
        }
        lvbu.level = 18
        console.log(lvbu.level)
        const lvbu1 = {...lvbu
        }
        lvbu1.hobby = '牛'
        console.log(lvbu, lvbu1)
```
```js
const arr3 = [1, 2, 3]
        const arr1 = [...arr3]
        arr1.push(4)
        console.log(arr3, arr1)
```
### 对象的扩展
对象的简介表示法
```js
const username1 = 'lily'
        const age1 = 18
        const user = {
            username1,
            age1,
            say() {}
        }
        //当对象的属性名和作为该属性的变量的名字相同时，可以直接简写属性值。
        //函数可以省略简写function（限普通函数）; 箭头函数写法 say=()=>{}
        console.log(user)
```
#### symbol
第七种数据类型，生成独一无二的数据
```js
  console.log(user)
        const aa = Symbol('hahh')
        console.log(aa)//-->输出Symbol(hahh)
        console.log(aa.description)// hahh
        let s1 = Symbol('foo');
        let s2 = Symbol('foo');
        s1 === s2 // false 独一无二
        console.log(s1+'hehe')//报错，不能和其他数据类型相拼接
```
### set 数据结构
类似数组，不能存放重复的值
```js
const demo = new Set([1, 2, 3, 4, 32, 1, 2])
        console.log(demo)//Set(5) {1, 2, 3, 4, 32}

            // 属性
            // size 返回 set数据的长度
        console.log(demo.size)
            // 方法 
            // add() 向set数据中添加数据(只能添加一个)，返回数据本身
        console.log(demo.add(9))
             // delete() 从set数据中删除数据(只能删一个)，返回boolean
        console.log(demo.delete(9))
            // has() 查找set数据中是存在，返回boolean
        console.log(demo.has(32))
            // clear() 清除所有数据
        console.log(demo.clear())
          // 将set数据转为数组
        console.log([...demo])
```
Set 结构的实例有四个遍历方法，可以用于遍历成员。

- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器
- Set.prototype.entries()：返回键值对的遍历器
- Set.prototype.forEach()：使用回调函数遍历每个成员

还有一个额外的 WeakSet 数据结构,内部成员只能是对象类型
 ##### set 数据结构可以用来做搜索记录

### class 类
写法
```js
//类的花括号内默认只写方法，而且方法之间不需要逗号
    class Hero {
            //constructor是class自带的函数，成为构造器和之前的构造函数类似。
            //constructor 创建实例化对象时自动触发
            constructor(name, age) {
                this.name = name
                this.age = age

            }
            say() {
                console.log('hahha')
            }
            level = () => {
                console.log(18);
            }
        }
        const bb = new Hero('aa', 12)
        bb.say()
        bb.level()
```
#### 继承 extends
```js
//子级继承继承父级所有东西
 class CarryHero extends Hero {
            constructor(name, age) {
                super(name, age)
                //super 调用父级,父级中所有的方法和属性子级都可以用。必须把name 和 age 传过去 因为父级的constructor需要参数
            }
        }
        const d = new CarryHero('li', 17)
        console.log(d);
```

### 使用 webpack 打包编译项目
node 项目内使用 node 模块导入各种依赖，webpack 可以实现将模块的导入导出编译成浏览器认识的语法，也可以将所有的导入模块操作打包
[参考](http://www.webpackjs.com/guides/)

- 项目内安装 webpack
  ```
    npm install webpack webpack-cli --save-dev
  ```
- 将 js 文件夹的名字改成 src，保证项目的根目录有 src ，并且 src 下存在 index.js，还有 index.js 是页面的主要用的 js
- 执行编译打包命令 `npx webpack`，会将 index.js 打包编译到项目下的 dist 文件夹下的 main.js
- 页面导入打包好的 js
- 以上是使用webpack 的默认配置进行打包，如果想要更改默认配置的话，可以再根目录下新建'webpack.config.js' 当webpack的配置文件详情看[详情](https://www.webpackjs.com/guides/getting-started/#%E4%BD%BF%E7%94%A8%E4%B8%80%E4%B8%AA%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

- 创建命令快捷方式，可在 package.jspn 中的scripts 字段中配置快捷键。使用 `npm run 快捷键名`。
如：
```
  "build": "webpack --config webpack.config.js" 有配置文件
  === npx webpack 
```

#### es6的导入方式
两种：
- 默认导入 `import 名 from '文件路径'`
默认导入在每一个js文件中只能存在一个 导入名字和导出的名字可以不一样，默认的也能用as换名但是意义不大
```
     import a from './about'
    import $ from 'jquery'
```
-  命名导入  `import {a as b} from '文件路径'` 
命名导入可以有多个，但是默认是导入和导出名字必须一致，改名必须加as 别名,{}花括号中可以放多个 逗号隔开
```
     import {a} from './about'
```
- 也可以这样写 import xxx,{a as b,...} from '文件路径'
    这种写法可以将默认导入和命名导入放在一起
- 也可以 `import * as obj from 'file path'`,这种是 全部导入，不管是默认还是命名的，obj内保存着全部导出 用 obj.名字即可
#### es6 的导出方式
两种：
- 默认导出 `export default 名` ， 只能导出一个默认的
- 命名导出 `export {a}`|`export {a,b,c}` 可以导出多个
