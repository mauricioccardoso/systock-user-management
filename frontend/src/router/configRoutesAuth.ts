// import { useAuthDataStore } from '@/stores/AuthDataStore'

import httpApiClient from '@/service'
import { useAuthDataStore } from '@/stores/authData.store'
import type { AxiosError, AxiosResponse } from 'axios'

export async function configRoutesAuth(to: any, from: any, next: any): Promise<void> {
  let authDataStore = useAuthDataStore()

  if (sessionStorage.getItem('ACCESS_TOKEN') && !authDataStore.isAuth) {
    await checkToken()
  }

  if (to.meta.requiresAuth && !authDataStore.isAuth) {
    next({ name: 'login' })
  } else if (to.meta.isGuest && authDataStore.isAuth) {
    next({ name: 'home' })
  } else {
    next()
  }
}

async function checkToken(): Promise<void> {
  let { setIsAuth } = useAuthDataStore()

  const data = await httpApiClient
    .get('/check')
    .then(({ data }: AxiosResponse) => {
      return data
    })
    .catch((error: AxiosError) => {
      return error
    })

  if (data && (data as AxiosError).isAxiosError) {
    await setIsAuth(false)
    return
  }

  await setIsAuth(true)
}
