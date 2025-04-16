<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Registro de usuario.
     *
     * Esta función recibe los datos del usuario, valida que sean correctos
     * (nombre, correo y contraseña), y crea un nuevo usuario en la base de datos.
     * Si los datos son incorrectos, devuelve un error con los mensajes de validación.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validación de los datos del formulario de registro
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Si falla la validación, devuelve los errores
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Creación del nuevo usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Contraseña cifrada
        ]);

        // Respuesta de éxito
        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    /**
     * Login de usuario.
     *
     * Esta función intenta autenticar al usuario con las credenciales proporcionadas (email y contraseña).
     * Si la autenticación es exitosa, devuelve un token de acceso junto con los datos del usuario.
     * Si las credenciales son incorrectas, devuelve un error.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Validación de los datos del formulario de login
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);

        // Si falla la validación, devuelve los errores
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Intenta autenticar al usuario
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user(); // Obtiene los datos del usuario autenticado
            $token = $user->createToken('App Token')->plainTextToken; // Genera un token de acceso

            // Respuesta de éxito con el token y los datos del usuario
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role, // Incluye el rol del usuario
                ]
            ]);
        }

        // Si las credenciales son incorrectas, devuelve un error
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    /**
     * Logout de usuario.
     *
     * Esta función cierra la sesión del usuario actual y revoca el token de acceso.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout(); // Cierra la sesión del usuario
        return response()->json(['message' => 'Logged out successfully']);
    }
}
