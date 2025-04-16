import { create } from 'zustand'

const useAuthStore = create((set) => {
  // Leer del localStorage si hay datos guardados
  const storedToken = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')

  return {
    token: storedToken || null,
    user: storedUser ? JSON.parse(storedUser) : null,

    login: (token, user) => {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      set({ token, user })
    },

    logout: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      set({ token: null, user: null })
    }
  }
})

export default useAuthStore
