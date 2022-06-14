 vue-router-dispatch:Vue 基于 vue-router 的插件
 ================================
 
 vue-router-dispatch 是一个 Vue 插件，用于在路由单元中派发事件。仅仅适用于setup组件。

 Installation and Usage
 ----
  * 安装库
    ```
    npm install vue-router-dispatch
    // npm i git+https://github.com/HLoveMe/vue-router-dispatch.git
    ```
  * 引入插件
    ```
    import { VueRouterPin } from 'vue-router-dispatch'
    import { createRouter } from 'vue-router';
    import { createApp } from 'vue';
    // 创建路由
    const router = createRouter({});
    const app = createApp(App);
    // 注册路由
    app.use(router);
    // 事件Pin 注册
    // app.use(VueRouterPin);
    VueRouterPin.install(app);
    ```
  * 使用事件Pin，在路由单元中派发事件
  
    * Route单元
  
      ```
      // 每个 RouteRecordRaw 就是一个路由单元。
      // 在component组件下，所有的子组件都属于该单元的一部分
      createRouter({
        routes:RouteRecordRaw[],
        routes:[
          {
            name: 'home',
            path: '/',
            component: Home,
          },
          {
            path: 'login',
            component: require('./login').default,
          },
        ]
      });
      ```

    * Router 单元
  
      ```
      // router 为最大的单元，所有子单元都可以接受到事件。
      const router = createRouter({
        routes:RouteRecordRaw[],
      });
      ```
  * Pin事件的注册和派发 适用于setup
  
    ```
    // Home
    <script lang="ts" setup>
    import { useRoutePin } from 'vue-router-dispatch';
    const { on,dispatch} = useRoutePin();
    on('eventName', (payload) => {
      // do something
    });
    // 事件派发方式1
    dispatch('eventName', {});
    </script>

    // 整个应用
    import { dispatchEvent } from 'vue-router-dispatch';
    事件派发方式2
    dispatchEvent('eventName', {});
    ```

  * API
    * useRoutePin 适用于 RouteRecordRaw 作为单元，进行事件派发
      ```
      import { useRoutePin } from 'vue-router-dispatch';
      const { on,dispatch} = useRoutePin();
      on('eventName', (payload) => {
        // do something
      });
      //RouteRecordRaw下：事件派发
      dispatch('eventName', {});
      ```
  
    * useRouterPin 适用于 Router 最为单元的事件派发。所有的RouteRecordRaw单元也可以接受到事件

      ```
      import { useRouterPin } from 'vue-router-dispatch';
      const { on,dispatch} = useRouterPin();
      on('eventName', (payload) => {
        // do something
      });
      //Router下：事件派发
      dispatch('eventName', {});
      ```
    
    * dispatchEvent 用于任意事件派发。默认全局派发，可以指定单元派发
  
    * 事件注册和注销
      ```
        const pin:RoutePin = useRoutePin();
        const clear1 = pin.on('eventName', (payload) => {
          // do something
        });
        const clear2 = pin.once('eventName2', (payload) => {
          // do something
        });
        // 注销
        clear1.close();
        clear2.close();
      ```
      * on(type: string | RegExp, callback: EventCallBack) 用于事件注册
      * once(type: string | RegExp, callback: EventCallBack) 仅仅会触发一次
      * onError(callback: (error: Error) => void) 错误处理
      * onBehavior(type: string | RegExp, callback: EventCallBack) 注册时，会接受到该事件上一次触发的数据，回调函数执行
      * dispatch(type: string, data: any) 用于该单元下的事件派发
      * dispatchAsync(type: string, data: any): Promise<any> 支持异步事件派发，并得到所有触发的返回值


  * 异步触发
    针对回调函数异步触发。等待所有回调函数都调用完成后，才会执行下一步操作。

    ```
      import { useRoutePin ,dispatchEvent} from 'vue-router-dispatch';
        const pin:RoutePin = useRoutePin();
        const clear1 = pin.on('eventName', ({data,resolve,reject}) => {
          // 异步是可选的，如果不需要异步，不回调
          resolve({}) // reject({})
        });

        // 该单元内触发
        await pin.dispatchAsync('eventName', {});

        // 全局触发
        await dispatchEvent('eventName', {},true);
    ```
  