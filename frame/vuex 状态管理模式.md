### vuex 状态管理模式

实现组件之间通信的终极解决办法，将组件之间需要交互的数据共享到一个库（store）中.

vuex 需要额外创造一套逻辑来管理这些东西，适用于大型单页面网站。
[vuex](https://vuex.vuejs.org/zh/guide/state.html)

**创建**

- 安装 `npm i vuex --save`

- 在src下创建store.js 

  ```js
  import Vue from "vue";
  import Vuex from "vuex";
  Vue.use(Vuex);
  const store = new Vuex.Store({
      state: {
          num: 10,
          count: 20,
      },
      mutations: {
          add(state) {
              state.count++;
          },
      },
  });
  export efault store;
  ```

- main.js中导入 store 然后将store加到整个vue实例中

  ```js
  //main.js
  import Vue from "vue";
  import App from "./App.vue";
  import store from "./store";
  Vue.config.productionTip = false;
  
  new Vue({
      render: (h) => h(App),
      store,
  }).$mount("#app");
  ```
 **使用**
 - 组件内获取 store 中的数据
   一般和computed配合来用
  ```js
  	computed: {
    count() {
      return this.$store.state.count;
    },
  },
  ```

- 组件内修改用来存放数据的是 `state`

  ```js
  const store = new Vuex.Store({
      state: {
          num: 10,
          count: 20,
      },
      ...
  });
  ```
- 组件内修改 store的数据
 需要在创建store时定义好修改的方法，(创建mutation)
 ```js
 const store = new Vuex.Store({
    ...
    mutations: {
        add(state) {
            state.count++;
        },
    },
});
 ```
- 在组件内使用`store.commit('add') 来修改store的数据`
  

### mutation
**mutation 是同步函数，不能放异步操作！！！**
mutation 是用来修改store内的数据的，想要调用mutation中的函数来个更改state中的数据中的话要用$store.commit()

- 组件内使用
```js
 methods: {
    changeNum() {
      // this.$store.commit("changeNum", 100); 传单个参数时
      // this.$store.commit("changeNum", { num: 100, min: 1 }); 可以传多个参数，参数对象形式
      // 对象传参形式，这样type是mutation的名字，后面的都是payload
      this.$store.commit({ type: "changeNum", num: 100 });
    },
  },
```
- store.js 中使用
```js
  mutations: {
        ...
        changeNum(state, payload) {
            // payload 是接受的参数
            console.log(payload);

            state.num = payload.num;
        },
    },
```
#### mutations 中的函数名可以定义成常量，可以使项目规范化。别人也可以一目了然
- 创建一个 mutation-type.js 存放定义好的常量（mutation中的函数名）
```js
const ADD = "ADD";
const CHANGENUM = "CHANGENUM";
export { ADD, CHANGENUM };
```
- 组件中
```js
//导入 mutation-type.js
import { CHANGENUM } from "../mutation-type";
 methods: {
 
    CHANGENUM() {
      // this.$store.commit("changeNum", 100); 传单个参数时
      // this.$store.commit("changeNum", { num: 100, min: 1 }); 可以传多个参数，参数对象形式
      // 对象传参形式，这样type是mutation的名字，后面的都是payload
      //type这里就可以用常量了
      this.$store.commit({ type: CHANGENUM, num: 100 });
    },
  },
```
- store.js 中

```js
import { ADD, CHANGENUM } from "./mutation-type";
......
const store = new Vuex.Store({
    state: {
        num: 10,
        count: 20,
    },
    mutations: {
        [ADD](state) {
            state.count++;
        },
        [CHANGENUM](state, payload) {
            // payload 是接受的参数
            console.log(payload);

            state.num = payload.num;
        },
    },
});
```
**mutation 是同步函数，不能放异步操作！！！**
要想获取异步数据之后可以用created获取之后然后使用commit提交给mutation修改数据
组件中
```js
created() {
    setTimeout(() => {
      this.$store.commit("getArr", [1, 2, 3]);
    }, 2000);
  },
```
store中 
```js
 mutations: {
        ...
        getArr(state, payload) {
            state.arr = payload;
        },
    },
```
#### mapMutations 
vuex 提供的辅助函数，将store内的method，并内部自带commit功能
组件内
```js
import { mapMutations } from "vuex";
  methods: {
    ...mapMutations([ADD]),
    //{...}对象展开运算符
    // mapMutations 就是下面代码的映射，
    // [ADD]() {
    //   this.$store.commit(ADD);
    // },
  },
};
```
- 如果methods中只有提交的函数话可以写成
```js
 methods: mapMutations([ADD]),
```
#### mapState 简化计算属性的辅助函数
```js
import {mapState } from "vuex";
computed: {
    ...mapState(["count"]),
    // count() {
    //   return this.$store.state.count;
    // },
  },
```

#### mutation 需遵守Vue的响应规则
- 最好提前在store中初始化好所有所需属性
- 当需要给对象添加新属性(或更改属性值时)
	- 使用 `Vue.set(obj,'newPro',123)` 这种只可以对根属性更改，不能对子级属性添加
	- 利用对象展开运算符 `state.obj={...state.obj,newprop:111}`

### Actions

和mutation类似，不同的是 
- `Ation 提交的是mutation，而不是直接改变数据`
- `Action 可以包含异步操作`
之前提到的mutation想要发送异步请求，需在组件中先发送好异步请求获取数据之后再提交给store，vuex想要所有操作都在库中实现，现在就可以通过action发送了异步请求之后然后在commit，这样axios就只在这个地方使用就可以了。
- **组件中**
```js
computed: {
    data() {
      return this.$store.state.data;
    },
  },
  methods: {
    getData() {
      //this.$store.dispatch("getData");
      // dispatch 向action提交，可以传参
       this.$store.dispatch({ type: "getData", num: 1 });
    },
  },
```
- **store中**
```js
 mutations: {
       ...
        getData(state, payload) {
            state.data = payload.data;
        },
    },
    actions: {
        getData(context) {
            setTimeout(() => {
                context.commit({ type: "getData", data: [10, 11, 12] });
            }, 1000);
        },
    },
```
#### 当然也有 mapActions 辅助方法 简化actions
```js
 methods: {
    // ...mapActions(["getData"]),
    // 想要穿传参可以用这种形式，mutation，state还有后面的getters都可这么用
    ...mapActions({
      get: {
        type: "getData",
        num: 1,
      },
    }),
    //上面代码是对下面代码的简化
    // getData() {
    //   //   this.$store.dispatch("getData");
    //   this.$store.dispatch({ type: "getData", num: 1 });
    // },
  },
```

### getters
帮助过滤state数据，对state数据进行一定操作后把想得到的数据返回给computed
```js
//组件内
computed:{
...mapGetters([;products])
}
//模块内
getters: {
        products(state, getters, rootState) {
            console.log(getters);

            const { productIdInCart, quantityById } = state.cart;
            const products = rootState.product.list;
            return productIdInCart.length ?
                productIdInCart.reduce((res, ele) => {
                    res.push({
                        ...products.find((item) => item.id === ele),
                        quantity: quantityById[ele],
                    });
                    return res;
                }, []) :
                [];
        },
      }
```
### modules
	vuex允许将store划分成模块，每个模块都拥有自己的 state，mutations，getters，Actions也可以有子模块,
	导入store中合并后，mutation，getters，Actions都会合并成公共的，state不可以，必须用 state.模块名.dataName
```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
//调用模块的state中的数据
this.$store.state.a
```
- 对于mutation只能接到局部的state（自己的）
- getter 可以接到局部state，根节点状态rootState
- action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
#### 命名空间
	通过添加`namespace：true`的方式让其成为带命名空间的模块。当模块被注册后，getters，mutations，actions不再被注册到全局，而是局部的，需要用路径调用
	子模块会继承父模块的命名空间
```js
		模块内
		const a = {
    namespaced: true,
    state: () => ({
        num: 1000,
    }),
    mutations: {
        changeNum(state, payload) {
            state.num = payload.num;
        },
    },
};
```
```js
	//组件内调用
	  methods: {
    changeNum() {
      this.$store.commit({ type: "a/changeNum", num: 2222 });
    },
  },
```
#### 在带命名空间的模块中注册全局action
```js
//组件内：
 methods: {
    // ...mapActions("b", ["add"]),
    ...mapActions(["add"]),

    // add() {
    //   this.$store.commit("b", ["add"]);
    // },
  },
};
//b modules:
const b = {
    namespaced: true,
    state: () => ({
        count: 11,
    }),
    mutations: {
        add(state) {
            console.log(this);
            state.count++;
        },
    },
    actions: {
        add: {
            root: true,
            handler({ commit }) {
                commit("add");
            },
        },
    },
};
export default b;
```
#### 简化带命名空间模块的绑定
```
	带命名空间的模块在调用时会很麻烦，可以简写成
	getters：mapGetters('模块名',[])
	mutations:mapMutations('模块名',[])
	actions:mapActions('模块名',[])
	state: ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
```
### 严格模式
开发模式下用严格模式，发布模式不能用严格模式
`strict:process.env.NODE_ENV !== 'production'` 这一句是在说发布后取消严格模式
- 加上严格模式，无论何时发生状态的更改不是有mutations函数引起的都会抛出错误，虽然抛出错误，但是页面上还是会更改的
```js
store.js
export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state: {
        obj: {
            name: "lily",
            age: 20,
        },
    },
    mutations: {
        
    },
    actions: {},
    modules: {},
});
```
```
组件内
export default {
  name: "StrictModel",
  computed: {
    ...mapState(["obj"]),
  
  },
 
  methods: {
    change() {
      this.obj.age = 10;
    
    },
  },
};
```
### v-model 在 vuex中使用
在修改对象的属性值时，必须针对的是对象的属性值，而不能是整个对象，因为set是用来修改数据来源的，一定要具体，改变属性值并不改变改对象的地址，所以也不能触发set
```
<template>
  <div>
    <h2>vuex 中 使用 v-model</h2>
    <div><input type="text" v-model="objName" /></div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "VmodelDemo",
  computed: {
    // ...mapState(["obj"]),
    // 在修改对象的属性值时，必须针对的是对象的属性值，而不能是整个对象，因为set是用来修改数据来源的，一定要具体，改变属性值并不改变改对象的地址，所以也不能触发set
    objName: {
      get() {
        return this.$store.state.obj.name;
      },
      set(newVal) {
        this.$store.commit({ type: "changeName", name: newVal });
      },
    },
  },
};
</script>

<style scoped></style>

```
###  一些知识点

