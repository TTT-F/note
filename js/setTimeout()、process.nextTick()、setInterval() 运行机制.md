## setTimeout()、process.nextTick()、setInterval() 运行机制
### setTimeout()
- setTimeout 执行是要等主线程执行完之后才会进行的，并且setTimeout是根据`时间`来`顺序`的执行，当一个setTimeout进行大量的计算，那么他就会阻塞在当前setTimeout的回调函数中，等待计算完毕，执行下一个setTimeout
```js
   for (let index = 0; index < 10000; index++) {
            console.log("i am for");
            setTimeout(() => {
                console.log("setTimeout in for");
            });
        }
        setTimeout(() => {
            for (let index = 0; index < 10000; index++) {
                console.log(111);
            }
            console.log(222);
        }, 1000);
        setTimeout(() => {
            console.log(444);
        }, 0);
        console.log(333);
        setTimeout(() => {
            console.log(555);
        }, 1000);
```
结果：
```
[10000次]i am for

[10000次]setTimeout in for
444
[10000次] 111
222
555
```
所以从运行结果可以看出来，先执行同步，然后在执行异步
**如果前面主逻辑队列里面有代码执行时间超过了setTimeout的事件参数，那么这些小于代码执行时间的setTimeout就会自动忽略时间参数，直接执行setTimeout的回调函数**
### process.nextTick()
它是Node.js提供的一个异步执行函数，所有异步执行中最快的，效率最高的，执行顺序先于ssetTimeout和setInterval，他在同步执行完毕之后立即执行，先把所有的nextTick执行完了再执行其他的异步
**在vue中可用于dom更新循环结束后执行的延迟回调，执行顺序没有变化**
```js
process.nextTick(() => {
  console.log("this is nextTick 1 ");
});
setTimeout(() => {
  console.log("this is setTimeout 1");
}, 5000);
process.nextTick(() => {
  console.log("this is nextTick 2 ");
});
setTimeout(() => {
  console.log("this is setTimeout 2");
}, 5000);
console.log("同步1");
process.nextTick(() => {
  console.log("this is nextTick 2 ");
});
setTimeout(() => {
  console.log("this is setTimeout 3");
}, 2000);
```
结果：
```
同步1
[10000次] 同步2执行ing 
 同步3
 this is nextTick 1 
 this is nextTick 2 
 this is nextTick 2 
 this is setTimeout 3
 this is setTimeout 1

```
### setInterval() 
定时器函数，可指定周期，由于js是单线程语言，所以这个定时器的指定是周期回调函数
也是在主线程执行完成后调用，如果time一样，就按照setInterval设置的顺序执行
```js
  setInterval(() => {
            console.log("this is setInterval 1");
        }, 5000);
        setInterval(() => {
            console.log("this is setInterval 2");
        }, 5000);
        console.log("同步5");

        setInterval(() => {
            console.log("this is setInterval 3");
        }, 5000);
        setInterval(() => {
            console.log("this is setInterval 4");
        }, 5000);

        // setInterval(() => {
        //     console.log("this is setInterval 5");
        // }, 3000);
        for (let index = 0; index < 10000; index++) {
            console.log("同步2执行ing ");
        }
        console.log("同步3");
```
结果：
```
同步5
[10000次] 同步2执行ing 
 同步3
 this is setInterval 1
 this is setInterval 2
 this is setInterval 3
 this is setInterval 4
 this is setInterval 1
 this is setInterval 2
 this is setInterval 3
 this is setInterval 4
```
**setInterval和setTimeout不一样哦，它不会因为主线程的执行时间，忽略自己的时间，它的周期时间指的是前一次的执行与下一次的执行之间的间隔，与其他执行时间无关**