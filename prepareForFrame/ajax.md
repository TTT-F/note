### ajax
Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）.
在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。
- 现在已经进阶了ajaj(但是还会叫ajax，只是底层改成了json)，进阶成 Asynchronous JavaScript and JSON。好处 数据小传输快，解析方便等等

#### 原生ajax
- 创建 xhr 对象
```js
 const xhr = new XMLHttpRequest();
```
- 使用对象创建请求
```js
    xhr.open('GET','path',true)
```
- 使用send 发送请求
```js
    xhr.send()
```
- 使用 onreadystatechange 函数监听请求过程，获取相应
```js
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 可以获取后台数据
    console.log(JSON.parse(xhr.responseText));
    // 获取到的数据类似数组字符串   ---> json 串
    // 属性名和属性值必须使用双引号，数字和布尔值不需要，最后一项没有逗号
    // 使用 JSON.parse(json串) 转换
  }
};
```
##### GET请求方式，向后台请求获取数据
```js
const xhr = new XMLHttpRequest();
        // get方式
        // 创建请求，open('请求的类型'，'地址'，是否异步)
        // 请求类型是后台规定的，不用管；地址：后台服务器地址；是否异步：true异步 false 同步，一般都是异步
        // 请求类型: GET POST PUT PATCH DELETE ...
        xhr.open("GET", "http://jsonplaceholder.typicode.com/posts", true)
            // 发送时可以带参数，get请求不用带
        xhr.send()
            // 监听整个请求过程
            // xhr.readyState请求状态值，0-4
            // 0：还没调用open
            // 1：已调用open但没有调用send
            // 2：(发送) 已经调用send()方法，但还没有接收到响应。
            // 3：(接收) 已经接收到部分响应数据。
            // 4：请求完成就绪
            // xhr.status请求状态码 [200,299] 完成ok

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // xhr.responseText 获取后台数据
                console.log(JSON.parse(xhr.responseText));
                // 获取到的数据是类似数组字符串，json串，需要用json.parse()转换成数组
                // json串：属性名和属性值必须使用双引号，数字和布尔值不需要，最后一项没有逗号
            }

        }
```
##### POST 请求方式 需向后台传输数据
```js
    const xhr = new XMLHttpRequest()
    // 地址：url/accesstoken accesstoken这是后台告诉的(规定好的)，这也是一个标识，标识传这个后台才可以认识，别的就不认识了，所以这里必须要写，把accesstoken传到后台
   xhr.open('POST', 'https://cnodejs.org/api/v1/accesstoken', true)
            // 发送请求时需要向后台传递数据
            // 原生ajax 不能接收对象为参数，只可接受json串，而且得设置请求可以传递json
            // 所以需要使用xhr.setRequestHeader()设置请求头
            // 添加json为可传递数据，使用json.stringify()将对象转化为json串
        xhr.setRequestHeader('content-type', 'application/json')
            // ecf878d1-6052-476a-8262-824760c7872b 标识码，把他想成密码就行了
        xhr.send(JSON.stringify({
            accesstoken: 'ecf878d1-6052-476a-8262-824760c7872b'
        }))
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));
            }
        };
```
*发出请求时一定要看看send里面需不需要带参数，send里面写请求参数*
**假如请求路径中存在:xx 这个xx表示可变的值**
#### jquery ajax
- get请求
```js
// $.get('address','parameter','回调函数','返回内容的格式')
        // 地址：后台接口地址
        // 参数： 请求时的参数，不要可省略
        // 返回内容格式，默认是json 不需要设置
        // 回调函数：函数执行成功后的相应（执行的函数），默认接受一个参数
        $.get("http://localhost:3000/posts", function(res) {
            console.log(res);
        })
```
- post请求

