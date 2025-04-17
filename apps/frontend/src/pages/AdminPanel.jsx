import { useEffect, useState } from 'react'
import {
  getPendingReservations,
  approveReservation,
  rejectReservation
} from '../api/reservations'
import ReservaCard from '../components/ReservaCard'

export default function AdminPanel() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [noReservations, setNoReservations] = useState(false)

  useEffect(() => {
    getPendingReservations()
      .then(data => {
        setReservas(data)
        setLoading(false)
        setNoReservations(data.length === 0)
      })
      .catch(err => {
        console.error('Error al obtener reservas pendientes:', err)
        setLoading(false)
      })
  }, [])

  const manejarAccion = async (id, accion) => {
    try {
      if (accion === 'aprobar') await approveReservation(id)
      else if (accion === 'rechazar') await rejectReservation(id)

      setReservas(prev => prev.filter(r => r.id !== id))
    } catch (error) {
      console.error('Error al actualizar la reserva:', error)
    }
  }

  if (loading) {
    return <div className="text-center">Cargando...</div>
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Reservas Pendientes</h1>
      {noReservations ? (
        <p>No hay reservas pendientes.</p>
      ) : (
        <ul className="space-y-4">
          {reservas.map(reserva => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              onAccion={manejarAccion}
            />
          ))}
        </ul>
      )}
    </>
  )
}
