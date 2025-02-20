<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contratacao extends Model
{
    protected $fillable = [
        'nome',
        'artista',
        'cache',
        'dataEvento',
        'endereco'
    ];
}