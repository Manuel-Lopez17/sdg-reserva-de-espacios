<?php

namespace App\Http\Controllers;

use App\Models\Space;
use Illuminate\Http\Request;

/**
 * SpaceController maneja las operaciones relacionadas con los espacios.
 * Este controlador permite listar todos los espacios disponibles y ver detalles específicos de un espacio.
 */
class SpaceController extends Controller
{
    /**
     * Listar todos los espacios disponibles.
     *
     * @route GET /api/spaces
     * @return \Illuminate\Http\JsonResponse
     *
     * Esta función obtiene todos los espacios registrados en la base de datos
     * y los retorna en formato JSON.
     */
    public function index()
    {
        // Obtener todos los espacios
        $spaces = Space::all();

        // Retornar la lista de espacios como respuesta JSON
        return response()->json($spaces);
    }

    /**
     * Ver los detalles de un espacio específico.
     *
     * @route GET /api/spaces/{id}
     * @param int $id El ID del espacio a consultar.
     * @return \Illuminate\Http\JsonResponse
     *
     * Esta función obtiene los detalles de un espacio específico
     * mediante su ID. Si el espacio no existe, se lanzará una excepción
     * que será manejada automáticamente por Laravel.
     */
    public function show($id)
    {
        // Buscar el espacio por ID
        $space = Space::findOrFail($id);

        // Retornar el espacio encontrado como respuesta JSON
        return response()->json($space);
    }
}
