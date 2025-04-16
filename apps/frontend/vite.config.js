import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Esto permite acceder desde fuera del contenedor
    port: 5173,
    open: false, // Abre automáticamente el navegador si lo deseas
  },
})
