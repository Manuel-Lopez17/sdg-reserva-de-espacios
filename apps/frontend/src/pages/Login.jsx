import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/auth'
import { login, register } from '../api/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore(state => state.login)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      if (isRegistering) {
        const res = await register({ name, email, password })
        if (res.user) {
          // Hacemos login automático después del registro
          const loginRes = await login({ email, password })
          setAuth(loginRes.token, loginRes.user)
          navigate('/')
        }
      } else {
        const res = await login({ email, password })
        if (res.token && res.user) {
          setAuth(res.token, res.user)
          navigate('/')
        } else {
          setError('Error del servidor: falta token o usuario')
        }
      }
    } catch (err) {
      console.error("Auth error", err)
      const msg = err.response?.data?.message || 'Error al iniciar sesión o registrar'
      setError(msg)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80 space-y-3">
        <h2 className="text-xl font-semibold">{isRegistering ? 'Registro' : 'Iniciar sesión'}</h2>

        {error && <p className="text-red-500">{error}</p>}

        {isRegistering && (
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required={isRegistering}
          />
        )}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isRegistering}
            onChange={() => setIsRegistering(!isRegistering)}
          />
          ¿Registrar nuevo usuario?
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
        >
          {isRegistering ? 'Registrarse' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
