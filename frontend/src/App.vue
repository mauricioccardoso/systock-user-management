<template>
  <RouterView />

  <NotificationCard v-if="notificationStore.notification?.message" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotificationCard from './components/NotificationCard.vue'
import { useNotificationStore } from './stores/notification.store'

const notificationStore = useNotificationStore()
</script>
