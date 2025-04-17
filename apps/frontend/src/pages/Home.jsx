import { useEffect, useState } from 'react'
import { getSpaces } from '../api/spaces'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [spaces, setSpaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [noSpaces, setNoSpaces] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getSpaces()
      .then(data => {
        setSpaces(data)
        setLoading(false)
        setNoSpaces(data.length === 0)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="text-center">Cargando...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Espacios Disponibles</h1>
      {noSpaces ? (
        <p>No hay espacios disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spaces.map(space => (
            <div
              key={space.id}
              className="border rounded-lg p-4 shadow hover:cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/reservar/${space.id}`)}
            >
              <h2 className="text-xl font-semibold">{space.name}</h2>
              <p className="text-gray-600">{space.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
