<template>
  <v-container class="d-flex justify-start">
    <v-alert
      class="position-fixed top-0 right-0 mt-4 mr-4"
      :text="notificationStore.notification.message"
      :title="notificationStore.notification.title"
      :type="notificationStore.notification.type"
    ></v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification.store'

const notificationStore = useNotificationStore()
</script>
