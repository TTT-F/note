## promise 和 async、await
  promise 是同步的且自动执行的，但是可以用来解决异步执行顺序的，让异步执行有先后顺序的，来搞定异步执行后的操作的。
  意思就是假如有个异步操作，我想在异步操作之后进行下一步操作，可是js的顺序永远是先同步后  异步而且同步顺序执行，异步并发执行，这是就可以用到promise来确保执行的先后顺序
  有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易
```js
  const thing = new Promise((resolve, reject) => {
            let num = 10;
            setTimeout(() => {
                num++;
            }, 1000);
            console.log("this is promise");

            resolve(num);
        });
        thing.then((num) => {
            const number = num;
            console.log("after promise success");
            console.log(number);
        });

```
#### .then()和.catch()是异步的(微任务)，promise是同步的 他俩还先于process.nextTick()执行
```js
        console.log("同步1");
        const thing = new Promise((resolve) => {
            let num = 10;
            setTimeout(() => {
                console.log("这是promise1");
                num++;
                resolve(num);
            }, 1000);
        });
        const a = new Promise((resolve) => {
            console.log("这是promise2");
            resolve();
        });
//.then和catch是异步的，永远都是等promise执行完后，调用它，顺序在自己的promise后面
        thing.then((num) => {
            // const number =num
            console.log("promise1 成功");
            console.log("promise1 成功===>" + num);
        });
        a.then(() => {
            console.log("promise2 成功");
        });
        let num = 100;
        num++;
        console.log("同步2" + num);
        console.log("同步3");
        setTimeout(() => {
            console.log("异步1");
        }, 0);
```
输出:
```
同步1
 这是promise2
 同步2101
 同步3
 promise2 成功
 异步1
 这是promise1
 promise1 成功
 promise1 成功===>11
```
### promise的三种状态
- pending：等待状态，比如正在执行，还没得到最终数据
- fulfil : 满足状态，当我们主动调用resolve时（说明执行成功了），就是处于该状态了，并会回调.then()
- rejected：拒绝状态，当我们主动调用了reject时（没有执行成功），就处于这个状态，并且回调.catch()
##### 这三个状态转换：只能`pending`-->`fulfill`、`pending`-->`rejected` 不可以逆向转换，同时一旦转换后，状态就不能再更改了

### promise 链式调用
- **promise的 then 方法会继续返回一个 promise 对象 **
```js
  let promiseDemo = new Promise((resolve, reject) => {
            // code
            resolve("success");
            // code
            reject("failed");
        });

        promiseDemo
            .then(
                (result) => {
                    // console.log(result);
                    return result;
                },
                (result) => {
                    console.log(result);
                    return result;
                }
            )
            .then((result) => {
                console.log(result);
            });
            //还可以一直往下传
```




## async await

他们也是用于解决异步执行问题的
- async ：异步的意思，用来申明一个异步的函数，会返回一个promise
- await：用于等待一个异步操作的执行，它是一个表达式，async函数内才可以使用await ，
```js
 var b = async function() {
            console.log("async");
            return "hello";
        };
        // 这三个相等，都会返回一个成功状态的promise
        console.log(b());
        console.log(Promise.resolve("hello"));
        console.log(new Promise((resolve) => resolve("hello")));
```
#### await会阻塞同作用域及之下的代码执行，等异步完成之后，再执行它们
```js
    async function fun() {
            console.log(111);

            const res = await axios.get("http://localhost:3008/product");
            console.log(res.data);

            console.log(222);
        }
        fun();
        console.log(333);
```
```
结果：
111
333
(4) [{…}, {…}, {…}, {…}]
222
```