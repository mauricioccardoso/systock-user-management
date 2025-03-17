import { createRouter, createWebHistory } from 'vue-router'
import { configRoutesAuth } from './ConfigRoutesAuth'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(configRoutesAuth)

export default router
