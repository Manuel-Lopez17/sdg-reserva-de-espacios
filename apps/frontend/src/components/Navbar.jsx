import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/auth'

export default function Navbar() {
  const { token, logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        {token && (
          <>
            {user?.role === 'user' && (
              <Link to="/reservas" className="hover:underline">Mis Reservas</Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="hover:underline">Admin</Link>
            )}
          </>
        )}
      </div>
      <div>
        {token ? (
          <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 hover:cursor-pointer">
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login" className="hover:underline">Iniciar sesión</Link>
        )}
      </div>
    </nav>
  )
}
