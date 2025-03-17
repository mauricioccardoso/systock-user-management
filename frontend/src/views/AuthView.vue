<template>
  <v-container class="d-flex justify-center align-center fill-height w-auto">
    <v-card class="pa-12 pb-8 w-100 w-sm-75 w-lg-50 w-xl-25" elevation="8" rounded="lg">
      <v-img class="mx-auto my-6" max-width="100" src="../../public/favicon.ico"></v-img>
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>

      <v-text-field
        v-model="credencials.email"
        :rules="[rules.required, rules.emailValidate]"
        density="compact"
        placeholder="Insira seu email"
        variant="outlined"
      ></v-text-field>

      <div
        class="mt-2 text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Senha
        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer">
          Esqueceu a senha?
        </a>
      </div>

      <v-text-field
        v-model="credencials.password"
        class="dark-icon"
        :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPass ? 'text' : 'password'"
        density="compact"
        placeholder="Insira sua senha"
        :rules="[rules.required, rules.min]"
        variant="outlined"
        @click:append-inner="showPass = !showPass"
      ></v-text-field>

      <v-btn class="mt-8 mb-8" color="blue" size="large" variant="tonal" block @click="login()">
        Entrar
      </v-btn>

      <v-divider>ou</v-divider>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          @click..prevent="toRegister()"
        >
          Criar conta?
        </a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router'
import httpApiClient from '@/service'
import { useNotificationStore } from '@/stores/notification.store'
import { useUserDataStore } from '@/stores/user.store'
import type { AxiosError, AxiosResponse } from 'axios'
import { ref, type Ref } from 'vue'

const showPass: Ref<boolean> = ref(false)
const credencials: Ref<{ email: string; password: string }> = ref({
  email: 'mauricio@mail.com',
  password: 'Erickdk11',
})

const rules = {
  required: (value: any) => !!value || 'Obrigatório.',
  emailValidate: (value: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Email inválido',
  min: (v: any) => v.length >= 8 || 'Min. 8 characters',
  emailMatch: () => `Credenciais inválidas`,
}

const userDataStore = useUserDataStore()
const { showNotification } = useNotificationStore()

const login = async () => {
  if (!credencials.value.email || !credencials.value.password) {
    return
  }

  const data = await httpApiClient
    .post('/login', credencials.value)
    .then(({ data }: AxiosResponse) => {
      return data
    })
    .catch((error: AxiosError) => {
      return error
    })

  if (data && (data as AxiosError).isAxiosError) {
    showNotification('Credenciais inválidas', 'error', 'Erro!')
    return
  }

  sessionStorage.setItem('ACCESS_TOKEN', data.token)
  userDataStore.setUserData(data.user)
  showNotification('Login realizado', 'success', 'Sucesso')
  await router.push({ name: 'home' })
}

const toRegister = () => {
  router.push({ name: 'register' })
}
</script>
