<template>
  <v-container>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-img class="mx-auto my-6" max-width="100" src="../../public/favicon.ico"></v-img>

      <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
      <v-text-field
        v-model="userData.name"
        :rules="[rules.required, rules.minName]"
        density="compact"
        placeholder="Insira seu nome"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Email</div>
      <v-text-field
        v-model="userData.email"
        :rules="[rules.required, rules.emailValidate]"
        density="compact"
        placeholder="Insira seu email"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">CPF</div>
      <v-text-field
        v-model="userData.cpf"
        :rules="[rules.required, rules.cpfSize]"
        density="compact"
        placeholder="Insira seu CPF"
        variant="outlined"
        @input="validateCpf"
      ></v-text-field>

      <div class="mt-2 text-subtitle-1 text-medium-emphasis">Senha</div>
      <v-text-field
        v-model="userData.password"
        class="dark-icon"
        :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPass ? 'text' : 'password'"
        density="compact"
        placeholder="Insira sua senha"
        :rules="[rules.required, rules.minPass]"
        variant="outlined"
        @click:append-inner="showPass = !showPass"
      ></v-text-field>

      <div class="mt-2 text-subtitle-1 text-medium-emphasis">Confirmação de Senha</div>
      <v-text-field
        v-model="userData.password_confirmation"
        class="dark-icon"
        :append-inner-icon="showConfirmPass ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showConfirmPass ? 'text' : 'password'"
        density="compact"
        placeholder="Confirme sua senha"
        :rules="[rules.required, rules.minPass, rules.matchPassword]"
        variant="outlined"
        @click:append-inner="showConfirmPass = !showConfirmPass"
      ></v-text-field>

      <v-btn class="mt-8 mb-8" color="blue" size="large" variant="tonal" block @click="register()">
        Criar Conta
      </v-btn>

      <v-divider>ou</v-divider>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          @click.prevent="toLogin()"
        >
          Já tem uma conta? Entrar
        </a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router'
import httpApiClient from '@/service'
import { useNotificationStore } from '@/stores/notification.store'
import type { AxiosError, AxiosResponse } from 'axios'
import { ref } from 'vue'

const notificationStore = useNotificationStore()

const userData = ref({
  name: '',
  email: '',
  cpf: '',
  password: '',
  password_confirmation: '',
})

const showPass = ref(false)
const showConfirmPass = ref(false)

const rules = {
  required: (value: string) => !!value || 'Este campo é obrigatório',
  minName: (value: string) => value.length >= 6 || 'O nome deve ter pelo menos 3 caracteres',
  emailValidate: (value: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Email inválido',
  cpfSize: (value: string) => value.length === 11 || 'O CPF deve ter 11 caracteres',
  minPass: (value: string) => value.length >= 8 || 'A senha deve ter pelo menos 8 caracteres',
  matchPassword: (value: string) => value === userData.value.password || 'As senhas não coincidem',
}

const validateCpf = (event: Event) => {
  userData.value.cpf = userData.value.cpf.replace(/\D/g, '')

  if (userData.value.cpf.length > 11) {
    userData.value.cpf = userData.value.cpf.slice(0, 11)
  }
}

const register = async () => {
  const data = await httpApiClient
    .post('/user', userData.value)
    .then(({ data }: AxiosResponse) => {
      return data
    })
    .catch((error: AxiosError) => {
      return error
    })

  if (data && (data as AxiosError).isAxiosError) {
    notificationStore.showNotification('Falha ao se cadastrar', 'error', 'Erro!')
    return
  }

  notificationStore.showNotification('Cadastro realizado com sucesso', 'success', 'Sucesso')
  await router.push({ name: 'login' })
}

const toLogin = () => {
  router.push({ name: 'login' })
}
</script>
