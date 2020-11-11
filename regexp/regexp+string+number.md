# 2020.04.11
## 正则表达式
- (?=xx) 表示想要获取的后面紧跟着xx，但是不会匹配，不拿到xx
- (?<=xx)表示想要获取的前面面紧跟着xx，但是不会匹配，不拿到xx
- 连续的 （）\1 -->跟括号里一样的
-.代表任何一个字符,想要只代表**点 "\\."**
- label的for和input的ID相同的话，点label，input也可以获取光标

- p、h、header footer这些标签最好不要用，注册时那些提示用span、div都行

- 因为正则表达式定义一次就可以了，所以定义到事件外面。**事件触发若干次，所以那些定义一次的东西最好不要定义在事件里面，否则会触发若干次。**

- (?=xx) 表示想要获取的后面紧跟着xx，但是不会匹配，不拿到xx
- (?<=xx)
- 连续的 （）\1 -->跟括号里一样的
- .代表任何一个字符,想要只代表**点 "\\."**

#### regexp汉字的匹配
- [\u4e00-\u9fa5] u4e00:笔画最少的 u9fa5：笔画最多的 
#### 变量的正则 比如输入框中输入一些文字 然后匹配其他字符创中是否报刊输入内容
``` js
var str='dada'
//1.字符串的方法可以 includes indexOf

// 2.正则
var re = new RegExp('a')//可以放变量，拼接
console.log(re)//-->/a/
```
### 字符串对象
```js
var str='joaaaaj1111'
//indexOf 位置，如果存在找第一次匹配的并返回位置，不存在返回-1
console.log(str.indexOf('j'))//-->0
//includes 如果存在找第一次匹配的并返回true，不存在返回false
console.log(str.includes('j'))//-->true
//charAt() 获取某个下标的字符
console.log(str.charAt('1'))//-->a
//charCodeAt() 返回某个下标的字符在计算机中的编码 unicode编码

//repace 字符串替换 原字符串不变，返回一个新的 默认只替换一次
var new = str.replace('ja','')
var news = str.replace(/[a-z]/g,'')//加了g变成全局替换 g:表全局
console.log(news)//-->1111
//match 查看字符串是否满足摸个条件，并返回满足条件的子字符串组成的数组
console.log(str.match(/a-z/g))//-->
str1 = '今天17号，天气不错，最高气温-20℃，最低气温-7℃'
//拿到气温
        console.log(str1.match(/-?[0-9]{1,2}(?=℃)/g))

//slice 字符串截取
 //split 将字符串拆分成数组
 str2='1-2-345-6'
 console.log(str2.split('-'))//-->{1,2,345,6}
```

#### 判断回文

```js
var str='abcdcba'
//reverse()翻转数组，join()将数组组成字符串
str.split('').reverse().join('')===str
```

### 判断连续字符串
```js
function isLixuNum(str) {
      var length = str.length
      // 默认是递增
      var chazhi = -1
      // 默认是对的
      var res = true
      if (str.charAt(0) - str.charAt(1) > 0) {
        chazhi = 1
      }
      for (var i = 0; i < length - 1; i++) {
        if (str.charAt(i) - str.charAt(i + 1) !== chazhi) {
          res = false
        }
      }
      return res
    }
```
### number 
- toFixed 方法，将数字转化为字符串，并且四舍五入保留n位小数 返回一个新数字 原不变

```js 
var num = 0.3+0.2
var num2 = num.toFixed(2)//--> num2 = 0.50
```
- 其他方法看文档

### 定位居中：父级的一半-自己的一半
