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
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getSpaceById(id).then(setSpace).catch(console.error)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

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
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!space) return <p className="text-gray-600">Cargando espacio...</p>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Reservar {space.name}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Fecha:</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded text-white ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer'
          }`}
        >
          {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
        </button>
      </form>
    </>
  )
}
