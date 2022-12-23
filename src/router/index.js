import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import Main from '../components/Main'
import Account from '../components/Account'
import Info from '../components/Info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      props: true,
    },
    // {
    //   path: '/',
    //   name: 'Info',
    //   component: Info,
    //   props: true,
    // },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      props: true,
    },
    {
      path:'/account',
      name: 'Account',
      component: Account,
      props: true,
    },
    {
      path:'/info',
      name: 'Info',
      component: Info,
      props: true,
    }
  ]
})
