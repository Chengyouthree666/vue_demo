import { createApp }  from 'vue'
import * as VueRouter from 'vue-router'
import './style.css'
import App from './App.vue'

// -------------------------------vue-router---------------------------------
const routes = [
  { path: '/', component: ()=> import('./view/home/index.vue') },
  { path: '/threejs', component: ()=> import('./view/threejs/index.vue') },
]
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
// -------------------------------vue-router---------------------------------
createApp(App).use(router).mount('#app')

