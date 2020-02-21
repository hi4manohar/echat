import Vue from 'vue'
import VueRouter from 'vue-router'

import fb from '../db/firebase.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(dest => dest.meta.requiresAuth)
  const currentUser = fb.auth.currentUser

  console.log('hi')

  if (requiresAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
