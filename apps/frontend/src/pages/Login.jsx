import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/auth'
import { login } from '../api/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const setAuth = useAuthStore(state => state.login) // Usamos setAuth para almacenar token y rol

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }) // res.token y res.user
      if (res.token && res.user) {
        setAuth(res.token, res.user)
        navigate('/')
      } else {
        setError('Error del servidor: falta token o usuario')
      }
    } catch (err) {
      console.error("Login error", err)
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Iniciar sesión</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 hover:cursor-pointer">
          Entrar
        </button>
      </form>
    </div>
  )
}
