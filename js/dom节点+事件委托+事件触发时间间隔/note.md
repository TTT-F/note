# 04.18
## 详情参考：网上上课/04.12冯甜甜/homework2.html
## 事件委托 利用了事件冒泡的规则，然后用event.target
### 将后代元素的事件绑定给祖先
- 原生事件绑定一般需要for循环，事件委托可以替换for

```js

        //这个onmouseenter不能用???
        document.querySelector('.list').onclick = function(event) {
            console.log(event.target.tagName)
             //获取的是标签名，大写的
            if (event.target.tagName === 'LI') {
                var index = event.target.getAttribute('data-index')
                num = index
                clear(num)
            }

        }
}
```
  - 给了ul绑定事件
    通过鼠标划入Li时 ul的事件同样会触发
## 事件冒泡规则；当操作某一个元素时，会触发所有祖先绑定的同类型事件。
    <!-- *原生事件绑定的默认触发顺序是从外到内，JQ事件绑定默认是由内到外* -->
- **event.target 代表真正触发事件的那个元素**
- *划入事件是只要接触，一定接触的是最大的盒子，划入事件是有外到内的，一般其他的事件是由内到外的*
## 阻止事件冒泡
### event.stopProagation()
```js

```
## 阻止事件的默认行为，  1.event.preventDefault() 2.return false
- 阻止a的跳转 href=‘JavaScript：；’ href = JavaScript：void（0）；



## 当多个事件有相同部分时，可以将这些相同的部分抽出来，变成一个函数

## 控制事件触发时间间隔
- 有两种方法控制频率
    -  1.用event事件里面的timeStamp event.timeStamp(他有些类似于格林威治事件)    
    - 2.直接用格林威治时间 new date().getTime()    
```js
        // left用event事件对象
        document.querySelector('.left').onclick = function(event) {
                var nowTime = event.timeStamp
                console.log(nowTime)
                    // 这里一定要判断preTime是否等于0， 因为timeStamp是浏览器打开的时间
                if (nowTime - preTime >= 1000 || preTime === 0) {
                    preTime = nowTime
                    num--
                    if (num < 0) {
                        num = picArr.length - 1
                    }
                    clear(num)
                }
            }
            //.right用的格林威治时间
            // 最好用这种方法，因为：
            // 1.timeStamp还要多一个判断条件；
            // 2.假如setInterval想要调用有event事件的函数，会报错,因为event是onclick的事件，而setInterval只是模拟点击事件不是真正的点击

        document.querySelector('.right').onclick = function() {
            var nowTime = new Date().getTime()
            if (nowTime - preTime >= 1000) {
                preTime = nowTime
                num++
                if (num > picArr.length - 1) {
                    num = 0
                }
                clear(num)
            }

        }
```

# 04.19
## document
[html](document.html)
### 1.获取dom节点
### 2.修改dom节点的行内样式
- 属性
    - style
### 3.获取或修改dom节点的属性
- 方法
    - getAttribute()
    - setAttribute()
### 4.修改和获取class属性
- 方法
    - getAttribute()
    - setAttribute()
- 属性
    - className
### 5.创建dom节点
- document.creatElement('标签名')
### 6.添加dom节点
- a. appendChild(b) a：父级 b:新建的标签
- a.insertBefore(b,c) a：父级 b:新建的标签 c:放在c前面
### 7.删除dom节点
- a.remove(b) a：父级 b:新建的标签
- a.removeChild(b) a：父级 b:新建的标签

### 8.修改标签间的内容
- 属性
    - innerText 修改标签间的文本内容
    - innerHTML 可识别出标签
### 9.表单处理
- 属性
    - value 获取或设置 type为text password select textarea的值
    - checked 获取和设置 radio checkbox的值——>true false
- 方法
    - focus() 获得焦点
    - blur（）失去焦点









