<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contratacao;

class ContratacaoController extends Controller
{
    // Store a new contratacao in the database
    public function store(Request $request)
    {
        $contratacao = Contratacao::create($request->all());
        return response()->json($contratacao, 201); // Return the created contratacao with HTTP status 201 (Created)
    }

    // Retrieve all contratacoes from the database
    public function index()
    {
        $contratacoes = Contratacao::all();
        return response()->json($contratacoes); // Return all contratacoes as JSON

        // This line is unreachable due to the previous return statement
        return Contratacao::with('artist')->get();
    }
}
