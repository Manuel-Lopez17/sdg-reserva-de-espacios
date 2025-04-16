import { useEffect, useState } from 'react'
import {
  getPendingReservations,
  approveReservation,
  rejectReservation
} from '../api/reservations'
import ReservaCard from '../components/ReservaCard'

export default function AdminPanel() {
  const [reservas, setReservas] = useState([])

  useEffect(() => {
    getPendingReservations()
      .then(setReservas)
      .catch(err => console.error('Error al obtener reservas pendientes:', err))
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

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Reservas Pendientes</h1>
      {reservas.length === 0 ? (
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
