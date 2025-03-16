<?php

use Illuminate\Support\Facades\Route;

Route::post('/login', function() {
    return response()->json(["login" => true]);
});
