import { createApp } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from './components/Main.vue'
import App from './App.vue'
import { VueRouterPin } from 'vue-router-dispatch';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    name:'home',
    path:'/',
    component:Home
  }] as RouteRecordRaw[],
});

const app = createApp(App)
app.use(router);
app.use(VueRouterPin)
app.mount('#app')

