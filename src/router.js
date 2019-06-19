import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import User from './views/User'
import Stock from './views/Stock'
import Admin from './views/admin'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component:About
    },
    {
      path: '/user',
      name: 'user',
      component:User
    },
    {
      path: '/admin',
      name: 'admin',
      component:Admin
    },
    {
      path: '/stock/:id',
      name: 'Stock',
      component: Stock
    },
  ]
})
