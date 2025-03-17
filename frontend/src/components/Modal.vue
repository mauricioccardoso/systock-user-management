<template>
  <v-dialog v-model="isActive" max-width="500">
    <v-card title="Meu Perfil">
      <v-card-text> Conteúdo do perfil aqui... </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Fechar" @click="isActive = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineModel } from 'vue'

const isActive = defineModel<boolean>()
</script>
