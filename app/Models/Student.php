<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $fillable=['name', 'birth','gender','classroom_id'];

    /**
     * mapeamento com salas de aulas
     */
    public function classroom()
    {
        return $this->belongsTo('App\Models\Classroom');
    }
}
