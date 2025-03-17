import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

interface INotification {
  message?: string
  type?: 'success' | 'info' | 'warning' | 'error' | undefined
  title?: 'Sucesso' | 'Info' | 'Alerta' | 'Erro!' | undefined
}

export const useNotificationStore = defineStore('notificationStore', () => {
  const notification: Ref<INotification> = ref({})
  let timeoutId: NodeJS.Timeout | null = null

  const showNotification = (
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' | undefined,
    title?: 'Sucesso' | 'Info' | 'Alerta' | 'Erro!' | undefined,
  ): void => {
    clearNotificationTimeOut()

    notification.value.message = message
    notification.value.type = type
    notification.value.title = title

    timeoutId = setTimeout(() => {
      clearNotificationData()
    }, 3000)
  }

  const clearNotificationTimeOut = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      clearNotificationData()
    }
  }

  const clearNotificationData = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    delete notification.value.message
    delete notification.value.type
    delete notification.value.title
  }

  return { notification, showNotification, clearNotificationData }
})
