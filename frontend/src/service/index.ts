import axios, { type InternalAxiosRequestConfig } from 'axios'

import type { AxiosInstance } from 'axios'

export const baseURL: string = 'http://localhost:8080/api'

const httpApiClient: AxiosInstance = axios.create({
  baseURL,
})

httpApiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token: string | null = sessionStorage.getItem('ACCESS_TOKEN')

  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default httpApiClient
