import Vue from 'vue'
import Router from 'vue-router'
import Store from './store'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./views/Order.vue'),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: () => import('./views/Transaction.vue'),
      meta: { 
        requiresAuth: true,
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue'),
      meta: { 
        requiresAuth: true,
        adminRole:true
      }
    },
    { 
      path:  '/login',
      name:  'login',
      component: () => import('./views/Login.vue')

    },
    {
      path:'/forbidden',
      name:  'forbidden',
      component: () => import('./views/Forbidden.vue')

    },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Store.state.is_login) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
export default  router;