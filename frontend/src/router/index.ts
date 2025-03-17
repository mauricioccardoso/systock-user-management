import { createRouter, createWebHistory } from 'vue-router'
import { configRoutesAuth } from './configRoutesAuth'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(configRoutesAuth)

export default router
