import { Navigate } from 'react-router-dom'
import useAuthStore from '../stores/auth'

export default function PrivateRoute({ children, requiredRole }) {
  const { token, user } = useAuthStore()

  if (!token) return <Navigate to="/login" />

  // Si hay requiredRole y el usuario no lo cumple, redirigimos
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/login" />
  }

  return children
}
