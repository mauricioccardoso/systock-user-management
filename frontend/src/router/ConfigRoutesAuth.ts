// import { useAuthDataStore } from '@/stores/AuthDataStore'

import httpApiClient from '@/service'
import { useAuthDataStore } from '@/stores/AuthDataStore'
import type { AxiosError, AxiosResponse } from 'axios'

export async function configRoutesAuth(to: any, from: any, next: any): Promise<void> {
  const { isAuth } = useAuthDataStore()

  if (sessionStorage.getItem('ACCESS_TOKEN') && !isAuth) {
    await checkToken()
  }

  if (to.meta.requiresAuth && !isAuth) {
    next({ name: 'login' })
  } else if (to.meta.isGuest && isAuth) {
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
    setIsAuth(false)
    return
  }

  setIsAuth(true)
}
