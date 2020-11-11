### vue-router 路由

单页面模拟实现多页面之间的跳转（其实就是多个组件之间来回切换）

详情：`vue-router-demo`、`vue-juejin-router` 项目

- 对于单页面应用 vue 提供了 vue-router 库 来实现多页面的效果 ，需要下载

```
   1. npm i vue-router
   2. 在vue 图形化页面中 依赖中安装
```

- 创建流程

  - 1.先创建组件（虚拟的页面）并导入到 js 中

  ```js
  import Home from "./views/Home.vue";
  import About from "./views/About.vue";
  //这是导入vue-router插件，因为要使用插件
  import VueRouter from "vue-router";
  //导入 vue ，因为是单独的一个js 而且还要用vue中的方法
  import Vue from "vue";
  ```

  - 2.根据组件创建路由

```js
// 该数组中的一个对象就对应这一个页面，path：页面路径 component：页面的组件
const routes = [
  {
    // /:代表当前服务器的根目录 如：localhost：8080
    path: "/",
    component: Home,
  },
  {
    path: "/About",
    component: About,
  },
];
```

    - 3. 根据路由创建路由实例

```js
// 创建路由实例是可以选择路由模式
// 路由模式： hash模式(默认模式) --->http://localhost:8080/#/  /#/
//           history模式 完全模拟浏览器样式的--->http://localhost:8080
const router = new VueRouter({
  // 创建时需要传递routes属性，属性名不可改（因为这是人家别人写好的），属性值是创建的路由数组名
  // routes:routes
  routes,
  // mode来设置路由模式
  mode: "history",
});
```

    - 4.需用 vue.use()方法声明 让 vue 可以使用路由插件了

```js
// 必须用vue.use 方法告诉 vue 可以使用vueRouter了，这样vue项目才可以有意识的使用 vue-router插件中的东西
// use方法 使用之后就可以使用插件中的东西了
Vue.use(VueRouter);
```

    - 5. 将路由实例传给 app

```js
//1.首先从router.js 导出router实例
export default router;
// 2.main.js中
// 导入router添加到vue项目中
import router from "./router";
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
```

    - 新建 views 或 pages 文件夹，里面存放想要创建的组件（页面）

- 使用

  - 在组建内部使用 `<router-view></router-view>`可以使用路由，匹配规则严格匹配

  ```html
  <!-- <router-view > 展示匹配到的页面，根据当前服务器的地址和路由的path进行匹配，匹配成功展示，不成功啥都不展示-->

  <router-view></router-view>
  ```

  - `<router-link>`实现页面的跳转

```html
<!-- to=path -->
<!-- tag 可以改变解析后的标签  默认是a标签-->
<router-link to="/">home</router-link>
<router-link to="/about">about</router-link>
```

- 跳转只是`<router-view>`在改变，和`<router-link>`没关系

##### `<router-link>` 的 props

