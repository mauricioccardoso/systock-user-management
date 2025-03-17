<template>
  <Navbar />
  <v-container class="d-flex justify-center align-center">
    <v-btn color="red" @click="authDataStore.clear()"> Logout </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import { useAuthDataStore } from '@/stores/authData.store'

const authDataStore = useAuthDataStore()
</script>
