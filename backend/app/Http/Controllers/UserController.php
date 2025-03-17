<?php

namespace App\Http\Controllers;

use App\Helpers\Logger;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(
            User::paginate(15)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = User::create($request->except(['password_confirmation']));

            DB::commit();

            return new UserResource($user);

        } catch (\Throwable $th) {
            DB::rollBack();

            $error = 'Falha ao criar usuário.';
            Logger::log($th, $error);

            return response()->json(["error" => $th], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $userId)
    {
        try {
            $user = User::findOrFail($userId);

            return new UserResource($user);

        } catch (\Throwable $th) {
            $error = 'Usuário não encontrado.';
            Logger::log($th, $error);

            return response()->json(["error" => $error], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, int $userId)
    {
        try {
            $user = User::findOrFail($userId);

            $data = array_filter(
                $request->except(['password_confirmation']),
                fn($value) => !is_null($value)
            );
            $user->update($data);

            return new UserResource($user);

        } catch (\Throwable $th) {

            $error = 'Falha ao atualizar usuário.';
            Logger::log($th, $error);

            return response()->json(["error" => $error], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $userId)
    {
        try {
            $user = User::findOrFail($userId);

            $user->delete();

            return response()->json([], 204);

        } catch (\Throwable $th) {
            $error = 'Falha ao deletar o usuário.';
            Logger::log($th, $error);

            return response()->json(["error" => $error], 400);
        }
    }
}
