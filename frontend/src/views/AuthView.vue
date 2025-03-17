<template>
  <v-container class="mt-16">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-img class="mx-auto my-6" max-width="100" src="../../public/favicon.ico"></v-img>
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>

      <v-text-field
        v-model="credencials.email"
        :rules="[rules.required, rules.min]"
        density="compact"
        placeholder="Insira seu email"
        variant="outlined"
      ></v-text-field>

      <div
        class="mt-2 text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Senha
        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer">
          Esqueceu a senha?</a
        >
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
import { useUserDataStore } from '@/stores/user.store'
import type { AxiosError, AxiosResponse } from 'axios'
import { ref, type Ref } from 'vue'

const showPass: Ref<boolean> = ref(false)
const credencials: Ref<{ email: string; password: string }> = ref({
  email: '',
  password: '',
})

const rules = {
  required: (value: any) => !!value || 'Obrigatório.',
  min: (v: any) => v.length >= 8 || 'Min. 8 characters',
  emailMatch: () => `Credenciais inválidas`,
}

const userDataStore = useUserDataStore()

const login = async () => {
  const data = await httpApiClient
    .post('/login', credencials.value)
    .then(({ data }: AxiosResponse) => {
      return data
    })
    .catch((error: AxiosError) => {
      return error
    })

  if (data && (data as AxiosError).isAxiosError) {
    return
  }

  sessionStorage.setItem('ACCESS_TOKEN', data.token)
  userDataStore.setUserData(data.user)
  await router.push({ name: 'home' })
}

const toRegister = () => {
  router.push({ name: 'register' })
}
</script>
