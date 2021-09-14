<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use League\CommonMark\Extension\Attributes\Node\Attributes;

class Student extends Model
{
    use HasFactory;
    protected $fillable=['name', 'birth','gender','classroom_id'];

    // protected $casts = [
    //     'birth' => 'datetime:d/m/Y',
    // ];

    //appender necessario para imprimir na tela
   // public $appends = ['define_gender'];

    //setado o define_gender, após trazer no appends
    // protected $visible = [
    //     'name',
    //     'birth',
    //     'define_gender',
    //     'classroom_id'
    // ];
    /**
     * map. com salas de aulas
     */
    public function classroom()
    {
        return $this->belongsTo('App\Models\Classroom');
    }

    //assessor
    // public function getDefineGenderAttribute()
    // {
    //     return $this->attributes['gender'] === 'F' ? 'Feminino' : 'Masculino';
    // }
}