```js
// $.post(地址，参数，回调函数，返回内容的格式)
        $.post("https://cnodejs.org/api/v1/accesstoken", {
                accesstoken: 'ecf878d1-6052-476a-8262-824760c7872b'
            },
            function(res) {
                console.log(res);

            }
        )
```
- $.ajax() 方法 具体更多方法看MDN
```js
// post
 $.ajax({
            // 请求类型
            type: 'POst',
            // 请求地址
            url: "https://cnodejs.org/api/v1/accesstoken",
            // 请求参数
            data: {
                accesstoken: 'ecf878d1-6052-476a-8262-824760c7872b'
            },
            // 请求成功的回调
            success: function(res) {
                console.log(res);
            },
            // 请求失败的回调
            error: function(err) {
                console.log(err);
            },
            // 请求结束的回调
            complete: function() {},
            // 发送给后台内容类型 默认支持对象类型
            contentType: '',
            // 请求是否跨域 false 同域，true 跨域
            // 一般后台解决跨域请求问题，不需要前台来设置
            // 当然也有前后台一起解决的，前端须有做一些简单的配置
            // crossDmain: boolean,
            // headers:请求头设置，可能配合后台做一些设置

        })
        // get
          $.ajax({
                // type不写默认是get请求
                // url: "http://localhost:3000/posts?_limit=10&_page=1",可以这样将参数和地址用问号连接起来
                // 方式2；可以将参数写在data中

                url: "http://localhost:3000/posts",
                data: {
                    _limit: 10,
                    _page: 1
                },
                // 函数简写 es6
                success(res) {
                    console.log(res);
                }

            }

        )
```
#### axios ajax
axios 是专门的ajax请求插件，他里面的异步解决方案使用的是promise。文档参考[网址](https://www.kancloud.cn/yunye/axios/234845)
- axios 就是使用了promise封装了异步操作
```js
// .then 成功函数
        // .err 失败函数
        axios.get('http://localhost:3000/posts').then(function(res) {
            console.log(res.data)
                // axios 会将后台返回的数据放到一个对象的data属性中

        }).catch(function(err) {
            console.log(err);

        })
```
- 异步和同步的概念
    - 异步非阻塞
    - 同步阻塞
    - **一定是同步的执行完之后才执行异步，这和时间顺序无关**
    *回调函数：一个函数是另一个函数的参数，把这个当参数的函数叫做回调函数*
    ```js
            for (let index = 0; index < 1000; index++) {
            console.log(1000);
            setTimeout(
                //回调函数：异步执行后执行的函数
                () => console.log('hah'), 1000)

        }
        这种结果是先输出1000个1000 然后再输出1000个'hah'

        $('.box').slideDown(1000,function () {
            
        })
       // 外面有个事(这个事要在异步操作之后执行)，可以把这个事当做参数传给异步操作，等异步操作完毕后执行回调
       // 嵌套很多层回调，某一层还要做判断-->回调地狱
    ```
- promise 用来解决异步回调的
```js
      // promise 
        let num = 1
        const promise = new Promise(function(resolve, reject) {
            // ... some code
            num = 2
            console.log('工作');
            if (num === 1) {
                console.log('成功')
                resolve(1); //resolve 成功执行后的调用then里面的回调函数的(将结果作为参数传递出去)，可以传参，then的回调函数中必须有形参
            } else {
                console.log('失败')

                reject(1); //reject 失败后调用catch里面的回调函数的(将结果作为参数传递出去)，可以传参，catch的回调函数中必须有形参
            }
        });
        // .then 传递 resolve 函数的，里面可以放两个回调函数，第一个是成功时执行，第二个失败执行
        // .catch 传递 reject 函数的
        promise.then(function(a) {
            console.log('the work is over , please do next work' + a);

        })
        promise.catch(function(a) {
            console.log('error work' + a);

        })
```
```js
function times(ms) {
            // 将promise作为一个返回对象送出去
            return new Promise(function(resolve, reject) {
                setTimeout(resolve, ms, 'done')
                    // resolve在这里作为 setTimeout 的回调函数 done是resolve的参数
                    // setTimeout这种的操作 从第三个参数开始，都是它里面函数的参数
                    // resolve 调用 then,
            })


        }
        console.log(times(1000));
        // -->Promise {<pending>}__proto__: Promisecatch: ƒ catch()constructor: ƒ Promise()finally: ƒ finally()then: ƒ then()Symbol(Symbol.toStringTag): "Promise"__proto__: Object[[PromiseStatus]]: "resolved"[[PromiseValue]]: "done"
        // times（100）这里就是返回的promis对象(正在进行的)
        // .then 回应resolve 传递resolve函数
        times(1000).then(function(tip) {
            console.log(tip);

        })
```



### 使用 json-server 模拟后台数据库
- 全局安装 json-server `npm i -g json-server`
- 在需要的项目中建xx.json文件，里面的内容必须是对象 
如：
```js
{
    //这个users是一个数组，这个数组是一个接口，相当于一个表，接口地址/users 就可以拿到
    "users": [
      {
        "id": 121,
        "username": "小王"
      },
      {
        "id": 21,
        "username": "小二"
      }
    ]
  }
  相当于有个一个user表
```
- 在该项目下 使用命令`json-server --watch xx.json -p -3000` 启动数据库，一定不能关闭该服务，执行了之后就不要再这个命令窗口做任何操作了
[json-server](https://github.com/typicode/json-server)
### 将自己的项目运行在本地服务器上
- 全局安装 serve `npm i -g serve`,安装一次就可以了 
- 在项目内打开命令行工具 执行 `serve .` 不能关闭！
- 然后就跑在了本地服务器上了 默认打开的是 index.html
##### 项目服务器

项目的开发阶段，前端页面跑在本地(局域网)服务器上，后台数据库服务器只能公司内部访问。