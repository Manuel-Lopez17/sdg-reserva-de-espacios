import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSpaceById } from '../api/spaces'
import { createReservation } from '../api/reservations'

export default function ReservePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [space, setSpace] = useState(null)
  const [date, setDate] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    getSpaceById(id).then(setSpace).catch(console.error)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      await createReservation({
        space_id: id,
        start_time: `${date} 00:00:00`,
        end_time: `${date} 23:59:59`
      })
      navigate('/reservas')
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Error al crear la reserva')
      }
    }
  }

  if (!space) return <p>Cargando espacio...</p>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Reservar {space.name}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer">
          Confirmar Reserva
        </button>
      </form>
    </>
  )
}
