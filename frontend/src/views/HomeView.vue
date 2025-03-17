<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-btn color="red" @click="authDataStore.clear()"> Logout </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthDataStore } from '@/stores/authData.store'

const authDataStore = useAuthDataStore()
</script>
