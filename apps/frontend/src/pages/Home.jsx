import { useEffect, useState } from 'react'
import { getSpaces } from '../api/spaces'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [spaces, setSpaces] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getSpaces()
      .then(data => setSpaces(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Espacios Disponibles</h1>
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
    </>
  )
}
