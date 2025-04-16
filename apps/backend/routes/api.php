<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\ReservationController;

/**
 * Rutas para la autenticación de usuarios.
 *
 * Estas rutas permiten a los usuarios registrarse, iniciar sesión y cerrar sesión.
 */
Route::prefix('auth')->group(function () {
    /**
     * Registrar un nuevo usuario.
     *
     * @route POST /api/auth/register
     * @param array $data ['name', 'email', 'password']
     * @return \Illuminate\Http\JsonResponse
     */
    Route::post('register', [AuthController::class, 'register']);

    /**
     * Iniciar sesión con credenciales de usuario.
     *
     * @route POST /api/auth/login
     * @param array $data ['email', 'password']
     * @return \Illuminate\Http\JsonResponse
     */
    Route::post('login', [AuthController::class, 'login']);

    /**
     * Cerrar sesión del usuario autenticado.
     *
     * @route POST /api/auth/logout
     * @middleware auth:sanctum
     * @return \Illuminate\Http\JsonResponse
     */
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

/**
 * Rutas protegidas por autenticación (requiere estar autenticado con Sanctum).
 *
 * Estas rutas permiten ver y gestionar espacios, así como gestionar reservas.
 */
Route::middleware('auth:sanctum')->group(function () {
    /**
     * Obtener la lista de espacios disponibles.
     *
     * @route GET /api/spaces
     * @return \Illuminate\Http\JsonResponse
     */
    Route::get('spaces', [SpaceController::class, 'index']);

    /**
     * Obtener información de un espacio específico.
     *
     * @route GET /api/spaces/{id}
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    Route::get('spaces/{id}', [SpaceController::class, 'show']);

    /**
     * Crear una nueva reserva.
     *
     * @route POST /api/reservations
     * @param array $data ['space_id', 'start_time', 'end_time']
     * @return \Illuminate\Http\JsonResponse
     */
    Route::post('reservations', [ReservationController::class, 'store']);

    /**
     * Obtener las reservas del usuario autenticado.
     *
     * @route GET /api/reservations
     * @return \Illuminate\Http\JsonResponse
     */
    Route::get('reservations', [ReservationController::class, 'index']);

    /**
     * Eliminar una reserva.
     *
     * @route DELETE /api/reservations/{id}
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    Route::delete('reservations/{id}', [ReservationController::class, 'destroy']);
});

/**
 * Rutas protegidas para administradores (requiere acceso específico).
 *
 * Estas rutas permiten que los administradores gestionen las reservas pendientes.
 */
Route::middleware('auth:sanctum', 'can:admin-access')->group(function () {
    /**
     * Listar las reservas pendientes de aprobación.
     *
     * @route GET /api/reservations/pending
     * @return \Illuminate\Http\JsonResponse
     */
    Route::get('reservations/pending', [ReservationController::class, 'pending']);

    /**
     * Aprobar una reserva pendiente.
     *
     * @route PATCH /api/reservations/{id}/approve
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    Route::patch('reservations/{id}/approve', [ReservationController::class, 'approve']);

    /**
     * Rechazar una reserva pendiente.
     *
     * @route PATCH /api/reservations/{id}/reject
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    Route::patch('reservations/{id}/reject', [ReservationController::class, 'reject']);
});
