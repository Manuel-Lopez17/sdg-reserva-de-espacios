<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Space;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * ReservationController maneja las operaciones relacionadas con las reservas de espacios.
 * Permite crear, listar, cancelar y gestionar el estado de las reservas.
 */
class ReservationController extends Controller
{
    use AuthorizesRequests;

    /**
     * Crear una nueva reserva.
     *
     * @route POST /api/reservations
     * @param \Illuminate\Http\Request $request Los datos de la reserva.
     * @return \Illuminate\Http\JsonResponse
     *
     * Este método valida los datos de la reserva (espacio, tiempo de inicio y fin),
     * luego verifica si ya existe una reserva pendiente o aprobada para el espacio en la misma fecha.
     * Si no existe, crea una nueva reserva con el estado "pending".
     */
    public function store(Request $request)
    {
        // Validación de los datos de la reserva
        $request->validate([
            'space_id' => 'required|exists:spaces,id',
            'start_time' => 'required|date|after_or_equal:today',
            'end_time' => 'required|date|after:start_time',
        ]);

        // Obtención del usuario actual
        $userId = Auth::id();
        $spaceId = $request->space_id;
        $date = Carbon::parse($request->start_time)->toDateString(); // Solo año-mes-día

        // Verificación de si ya existe una reserva aprobada o pendiente para el espacio y día solicitados
        $exists = Reservation::where('space_id', $spaceId)
            ->whereDate('start_time', $date)
            ->whereIn('status', ['pending', 'approved'])  // Solo considera las reservas con estado 'pending' o 'approved'
            ->exists();

        // Si ya existe una reserva aprobada o pendiente, se devuelve un error
        if ($exists) {
            return response()->json([
                'message' => 'Ya existe una reserva aprobada o pendiente para este espacio en esa fecha.'
            ], 422);
        }

        // Creación de la reserva
        $reservation = Reservation::create([
            'user_id' => $userId,
            'space_id' => $spaceId,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'status' => 'pending',  // Se establece como 'pending' por defecto
        ]);

        // Respuesta de éxito
        return response()->json([
            'message' => 'Reserva creada exitosamente.',
            'reservation' => $reservation
        ], 201);
    }

    /**
     * Listar las reservas del usuario autenticado.
     *
     * @route GET /api/reservations
     * @return \Illuminate\Http\JsonResponse
     *
     * Este método retorna todas las reservas del usuario autenticado,
     * incluyendo los detalles del espacio reservado.
     */
    public function index()
    {
        // Obtención de reservas del usuario autenticado con los detalles del espacio
        $reservations = Reservation::with('space')
            ->where('user_id', Auth::id())
            ->get();

        // Retorno de las reservas
        return response()->json($reservations);
    }

    /**
     * Cancelar una reserva.
     *
     * @route DELETE /api/reservations/{id}
     * @param int $id El ID de la reserva a cancelar.
     * @return \Illuminate\Http\JsonResponse
     *
     * Este método permite cancelar una reserva si el usuario autenticado
     * es el propietario de la misma. Si no es así, devuelve un error.
     */
    public function destroy($id)
    {
        // Buscar la reserva por ID
        $reservation = Reservation::findOrFail($id);

        // Verificar que la reserva pertenece al usuario autenticado
        if ($reservation->user_id !== Auth::id()) {
            return response()->json(['message' => 'Solo puedes cancelar tus propias reservas'], 403);
        }

        // Eliminar la reserva
        $reservation->delete();

        // Respuesta de éxito
        return response()->json(['message' => 'Reserva cancelada']);
    }

    /**
     * Listar las reservas pendientes de aprobación (solo para administradores).
     *
     * @route GET /api/reservations/pending
     * @return \Illuminate\Http\JsonResponse
     *
     * Este método permite a los administradores ver todas las reservas pendientes
     * de aprobación, incluyendo los detalles del usuario y del espacio reservado.
     */
    public function pending()
    {
        // Verificación de permisos para acceder a reservas pendientes
        $this->authorize('admin-access');

        // Obtención de las reservas pendientes con los detalles de usuario y espacio
        $pendingReservations = Reservation::with(['user', 'space'])
            ->where('status', 'pending')
            ->get();

        // Retorno de las reservas pendientes
        return response()->json($pendingReservations);
    }

    /**
     * Aprobar una reserva (solo para administradores).
     *
     * @route PATCH /api/reservations/{id}/approve
     * @param int $id El ID de la reserva a aprobar.
     * @return \Illuminate\Http\JsonResponse
     *
     * Este método permite a los administradores aprobar una reserva,
     * cambiando su estado a "approved".
     */
    public function approve($id)
    {
        // Verificación de permisos para aprobar reservas
        $this->authorize('admin-access');

        // Buscar la reserva por ID
        $reservation = Reservation::findOrFail($id);

        // Cambiar el estado de la reserva a "approved"
        $reservation->status = 'approved';
        $reservation->save();

        // Respuesta de éxito
        return response()->json(['message' => 'Reserva aprobada']);
    }

    /**
     * Rechazar una reserva (solo para administradores).
     *
     * @route PATCH /api/reservations/{id}/reject
     * @param int $id El ID de la reserva a rechazar.
     * @return \Illuminate\Http\JsonResponse
     *
     * Este método permite a los administradores rechazar una reserva,
     * cambiando su estado a "rejected".
     */
    public function reject($id)
    {
        // Verificación de permisos para rechazar reservas
        $this->authorize('admin-access');

        // Buscar la reserva por ID
        $reservation = Reservation::findOrFail($id);

        // Cambiar el estado de la reserva a "rejected"
        $reservation->status = 'rejected';
        $reservation->save();

        // Respuesta de éxito
        return response()->json(['message' => 'Reserva rechazada']);
    }
}
