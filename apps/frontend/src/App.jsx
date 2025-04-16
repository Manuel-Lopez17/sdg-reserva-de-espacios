import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import UserReservations from './pages/UserReservations'
import AdminPanel from './pages/AdminPanel'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import useAuthStore from './stores/auth'
import ReservePage from './pages/ReservePage'
import { Toaster } from 'sonner'

export default function App() {
  const token = useAuthStore(state => state.token)

  return (
    <div>
      {token && <Navbar />}
      <div className='p-4 flex flex-col'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/reservar/:id" element={<PrivateRoute><ReservePage requiredRole="user"/></PrivateRoute>} />
          <Route path="/reservas" element={<PrivateRoute><UserReservations requiredRole="user"/></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute requiredRole="admin"><AdminPanel /></PrivateRoute>} />
        </Routes>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  )
}
