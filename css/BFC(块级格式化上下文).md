### BFC(块级格式化上下文)

 Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。 

首先 `定位方案`

定位方案：控制元素的布局

三种常见方案：

- 普通流(normal flow)，在普通流中，元素按照其在HTML的先后位置之上而下布局，在这个过程中，行内元素水平排列，当前行占满之后换行，`块元素`默认被渲染成一个完整的行，普通流中元素的位置有该元素在HTML文档中的位置决定。
- 浮动(float) ,在浮动布局中，元素会首先按照普通流的位置出现，然后根据设定的浮动方向，向左或向右浮动
- 绝对定位(absolute position),元素会脱离普通流，因此绝对定位元素不会对其他元素有影响。

BFC就是页面上的一个隔离的独立容器，这个容器里面的子元素不会影响到外面的元素。容器以外的也不影响容器内部的。浮动，外边距等等都不影响。

##### 触发BFC

满足下面任一条即可触发BFC特性：

- body 根元素

- float 除了 none不可，其他都可以

- position：absolute|flex

- display: inline-block|table-cells|flex

- overflow:hidden|auto|scroll

  #### BFC特性及应用

  1.同一个BFC中下边距可能会发生折叠

  ```css
  .container {
      overflow: hidden;
  }
  p {
      width: 100px;
      height: 100px;
      background: lightblue;
      margin: 100px;
  }
  ```

  这样，就可以解决下边框重叠了。

  2.BFC 清除浮动

  浮动元素会脱离普通流，如果父级高的话，子浮动之后父的高度为0

  ```css
    .b {
              overflow: hidden;
          }
          
          .b-son {
              width: 100px;
              height: 100px;
              background-color: red;
              float: left;
          }
  ```

  3.BFC 可以阻止元素被浮动元素覆盖

  ```css
     section {
              width: 300px;
              border: 1px solid red;
              overflow: hidden;
              font-size: 16px;
          }
          
          p {
              width: 200px;
              height: 200px;
              background: #eee;
              overflow: hidden;
          }
          
          .box3 {
              width: 100px;
              height: 100px;
              background: red;
              float: left;
          }
  ```

  第二个元素(被覆盖的)添加上`overflow:hidden` 可避免后面没有浮动的元素被浮动元素挡住。

