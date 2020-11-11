# 浏览器对象 document
## 20.04.12
- js运行到浏览器上的的桥梁 网页识别的是html，js想要访问网页需要通过浏览器对象提供的一些接口才可以
- 浏览器对象提供了js访问页面的一些方法
### window 存在的 每一个页面有单独的对象
 #### 方法
 - alert 弹出提示 相当于执行了window.alert() 一般window可以省略

 - setIterval setTimeout console

 - 所写的所有的全局变量和全局函数都属于浏览器对象 全局变量相当于window的属性，全局函数相当于window的方法
 ```js 
 var num = 10
 var window = {
     num:10
 }
 ```
## 属性
 ### 浏览器默认属性 *document* 整个文档（页面） 该对象下存储了很多方法，用来修改（操作）页面
 ```js
 console.log(window.document)-->可以拿到整个文档（页面）
 var window = {
     doument:{
         xx:function
     }
 }
 ```
 -方法 属性
    - 获取页面中节点（标签）—-->jquery 选择器
 [html](browserObject.html)
 
- node 可以写数据库后台，可以实现js脱离
