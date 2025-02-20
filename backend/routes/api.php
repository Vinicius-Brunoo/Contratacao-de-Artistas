<?php

use App\Http\Controllers\ContratacaoController;
use Illuminate\Support\Facades\Route; // Ensure the Route facade is imported

// Define a route to create a new contratacao (POST request)
Route::post('/contratacoes', [ContratacaoController::class, 'store']);

// Define a route to retrieve all contratacoes (GET request) - duplicated
Route::get('/contratacoes', [ContratacaoController::class, 'index']);

// The last line is a duplicate of the previous GET route and should be removed.
