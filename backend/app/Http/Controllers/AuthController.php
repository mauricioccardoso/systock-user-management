<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {

        if(Auth::attempt($request->only(['email', 'password'])))
        {
            $user = User::where('email', '=', $request->email)->firstOrFail();

            return response()->json([
                'message' => 'Authorized',
                'token' => $request->user()->createToken('general')->plainTextToken,
                'user' => new UserResource($user)
            ]);
        }

        return response()->json(['error' => 'Not Authorized'], 403);

    }

    public function check(Request $request) {
        return response()->json([
            'check' => true
        ]);
    }
}
