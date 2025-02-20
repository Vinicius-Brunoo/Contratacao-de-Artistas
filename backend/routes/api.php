<?php

use App\Http\Controllers\ContratacaoController;

Route::post('/contratacoes', [ContratacaoController::class, 'store']);
Route::get('/contratacoes', [ContratacaoController::class, 'index']);
Route::get('/contratacoes', [ContratacaoController::class, 'index']);