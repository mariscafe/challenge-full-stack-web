import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/studentsGrid',
    name: 'StudentsGrid',
    // route level code-splitting
    // this generates a separate chunk (studentsGrid.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "studentsGrid" */ '../views/studentsGrid.vue')
  },
  {
    path: '/studentsForm',
    name: 'StudentsForm',
    component: () => import(/* webpackChunkName: "studentsForm" */ '../views/studentsForm.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
