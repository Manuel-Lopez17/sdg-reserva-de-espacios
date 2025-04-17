import React, { useEffect, useState } from 'react'
import {
  getUserReservations,
  deleteReservation
} from '../api/reservations'

export default function UserReservations() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchReservas = () => {
    setLoading(true)
    getUserReservations()
      .then(setReservas)
      .finally(() => setLoading(false))
  }

  const handleCancelar = (id) => {
    deleteReservation(id).then(() => fetchReservas())
  }

  useEffect(() => {
    fetchReservas()
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Mis Reservas</h1>

      {loading ? (
        <p className="text-gray-600">Cargando reservas...</p>
      ) : reservas.length === 0 ? (
        <p className="text-gray-500 italic">No tenés reservas todavía.</p>
      ) : (
        <ul className="space-y-2">
          {reservas.map(res => (
            <li key={res.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <p><strong>Espacio:</strong> {res.space?.name}</p>
                <p><strong>Fecha:</strong> {new Date(res.start_time).toLocaleDateString()}</p>
                <p><strong>Estado:</strong> {res.status}</p>
                <button
                  onClick={() => handleCancelar(res.id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
