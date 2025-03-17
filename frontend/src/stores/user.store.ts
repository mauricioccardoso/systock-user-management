import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

type IUserData = {
  id: number | null
  name: string | null
  email: string | null
  cpf: string | null
}

export const useUserDataStore = defineStore('userDataStore', () => {
  const userData: Ref<IUserData> = ref({
    id: null,
    name: null,
    email: null,
    cpf: null,
  })

  const setUserData = (data: IUserData): void => {
    userData.value = { ...data }
  }

  const clear = (): void => {
    userData.value.id = null
    userData.value.name = null
    userData.value.email = null
    userData.value.cpf = null
  }

  return { userData, setUserData, clear }
})
