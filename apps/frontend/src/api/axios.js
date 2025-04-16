import axios from 'axios'
import useAuthStore from '../stores/auth'
import { toast } from 'sonner' // o el que uses

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Error inesperado en el servidor'

    // Mostrar el toast solo si no es un error de red (sin respuesta)
    if (error.response) {
      toast.error(message)
    } else {
      toast.error('No se pudo conectar con el servidor')
    }

    return Promise.reject(error) // seguir propagando el error
  }
)

export default api
