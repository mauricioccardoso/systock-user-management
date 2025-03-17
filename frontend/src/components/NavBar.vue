<template>
  <v-card class="mx-auto" color="blue-grey-darken-4">
    <v-layout>
      <v-app-bar color="blue-grey-darken-4" image="https://picsum.photos/1920/1080?random">
        <template v-slot:image>
          <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
        </template>

        <v-app-bar-title>Home</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-account-circle" variant="text" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :value="i"
                @click="handleClick(item.action)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-app-bar>

      <v-main class="mt-6 d-flex flex-wrap">
        <Modal v-model="showProfileModal" />
        <v-skeleton-loader
          v-for="(item, index) in Array(20).fill(0)"
          class="mx-auto mt-4"
          elevation="12"
          max-width="400"
          type="table-heading, list-item-two-line, image, table-tfoot"
        ></v-skeleton-loader>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'
import { useAuthDataStore } from '@/stores/authData.store'

const authDataStore = useAuthDataStore()
const showProfileModal = ref(false)

const items = ref([
  { title: 'Meu perfil', action: () => (showProfileModal.value = true) },
  { title: 'Encerrar sessão', action: authDataStore.clear },
])

const handleClick = (action: () => void) => {
  action()
}
</script>
