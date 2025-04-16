import React, { useEffect, useState } from 'react'
import {
  getUserReservations,
  deleteReservation
} from '../api/reservations'

export default function UserReservations() {
  const [reservas, setReservas] = useState([])

  const fetchReservas = () => {
    getUserReservations().then(setReservas)
  }

  const handleCancelar = (id) => {
    deleteReservation(id).then(() => fetchReservas())
  }

  useEffect(() => {
    fetchReservas()
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold">Mis Reservas</h1>

      <ul className="space-y-2">
        {reservas.map(res => (
          <li key={res.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p><strong>Espacio:</strong> {res.space?.name}</p>
              <p><strong>Fecha:</strong> {new Date(res.start_time).toLocaleDateString()}</p>
              <p><strong>Estado:</strong> {res.status}</p>
              <button
                onClick={() => handleCancelar(res.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
