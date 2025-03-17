import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthDataStore = defineStore('authDataStore', () => {
  const isAuth = ref(false)

  const setIsAuth = async (value: boolean): Promise<void> => {
    isAuth.value = value
  }

  const clear = async () => {
    isAuth.value = false
    sessionStorage.clear()

    await router.push({ name: 'login' })
  }

  return { isAuth, setIsAuth, clear }
})
