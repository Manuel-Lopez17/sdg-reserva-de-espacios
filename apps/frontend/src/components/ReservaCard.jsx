export default function ReservaCard({ reserva, onAccion }) {
  return (
    <li className="border p-4 rounded shadow">
      <p><strong>Espacio:</strong> {reserva.space?.name}</p>
      <p><strong>Descripción:</strong> {reserva.space?.description}</p>
      <p><strong>Usuario:</strong> {reserva.user?.name} ({reserva.user?.email})</p>
      <p><strong>Fecha:</strong> {new Date(reserva.start_time).toLocaleString()}</p>
      <div className="space-x-2 mt-2">
        <button
          className="bg-green-600 text-white px-3 py-1 rounded hover:cursor-pointer"
          onClick={() => onAccion(reserva.id, 'aprobar')}
        >
          Aprobar
        </button>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 hover:cursor-pointer"
          onClick={() => onAccion(reserva.id, 'rechazar')}
        >
          Rechazar
        </button>
      </div>
    </li>
  )
}
