import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth } from "firebase/auth";

import { firebase, db } from "@/firebase-config";
const auth = getAuth(firebase)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {auth: true},
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {auth: true},
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {auth: true},
    component: () => import('../views/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {auth: true},
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {auth: true},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {auth: true},
    component: () => import('../views/Record.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  const requiredAuth = to.matched.some(r => r.meta?.auth)
  if (!auth.currentUser && requiredAuth) {
      next('/login?message=login')
      return
  }

  next()

})

export default router
