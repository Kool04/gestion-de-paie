<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Login;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        unset($credentials['remember']);

        $user = Login::where('email', $credentials['email'])->first();

        if (!$user) {
            return response([
                'email' => 'Employer introuvable'
            ], 422);
        }

        if ($user->password !== $credentials['password']) {
            return response([
                'password' => 'Mot de passe incorrecte'
            ], 422);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }
}
