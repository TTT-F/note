## 弹性布局 flexbox

它能够扩展和收缩 flex 容器内的元素，以最大限度地填充可用空间。

**flex布局以后，子元素的float、clear、vertical-align属性会失效**

- 容器：设置display：flex的元素（父元素）
- 轴线: 分横向和纵向，默认主轴线是横向
- 项目：容器中的子元素
	- 不管项目是否有大小，默认项目大小总和不会超过容器的
	- 项目按容器的主轴线进行排序
	- 项目自动转为块元素，
	- 项目没有设置副轴高度，默认副轴高度和容器的高度一样
	- 项目副轴设大小超过容器的话会超出，主轴上不会

#### 容器的属性

- flex-direction 决定主轴排列方向

   - row (默认值)：水平(行)，起点左端

   - row-reverse : 水平(行)， 起点右端

   - column ：垂直方向，起点上沿

   - column-reverse：垂直方向，起点下沿
- flex-wrap 属性  决定占不下时如何换行
	- nowrap ：不换行，如果项目总大小超过容器大小，项目会等比缩放
	- wrap ：换行，第一行在上方，根据项目大小决定每行上的个数
	- wrap-reverse：换行，第一行在最下方
- flex-flow：属性是flex-direction 和 flex-wrap 的简写形式 默认为 row nowrap
- justify-content 项目 在主轴上的对齐方式
	- flex-start：默认值，左对齐
	- flex-end：右对齐
	- center：居中
	- space-between:两端对齐，项目之间间隔相等
	- space-around：每个项目两侧的间隔相等。
- align-items 项目在交叉轴上如何对齐
	- flex-start：交叉轴的起点对齐（默认值  ）
	- flex-end：交叉轴的终点对齐   
	- center：交叉轴中点对齐
	- baseline：子元素中第一行文字的基线对齐
	- stretch：默认，未设高，占满整个容器的高度
- align-content 多根轴的对齐方式(有好几行元素时)，如果项目还有一根轴线，该属性不生效
	- flex-start：与交叉轴的起点对齐。
	- flex-end：与交叉轴的终点对齐。
	- center：与交叉轴的中点对齐。
	- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
	- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
	- stretch（默认值）：轴线占满整个交叉轴。
- 子元素上写的属性
	- order ：num，数值越小排列越向前，default：0
	
	- flex-grow ：放大比例，def：0 ，如其他子元素设宽之后，父元素有空余就是占满父元素剩下的所有，无论属性值为几
	
	  ```js
	  .container {
            width: 600px;
	          height: 300px;
	          display: flex;
	      }
	      
	      .left {
	          flex-grow: 2;
	          background: red;
	      }
	      
	      .right {
	          width: 100px;
	          background: blue;
	      }
	  ```
	
	  
	
	- flex-shrink：缩小比例， def：1,仅在子元素之和大于父元素有效 ，0：不允许缩放
	
	- flex-basis ：占据主轴的空间，def：auto，和设主轴上的大小差不多
	
	- flex ：flex-grow，flex-shrink 和 flex-basis 的简写，def：0 1 auto，后两个可以省略
	
	- align-self ： 自己的对齐方式
	
	  ​     