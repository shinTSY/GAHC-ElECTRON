import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
const Main = () => import('../views/Main.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  }
]

const router = new VueRouter({
  routes
})

export default router
