<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contratacao;


class ContratacaoController extends Controller
{
    public function store(Request $request)
    {
        $contratacao = Contratacao::create($request->all());
        return response()->json($contratacao, 201);
    }

    public function index()
    {
        $contratacoes = Contratacao::all();
        return response()->json($contratacoes);
        return Contratacao::with('artist')->get();
    }
}