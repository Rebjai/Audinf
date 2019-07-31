import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import TecStack from './views/TecStack.vue'
import Thome from './views/THome.vue'
import Shome from './views/SHome.vue'
import Continue from './views/Continue.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: TecStack
    },
    {
      path: '/shome',
      name: 'shome',
      component: Shome
    },
    {
      path: '/thome',
      name: 'thome',
      component: Thome
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/stack',
      name: 'tec-stack',
      component: TecStack
    },
    {
      path: '/continue',
      name: 'continue',
      component: Continue
    }

  ]
})
