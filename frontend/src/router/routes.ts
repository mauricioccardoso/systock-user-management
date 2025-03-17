import AuthView from '@/views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: ReadonlyArray<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeView,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: AuthView,
    meta: { isGuest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { isGuest: true },
  },
]