(参考)[https://router.vuejs.org/zh/api/#router-link]

- to=path
- tag 可以改变解析后的标签 默认是 a 标签
- active-class 设置链接激活时使用的 CSS 类名 默认值: "router-link-active"   只在页面跳转时才激活

  - 方法 1

  ```html
  <!-- router-link 的激活是包含匹配 可以使用exact 精准匹配 -->
  <router-link to="/" active-class="active" exact>首页</router-link> |
  <router-link to="/Pins" active-class="active" exact>沸点</router-link>
  ```

  ```CSS
    #nav a.active {
  color: #007fff;
  }
  ```

  - 方法 2

  ```html
  <!-- router-link 的激活是包含匹配 可以使用exact 精准匹配 -->
  <router-link to="/" exact>首页</router-link> |
  <router-link to="/Pins" exact>沸点</router-link>
  ```

  ```CSS
  #nav .router-link-active {
  color: #007fff;
  }
  ```
  

##### 子路由

​	子页面的设置要写在父页面中的children属性中

```js
 {
        path: "/",
        name: "Home",
       // name 是为了更方便的找路由，相当于给这个路由起了个名字

        component: Home,
        // home 需要嵌套子页面 使用children属性
        // 子页面的设置要写在父页面的children里面
        children: [{
            // 当一个组件当做多个页面需要做成动态路由  很多个页面使用一个组件
            // :名字 用来接收 to 传过来的path
            path: ":type", //动态路由地址，输入什么都可匹配到postList ，但是多层级的不匹配，精准匹配
            // name: '',
            component: PostList,
        }, ],
    },
```

##### 路由的匹配

- **路由匹配规则匹配到了一个就不会再匹配了，向上向下，严格精准匹配**
  路由另外一个规则就是匹配到一个别的就不管了，home是根目录，`/pins `是根下的，`/frontend` 也是根的，动态路由本来就在pins前面所以，匹配到动态路由了就不会管了别的了

```js
// 路由匹配规则匹配到了一个就不会再匹配了，向上向下，严格精准匹配
// 路由另外一个规则就是匹配到一个别的就不管了，home是根目录，/pins 是根下的，/frontend 也是根的，动态路由本来就在pins前面所以，匹配到动态路由了就不会管了别的了
const routes = [{
        path: "/pins",
        name: "Pins",
        component: Pins,
      
        // 这样导入的好处，只有在匹配到的时候才导入，不匹配的时候不导入
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        // home 需要嵌套子页面 使用children属性
        // 子页面的设置要写在父页面的children里面
        children: [{
            // 当一个组件当做多个页面需要做成动态路由  很多个页面使用一个组件
            // :名字 用来接收 to 传过来的path
            path: ":type", //动态路由地址，输入什么都可匹配到postList ，但是多层级的不匹配，精准匹配
            // name: '',
            component: PostList,
        }, ],
    },
];
```

##### $router 和 $route

###### vue-router 提供了一台获取地址栏信息的方案

**他俩发生变化并不会触发生命周期钩子**

- $route 获取的是当前地址栏信息的路由对象

  ```js
  {name: undefined, meta: {…}, path: "/frontend", hash: "", query: {…}, …}
  fullPath: "/frontend"
  hash: ""
  matched: (2) [{…}, {…}]
  meta: {}
  name: undefined
  params: {type: "frontend"}
  path: "/frontend"
  query: {}
  __proto__: Object
  }
  ```

  

- $router 获取整个路由实例信息，也就是自己创建的所有

```js
VueRouter {app: Vue, apps: Array(1), options: {…}, beforeHooks: Array(0), resolveHooks: Array(0), …}
afterHooks: []
app: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
apps: [Vue]
beforeHooks: []
fallback: false
history: HTML5History {router: VueRouter, base: "", current: {…}, pending: null, ready: true, …}
matcher: {match: ƒ, addRoutes: ƒ}
mode: "history"
options: {routes: Array(2), mode: "history"}
resolveHooks: []
currentRoute: (...)
__proto__: Object
```

##### 编程式导航

(编程式导航详情)[ https://router.vuejs.org/zh/guide/essentials/navigation.html ]

除了使用 `` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现 

- `$router.push()` 这个方法会向 history 栈添加一个新的记录 

  ```html
  <span @click="goHome" class="logo"
        ><img
          src="https://s3.pstatp.com/toutiao/xitu_juejin_web/img/logo.a7995ad.svg"
          alt=""
      /></span>
  ```

  ```js
   methods: {
      goHome() {
        this.$router.push("/");
         
  
  // 对象
  //this.$router.push({ path: 'home' })
  
  // 命名的路由
  //this.$router.push({ name: 'user', params: { userId: '123' }})
  
  // 带查询参数，变成 /register?plan=private
  //this.$router.push({ path: 'register', query: { plan: 'private' }})
   //   },
   // }
  ```

- `$router.go()`

  ```js
  // 在浏览器记录中前进一步，等同于 history.forward()
  router.go(1)
  
  // 后退一步记录，等同于 history.back()
  router.go(-1)
  
  // 前进 3 步记录
  router.go(3)
  
  // 如果 history 记录不够用，那就默默地失败呗
  router.go(-100)
  router.go(100)
  ```

  

- `$router.back()` 返回上一级，手机上用的较多

##### 命名路由  可以用 `name`来进行跳转

```js
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

##### 命名视图 

 有时候想同时 (同级) 展示多个视图（组件），而不是嵌套展示， 可以有选择性的展示视图

主要是 name  name不写，默认是default

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

##### 重定向与别名

- 重定向

用/a 重定向到 /b 如：地址更新改版，老用户还用以前的网址进入

```js
const routes = [{
        path: "/pins",
        name: "Pins",

        components: {
            default: Pins
        },

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // 这样导入的好处，只有在匹配到的时候才导入，不匹配的时候不导入
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
       // 老地址是/feidian ,改版之后地址是 /pins 可以使用重定向
        path: '/feidian',
        redirect: '/pins'
    },
```

- 别名 alias

```js
  { path: '/a', component: A, alias: '/b' }
// 和重定向差不多
//这个可以通过别名 /b 访问 /a 但是所有有关于/a 的配置和判断 加上别名如样式用到 /a 的时候
```

##### 路由组件传参

使用 `props` 将组件和路由解耦：

**取代与 `$route` 的耦合 可以在路由组件中替代$route **

postList.vue

```js
 props: ["type"],
```

router.js

```js
    {
                // 当一个组件当做多个页面需要做成动态路由  很多个页面使用一个组件
                // :名字 用来接收 to 传过来的path
                path: ":type", //动态路由地址，输入什么都可匹配到postList ，但是多层级的不匹配，精准匹配
                // name: '',
                component: PostList,
                // 当 props 等于true的时候 动态路由参数就会当做props传递给路由组件
                // 这样组件可以通过props获取路由参数了
                // props: true,
                // props还可以设为函数，需要返回值，可以吧路由当做参数 传给这个props，然后函数里面可以使用参数里面的信息了 传递给路由组件使用
                // 然后这个函数里可以对路由中的参数进行一些操作 再传给组件，让组件使用
                props: (route) => ({ type: route.params.type }),
            },
```

##### 导航守卫

 可以通过一些方法监听导航的跳转，当进行路由进行跳转的时候，可以用导航守卫决定让你跳转还是不让跳。相当于一道关卡

- 全局前置守卫

  `$router.beforeEach((to, from, next) => {})` 在跳转之前触发

  ​	比如：管理系统（之前做过的那个表格）登录，管理系统一般没有登录不让进，可以用全局前置守卫来阻止

```js
router.beforeEach((to, from,next) => {
    console.log(to);
    console.log(from);
    // next相当于通行 写了它才能过去，否则过不去 继续往下执行，执行下一个钩子（去下一个关卡）
    next();
})
```

  例子

```js
const login = false
router.beforeEach((to, from, next) => {
    // to 是当前的路由
    console.log(to);
    // from 是去到的路由
    console.log(from);
    // next相当于通行 写了它才能过去，否则过不去
    if (to.path === '/') {
        next()
            // 如果在首页，放行
    } else {
        if (login) {
            next()
                // 登陆了，放行
        } else {
            alert('还没登录，请先登录')
            next("/")
        }
    }
    // next();
})
```

- 全局解析守卫

`router.beforeResolve((to,from,next)=>{})` 他会在全局前置守卫，组件内部守卫，独享守卫执行完之后执行，会在后置之前。

```js
router.beforeResolve((to, from, next) => {
    console.log("全局解析守卫");
    // if (to.path === "/" || login) next();
    // else alert("未登录，请先登录"), next("/");
    next();
});
```

- 全局后置钩子 

   不用next因为是跳转之后的触发

  ```js
  router.afterEach((to, from) => {
      console.log(to);
      console.log(from);
      console.log("全局后置钩子");
  });
  ```

- 路由独享守卫

  在路由数组中给路由定义一个独享的守卫，其他路由组件不可使用

  ```js
  const routes = [{
          path: "/",
          name: "Home",
          component: Home,
          beforeEnter: (to, from, next) => {
              // console.log(to);
              // console.log(from);
              console.log("Home 路由独享的守卫");
              next();
          },
      },
      ....
     }
  ```

  

- 组件内部守卫 

    在组件内部定义的守卫，只能在本组件内部使用

    	 - 组件内的路由跳转之前的守卫

  ```js
  beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      console.log("组件内的路由跳转之前的守卫");
      setTimeout(() => {
        const newNum = to.query.sort === "new" ? 1000 : 10000;
        // 在这个组件的路由守卫内想要获取组件实例的话，只能在 next 函数内获取  ,next 函数调用的时候传递的参数写成函数，该函数会默认接收组件实例作为参数
        next((vm) => {
          console.log(vm);
          // vm 就代表当前组件实例
          // vm.num = newNum
          vm.setNum(newNum);
        });
      }, 500);
      // next();
    },
  ```

  - 组件内的路由改变但是还是展示的该组件

    ```js
     beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        console.log("组件内的路由改变但是还是展示的该组件");
        setTimeout(() => {
          this.num = to.query.sort === "new" ? 1000 : 10000;
        }, 1000);
        next();
      },
          
    ```

  - 组件内的离开当前路由的守卫

    ```js
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        console.log("组件内的离开当前路由的守卫");
        next();
      },
          
    ```

##### 滚动行为

```js
scrollBehavior(to,from,savedPosition){
    if(savedPosition){
          // 当按下浏览器的前进后退按钮 savePoition 就存在，或者使用 路由的 router.back()  router.go() 等方法也可
        return savedPosition;
    }else{
        //不是上述的那些操作就用这个
        return{
            x:0,
            y:0
        }
    }
}
```

